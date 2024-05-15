import React, { ChangeEvent } from "react";
import FilterComponentProps from './FilterType'

const FilterComponent: React.FC<FilterComponentProps> = ({ title, options, selectedOptions, onFilterChange }) => {
  const handleFilterChange = (event:ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      onFilterChange([...selectedOptions, value]);
    } else {
      onFilterChange(selectedOptions.filter((filter) => filter !== value));
    }
  };

  return (
  <div className="flex flex-col space-y-2">
  <label className="flex flex-col">
    {title}:
    {options.map((option) => (
      <span className="flex items-center space-x-2" key={option}>
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 cursor-pointer"
          value={option}
          onChange={handleFilterChange}
          checked={selectedOptions.includes(option)}
        />
        <span className="text-gray-700">{option}</span>
      </span>
    ))}
  </label>
</div>
  );
}

export default FilterComponent;
