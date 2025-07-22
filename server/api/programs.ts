import { Router } from 'express';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

const router = Router();

// Cache configuration
let programCache: Record<string, any> = {};
let lastFetchTime = 0;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// URL patterns for program pages
const PROGRAM_URLS = [
  'https://www.hocking.edu/{id}',
  'https://www.hocking.edu/majors/{id}',
  'https://www.hocking.edu/academics/{id}',
  'https://www.hocking.edu/programs/{id}',
  'https://www.hocking.edu/natural-resources/{id}',
  'https://www.hocking.edu/public-safety/{id}',
  'https://www.hocking.edu/equine/{id}',
  'https://www.hocking.edu/canine/{id}',
  'https://www.hocking.edu/fire-emergency/{id}',
  'https://www.hocking.edu/law-enforcement/{id}'
];

// Helper functions
const cleanText = (text: string): string => {
  return text
    .replace(/https?:\/\/[^\s]+/g, '') // Remove URLs
    .replace(/\[.*?\]|\(.*?\)/g, '') // Remove text in brackets/parentheses
    .replace(/(Click here|Learn more|Visit|For more information).*?\./gi, '') // Remove common phrases
    .replace(/&[a-z]+;/gi, '') // Remove HTML entities
    .replace(/[^\x00-\x7F]+/g, '') // Remove non-ASCII (non-English) characters
    .replace(/[^a-zA-Z0-9.,;:!?'"\-\s]/g, '') // Remove non-word, non-punctuation chars
    .replace(/\s+/g, ' ') // Collapse whitespace
    .replace(/[\r\n]+/g, ' ') // Remove newlines
    .replace(/\s+([.,;:!?'"\-])/g, '$1') // Remove space before punctuation
    .replace(/([.,;:!?'"\-])(?=\S)/g, '$1 ') // Ensure space after punctuation if not present
    .replace(/\s{2,}/g, ' ') // Remove double spaces
    .trim();
};

const extractListItems = (section: cheerio.Cheerio, $: cheerio.Root): string[] => {
  const items: string[] = [];
  let currentElement = section.next();
  
  while (currentElement.length && !currentElement.is('h1, h2, h3')) {
    if (currentElement.is('ul, ol')) {
      currentElement.find('li').each((_, element) => {
        const text = cleanText($(element).text());
        if (text) items.push(text);
      });
    }
    currentElement = currentElement.next();
  }
  
  return items;
};

const extractSectionContent = (section: cheerio.Cheerio, $: cheerio.Root): string => {
  let content = '';
  let currentElement = section.next();
  
  while (currentElement.length && !currentElement.is('h1, h2, h3')) {
    if (currentElement.is('p, ul, ol')) {
      currentElement.find('a').remove();
      content += cleanText(currentElement.text()) + ' ';
    }
    currentElement = currentElement.next();
  }
  
  return content.trim();
};

const findSectionContent = ($: cheerio.Root, sectionNames: string[], extractor: (section: cheerio.Cheerio, $: cheerio.Root) => any): any => {
  for (const name of sectionNames) {
    const section = $(`h2:contains("${name}"), h1:contains("${name}")`);
    if (section.length) {
      const result = extractor(section, $);
      if (result && (typeof result === 'string' ? result.length > 0 : result.length > 0)) {
        return result;
      }
    }
  }
  return typeof extractor === 'function' && extractor.toString().includes('extractListItems') ? [] : '';
};

const findProgramPage = async (programId: string): Promise<string | null> => {
  for (const urlPattern of PROGRAM_URLS) {
    try {
      const url = urlPattern.replace('{id}', programId);
      const response = await fetch(url);
      if (response.ok) return url;
    } catch (error) {
      continue;
    }
  }
  return null;
};

// Main scraping function
async function fetchProgramDetails(programId: string): Promise<any> {
  try {
    const program = programCache[programId];
    if (!program) {
      console.error(`Program not found in cache: ${programId}`);
      return null;
    }

    const url = await findProgramPage(programId);
    if (!url) {
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

    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract content using helper functions
    const description = findSectionContent($, ['Program Description', 'About', 'Overview'], extractSectionContent);
    const courses = findSectionContent($, ['Course Curriculum', 'Courses', 'Curriculum'], extractListItems);
    const careers = findSectionContent($, ['Career Options', 'Careers', 'Career Paths'], extractListItems);

    // Extract degree type and program length
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

    // Fallback description if none found
    let finalDescription = description;
    if (!finalDescription) {
      $('p').each((_, element) => {
        const text = cleanText($(element).text());
        if (text.includes(program.name) && text.length > 50) {
          finalDescription = text;
          return false;
        }
      });
    }

    console.log(`Scraped content for ${program.name}:`, {
      descriptionLength: finalDescription.length,
      coursesCount: courses.length,
      careersCount: careers.length,
      degreeType,
      programLength,
      url
    });

    return {
      title: program.name,
      description: finalDescription || "Visit Hocking College's website for the latest program information.",
      courses,
      careers,
      degreeType,
      programLength,
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error(`Error fetching program details for ${programId}:`, error);
    return null;
  }
}

// Cache management
async function updateProgramCache() {
  const now = Date.now();
  if (now - lastFetchTime < CACHE_DURATION && Object.keys(programCache).length > 0) {
    return;
  }

  try {
    const response = await fetch('https://www.hocking.edu/majors');
    const html = await response.text();
    const $ = cheerio.load(html);

    $('h4').each((_, categoryHeader) => {
      const categoryName = $(categoryHeader).text().trim();
      const categorySection = $(categoryHeader).next('ul');
      
      if (categorySection.length && categoryName) {
        categorySection.find('li').each((_, program) => {
          const programName = $(program).text().trim();
          if (programName) {
            const programId = programName.toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-|-$/g, '');
            
            if (!programCache[programId]) {
              programCache[programId] = {
                id: programId,
                name: programName,
                category: categoryName,
                details: null
              };
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

// API Routes
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

router.get('/:id', async (req, res) => {
  try {
    const programId = req.params.id;
    await updateProgramCache();
    
    const program = programCache[programId];
    if (!program) {
      return res.status(404).json({ error: 'Program not found' });
    }

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