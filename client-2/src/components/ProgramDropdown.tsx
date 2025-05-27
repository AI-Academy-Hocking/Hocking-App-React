import React, { useState } from 'react';
import Dropdown from './ui/dropdown';

const programs = [
  { id: '1', name: 'Computer Science' },
  { id: '2', name: 'Business Administration' },
  { id: '3', name: 'Psychology' },
  { id: '4', name: 'Biology' },
  { id: '5', name: 'Mathematics' },
];

interface ProgramDropdownProps {
  onChange: (program: string) => void;
}

const ProgramDropdown: React.FC<ProgramDropdownProps> = ({ onChange }) => {
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);

  const handleProgramChange = (programId: string) => {
    setSelectedProgram(programId);
    onChange(programId);
  };

  return (
    <div className="relative">
      <Dropdown
        options={programs}
        selectedOption={selectedProgram}
        onSelect={handleProgramChange}
        placeholder="Select Program"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <svg
          className="h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default ProgramDropdown; 