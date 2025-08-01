import React, { useState } from 'react';

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
    <select
      value={selectedProgram || ''}
      onChange={(e) => handleProgramChange(e.target.value)}
      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Select your program of study</option>
      {programs.map((program) => (
        <option key={program.id} value={program.id}>
          {program.name}
        </option>
      ))}
    </select>
  );
};

export default ProgramDropdown;