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

    // Try the direct program URL
    const url = `https://www.hocking.edu/${programId}`;
    
    try {
      console.log(`Fetching from: ${url}`);
      const response = await fetch(url);
      if (!response.ok) {
        console.error(`Failed to fetch from ${url}: ${response.status}`);
        return null;
      }

      const html = await response.text();
      const $ = cheerio.load(html);

      let description = '';
      let courses: string[] = [];
      let careers: string[] = [];

      // Get program description - specifically looking for content after "Program Description" heading
      const descriptionSection = $('h2:contains("Program Description")');
      if (descriptionSection.length) {
        let currentElement = descriptionSection.next();
        while (currentElement.length && !currentElement.is('h2')) {
          const text = currentElement.text().trim();
          if (text && !text.includes('APPLY TO HOCKING COLLEGE')) {
            description += text + ' ';
          }
          currentElement = currentElement.next();
        }
      }

      // Get career information - looking under "Career Options"
      const careerSection = $('h2:contains("Career Options"), h1:contains("Career Options")');
      if (careerSection.length) {
        let currentElement = careerSection.next();
        while (currentElement.length && !currentElement.is('h1, h2')) {
          const text = currentElement.text().trim();
          if (text && text.length > 10 && !text.includes('Print PDF') && !text.includes('View PDF')) {
            careers.push(text);
          }
          currentElement = currentElement.next();
        }
      }

      // Get course information - looking under "Course Curriculum"
      const courseSection = $('div:contains("Course Curriculum")');
      if (courseSection.length) {
        courseSection.find('li').each((_, element) => {
          const text = $(element).text().trim();
          if (text && text.length > 0) {
            courses.push(text);
          }
        });
      }

      // If no description found yet, try to find any relevant content
      if (!description) {
        $('p').each((_, element) => {
          const text = $(element).text().trim();
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
        description: description.substring(0, 100) + '...' // Log first 100 chars
      });
      
      return {
        title: program.name,
        description: description || "Visit Hocking College's website for the latest program information.",
        courses: courses,
        careers: careers,
        lastUpdated: new Date().toISOString()
      };
    } catch (error) {
      console.error(`Error fetching from ${url}:`, error);
      return null;
    }
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
            const programId = programName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            
            if (!programCache[programId]) {
              programCache[programId] = {
                id: programId,
                name: programName,
                category: categoryName,
                details: {
                  title: programName,
                  description: "Program details are being updated.",
                  courses: [],
                  careers: [],
                  lastUpdated: new Date().toISOString()
                }
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

// Endpoint to get all programs
router.get('/', async (req, res) => {
  await updateProgramCache();
  res.json(Object.values(programCache));
});

// Endpoint to get specific program details
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  
  await updateProgramCache();
  
  const program = programCache[id];
  if (!program) {
    return res.status(404).json({ error: 'Program not found' });
  }

  // Fetch detailed information if not already cached
  if (!program.details) {
    program.details = await fetchProgramDetails(id);
  }

  res.json(program);
});

export default router; 