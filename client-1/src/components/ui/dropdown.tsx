import React from 'react';

interface DropdownProps {
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, selectedOption, onSelect }) => {
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(event.target.value);
  };

  return (
    <select value={selectedOption} onChange={handleSelect} className="border rounded p-2">
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;