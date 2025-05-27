import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

interface ProgramDropdownProps {
  onChange: (program: string) => void;
}

const programs = [
  { id: '1', name: 'Computer Science' },
  { id: '2', name: 'Business Administration' },
  { id: '3', name: 'Psychology' },
  { id: '4', name: 'Biology' },
  { id: '5', name: 'Mathematics' },
];

const ProgramDropdown: React.FC<ProgramDropdownProps> = ({ onChange }) => {
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [, navigate] = useLocation();

  const handleProgramChange = (value: string) => {
    setSelectedProgram(value);
    onChange(value);
  };

  const handleViewProgram = () => {
    if (selectedProgram) {
      const program = programs.find(p => p.id === selectedProgram);
      if (program) {
        navigate(`/programs/${program.id}`);
      }
    }
  };

  return (
    <div className="space-y-3">
      <Select onValueChange={handleProgramChange} value={selectedProgram || undefined}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select your program" />
        </SelectTrigger>
        <SelectContent>
          {programs.map((program) => (
            <SelectItem key={program.id} value={program.id}>
              {program.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
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
  );
};

export default ProgramDropdown; 