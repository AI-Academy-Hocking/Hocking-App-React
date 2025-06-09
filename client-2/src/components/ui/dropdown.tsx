import React from 'react';

interface Option {
  id?: string;
  name?: string;
  value?: string;
}

interface DropdownProps {
  options: (string | Option)[];
  selectedOption: string | null;
  onSelect: (value: string) => void;
  placeholder?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ options, selectedOption, onSelect, placeholder }) => {
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(event.target.value);
  };

  const getOptionValue = (option: string | Option): string => {
    if (typeof option === 'string') return option;
    return option.id || option.value || option.name || '';
  };

  const getOptionLabel = (option: string | Option): string => {
    if (typeof option === 'string') return option;
    return option.name || option.value || option.id || '';
  };

  return (
    <select 
      value={selectedOption || ''} 
      onChange={handleSelect} 
      className="
        block w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 
        ring-1 ring-inset ring-gray-300 
        focus:ring-2 focus:ring-blue-600 
        transition-all duration-200 ease-in-out
        text-sm leading-6
        appearance-none
        bg-white
        cursor-pointer
        hover:ring-gray-400
      "
    >
      {placeholder && (
        <option value="" disabled className="text-gray-500">
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option 
          key={getOptionValue(option)} 
          value={getOptionValue(option)}
          className="py-2"
        >
          {getOptionLabel(option)}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;