import { Router } from 'express';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

const router = Router();

// Cache object to store program details
let programCache: Record<string, any> = {};
let lastFetchTime = 0;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

async function fetchProgramDetails(programId: string): Promise<any> {
  try {
    const program = programCache[programId];
    if (!program) {
      console.error(`Program not found in cache: ${programId}`);
      return null;
    }

    // Try multiple possible URLs
    const urls = [
      `https://www.hocking.edu/${programId}`,
      `https://www.hocking.edu/majors/${programId}`,
      `https://www.hocking.edu/academics/${programId}`,
      `https://www.hocking.edu/programs/${programId}`
    ];

    let response = null;
    let url = '';

    // Try each URL until we get a successful response
    for (const testUrl of urls) {
      try {
        response = await fetch(testUrl);
        if (response.ok) {
          url = testUrl;
          break;
        }
      } catch (error) {
        continue;
      }
    }

    if (!response || !response.ok) {
      console.error(`Failed to fetch program details for ${programId}`);
      return {
        title: program.name,
        description: "Program details are currently being updated. Please visit Hocking College's website for the latest information.",
        courses: [],
        careers: [],
        degreeType: "",
        programLength: "",
        lastUpdated: new Date().toISOString()
      };
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Helper function to clean text
    const cleanText = (text: string) => {
      return text
        .replace(/\s+/g, ' ')  // Replace multiple spaces with single space
        .replace(/[\r\n]+/g, ' ')  // Replace newlines with space
        .replace(/https?:\/\/[^\s]+/g, '')  // Remove URLs
        .replace(/\[.*?\]/g, '')  // Remove text in square brackets
        .replace(/\(.*?\)/g, '')  // Remove text in parentheses
        .replace(/Click here.*?\./g, '')  // Remove "Click here" phrases
        .replace(/Learn more.*?\./g, '')  // Remove "Learn more" phrases
        .replace(/Visit.*?\./g, '')  // Remove "Visit" phrases
        .replace(/For more information.*?\./g, '')  // Remove "For more information" phrases
        .replace(/\s+/g, ' ')  // Clean up any extra spaces created by removals
        .trim();
    };

    // Helper function to extract section content
    const extractSectionContent = (section: cheerio.Cheerio, $: cheerio.Root) => {
      let content = '';
      let currentElement = section.next();
      
      while (currentElement.length && !currentElement.is('h1, h2, h3')) {
        if (currentElement.is('p, ul, ol')) {
          // Remove any links from the content
          currentElement.find('a').remove();
          content += cleanText(currentElement.text()) + ' ';
        }
        currentElement = currentElement.next();
      }
      
      return content.trim();
    };

    // Get program description
    let description = '';
    const descriptionSections = [
      $('h2:contains("Program Description"), h1:contains("Program Description")'),
      $('h2:contains("About"), h1:contains("About")'),
      $('h2:contains("Overview"), h1:contains("Overview")')
    ];

    for (const section of descriptionSections) {
      if (section.length) {
        description = extractSectionContent(section, $);
        if (description) break;
      }
    }

    // Get degree type and program length
    let degreeType = '';
    let programLength = '';
    
    $('p, li').each((_, element) => {
      const text = cleanText($(element).text());
      if (text.includes('Degree Type:')) {
        degreeType = text.split('Degree Type:')[1].trim();
      }
      if (text.includes('Program Length:')) {
        programLength = text.split('Program Length:')[1].trim();
      }
    });

    // Get course information
    let courses: string[] = [];
    const courseSections = [
      $('h2:contains("Course Curriculum"), h1:contains("Course Curriculum")'),
      $('h2:contains("Courses"), h1:contains("Courses")'),
      $('h2:contains("Curriculum"), h1:contains("Curriculum")')
    ];

    for (const section of courseSections) {
      if (section.length) {
        let currentElement = section.next();
        while (currentElement.length && !currentElement.is('h1, h2, h3')) {
          if (currentElement.is('ul, ol')) {
            currentElement.find('li').each((_, element) => {
              const text = cleanText($(element).text());
              if (text && text.length > 0) {
                courses.push(text);
              }
            });
          }
          currentElement = currentElement.next();
        }
        if (courses.length > 0) break;
      }
    }

    // Get career information
    let careers: string[] = [];
    const careerSections = [
      $('h2:contains("Career Options"), h1:contains("Career Options")'),
      $('h2:contains("Careers"), h1:contains("Careers")'),
      $('h2:contains("Career Paths"), h1:contains("Career Paths")')
    ];

    for (const section of careerSections) {
      if (section.length) {
        let currentElement = section.next();
        while (currentElement.length && !currentElement.is('h1, h2, h3')) {
          if (currentElement.is('ul, ol')) {
            currentElement.find('li').each((_, element) => {
              const text = cleanText($(element).text());
              if (text && text.length > 0) {
                careers.push(text);
              }
            });
          }
          currentElement = currentElement.next();
        }
        if (careers.length > 0) break;
      }
    }

    // If no description found yet, try to find any relevant content
    if (!description) {
      $('p').each((_, element) => {
        const text = cleanText($(element).text());
        if (text.includes(program.name) && text.length > 50) {
          description = text;
          return false;
        }
      });
    }

    // Log what we found for debugging
    console.log(`Found content for ${program.name}:`, {
      descriptionLength: description.length,
      coursesCount: courses.length,
      careersCount: careers.length,
      degreeType,
      programLength,
      url
    });
    
    return {
      title: program.name,
      description: description || "Visit Hocking College's website for the latest program information.",
      courses: courses,
      careers: careers,
      degreeType,
      programLength,
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error(`Error fetching program details for ${programId}:`, error);
    return null;
  }
}

async function updateProgramCache() {
  const now = Date.now();
  if (now - lastFetchTime < CACHE_DURATION && Object.keys(programCache).length > 0) {
    return;
  }

  try {
    const response = await fetch('https://www.hocking.edu/majors');
    const html = await response.text();
    const $ = cheerio.load(html);

    // Process each program category
    $('h4').each((_, categoryHeader) => {
      const categoryName = $(categoryHeader).text().trim();
      const categorySection = $(categoryHeader).next('ul');
      
      if (categorySection.length && categoryName) {
        categorySection.find('li').each((_, program) => {
          const programName = $(program).text().trim();
          if (programName) {
            // Create a URL-friendly ID from the program name
            const programId = programName.toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-|-$/g, '');
            
            if (!programCache[programId]) {
              programCache[programId] = {
                id: programId,
                name: programName,
                category: categoryName,
                details: null // Will be populated when program details are fetched
              };

              // Log each program as it's added to the cache
              console.log(`Added program to cache: ${programName} (${programId})`);
            }
          }
        });
      }
    });

    console.log(`Cache updated with ${Object.keys(programCache).length} programs`);
    lastFetchTime = now;
  } catch (error) {
    console.error('Error updating program cache:', error);
  }
}

// Initialize cache on server start
updateProgramCache();

// GET /api/programs
router.get('/', async (req, res) => {
  try {
    await updateProgramCache();
    const programs = Object.values(programCache);
    res.json(programs);
  } catch (error) {
    console.error('Error fetching programs:', error);
    res.status(500).json({ error: 'Failed to fetch programs' });
  }
});

// GET /api/programs/:id
router.get('/:id', async (req, res) => {
  try {
    const programId = req.params.id;
    await updateProgramCache();
    
    const program = programCache[programId];
    if (!program) {
      return res.status(404).json({ error: 'Program not found' });
    }

    // If we don't have details yet, fetch them
    if (!program.details) {
      program.details = await fetchProgramDetails(programId);
      programCache[programId] = program;
    }

    res.json(program);
  } catch (error) {
    console.error('Error fetching program details:', error);
    res.status(500).json({ error: 'Failed to fetch program details' });
  }
});

export default router; 