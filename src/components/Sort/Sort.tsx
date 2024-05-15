import React, { useState, ChangeEvent } from "react";
import { SortComponentProps } from "./SortTypes";

const SortComponent: React.FC<SortComponentProps> = ({ onSortChange }) => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newSortOrder = e.target.value as "asc" | "desc";
    setSortOrder(newSortOrder);
    onSortChange(newSortOrder);
  };

  return (
    <div>
      <select value={sortOrder} onChange={handleSortChange}>
        <option value="asc">Starting from those who appeared earlier</option>
        <option value="desc">Starting from those who appeared later</option>
      </select>
    </div>
  );
};

export default SortComponent;