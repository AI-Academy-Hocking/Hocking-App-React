import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";

interface ProgramDropdownProps {
  onChange: (program: string) => void;
}

interface Program {
  id: string;
  name: string;
}

type ProgramCategories = {
  [K in 'Allied Health and Nursing' | 'General Studies, Arts and Science' | 'Natural Resources and Public Safety' | 'Workforce Development']: Program[];
};

const programCategories: ProgramCategories = {
  'Allied Health and Nursing': [
    { id: 'dental-hygiene', name: 'Dental Hygiene' },
    { id: 'fitness-management', name: 'Fitness Management' },
    { id: 'healthcare-informatics', name: 'Healthcare Informatics' },
    { id: 'lpn-to-rn-transition-program', name: 'LPN to RN Transition Program' },
    { id: 'medical-assistant', name: 'Medical Assistant' },
    { id: 'physical-therapist-assistant', name: 'Physical Therapist Assistant' },
    { id: 'registered-nursing', name: 'Registered Nursing' },
    { id: 'social-work', name: 'Social Work' },
    { id: 'state-tested-nursing-assistant-stna-', name: 'State Tested Nursing Assistant (STNA)' }
  ],
  'General Studies, Arts and Science': [
    { id: 'associate-of-arts-general-studies-', name: 'Associate of Arts (General Studies)' },
    { id: 'associate-of-individualized-study', name: 'Associate of Individualized Study' },
    { id: 'associate-of-science', name: 'Associate of Science' },
    { id: 'associate-of-technical-study', name: 'Associate of Technical Study' }
  ],
  'Natural Resources and Public Safety': [
    { id: 'environmental-science', name: 'Environmental Science' },
    { id: 'forestry', name: 'Forestry' },
    { id: 'law-enforcement', name: 'Law Enforcement' },
    { id: 'wildlife-resources', name: 'Wildlife Resources' }
  ],
  'Workforce Development': [
    { id: 'accounting-and-financial-services', name: 'Accounting and Financial Services' },
    { id: 'advanced-manufacturing-and-engineering-technologies', name: 'Advanced Manufacturing and Engineering Technologies' },
    { id: 'advanced-welding-certificate', name: 'Advanced Welding Certificate' },
    { id: 'automotive-technology', name: 'Automotive Technology' },
    { id: 'business-management-and-entrepreneurship', name: 'Business Management and Entrepreneurship' },
    { id: 'commercial-driver-s-license-cdl-certificate', name: 'Commercial Driver\'s License (CDL) Certificate' },
    { id: 'construction-management-carpentry', name: 'Construction Management: Carpentry' },
    { id: 'culinary-arts', name: 'Culinary Arts' },
    { id: 'culinary-arts-baking', name: 'Culinary Arts: Baking' },
    { id: 'cybersecurity-and-network-systems', name: 'Cybersecurity and Network Systems' },
    { id: 'early-childhood-teacher-education', name: 'Early Childhood Teacher Education' },
    { id: 'fashion-design-and-retail-merchandising', name: 'Fashion Design and Retail Merchandising' },
    { id: 'fermentation-science', name: 'Fermentation Science' },
    { id: 'film-and-video-production', name: 'Film and Video Production' },
    { id: 'heavy-equipment-management', name: 'Heavy Equipment Management' },
    { id: 'heavy-equipment-operator-certificate', name: 'Heavy Equipment Operator Certificate' },
    { id: 'hospitality-events-management', name: 'Hospitality & Events Management' },
    { id: 'hvac', name: 'HVAC' },
    { id: 'music-and-recording-industry', name: 'Music and Recording Industry' },
    { id: 'real-estate-certificate', name: 'Real Estate Certificate' },
    { id: 'sports-management', name: 'Sports Management' },
    { id: 'water-and-wastewater-management', name: 'Water and Wastewater Management' }
  ]
} as const;

const ProgramDropdown: React.FC<ProgramDropdownProps> = ({ onChange }) => {
  const [selectedCategory, setSelectedCategory] = useState<keyof ProgramCategories | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [, navigate] = useLocation();

  const handleCategoryChange = (category: keyof ProgramCategories) => {
    setSelectedCategory(category);
    setSelectedProgram(null); // Reset program selection when category changes
  };

  const handleProgramChange = (value: string) => {
    setSelectedProgram(value);
    onChange(value);
  };

  const handleViewProgram = () => {
    if (selectedProgram) {
      navigate(`/programs/${selectedProgram}`);
    }
  };

  return (
    <div className="space-y-3">
      {/* Category Selection */}
      <Select 
        onValueChange={handleCategoryChange} 
        value={selectedCategory || undefined}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          {(Object.keys(programCategories) as Array<keyof ProgramCategories>).map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Program Selection - Only shown when category is selected */}
      {selectedCategory && (
        <div className="space-y-3">
          <Select 
            onValueChange={handleProgramChange} 
            value={selectedProgram || undefined}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a program" />
            </SelectTrigger>
            <SelectContent>
              {programCategories[selectedCategory].map((program) => (
                <SelectItem key={program.id} value={program.id}>
                  {program.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* View Program Button - Only shown when program is selected */}
          {selectedProgram && (
            <Button 
              onClick={handleViewProgram}
              className="w-full"
              variant="default"
            >
              View Program Details
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProgramDropdown; 