import React, { useState } from 'react';
import Dropdown from './ui/dropdown';

const programs = [
  { id: '1', name: 'Computer Science' },
  { id: '2', name: 'Business Administration' },
  { id: '3', name: 'Psychology' },
  { id: '4', name: 'Biology' },
  { id: '5', name: 'Mathematics' },
];

const ProgramDropdown: React.FC = () => {
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);

  const handleProgramChange = (programId: string) => {
    setSelectedProgram(programId);
    console.log('Selected Program ID:', programId);
  };

  return (
    <Dropdown
      options={programs}
      selectedOption={selectedProgram}
      onChange={handleProgramChange}
      placeholder="Select your program of study"
    />
  );
};

export default ProgramDropdown;
