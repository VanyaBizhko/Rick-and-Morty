interface FilterComponentProps {
  title: string;
  options: string[];
  selectedOptions: string[];
  onFilterChange: (selectedOptions: string[]) => void;
  
}
export default FilterComponentProps;