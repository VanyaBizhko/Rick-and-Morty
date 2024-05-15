import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { InputProps } from "./InputType";

const Input: React.FC<InputProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    if (typeof onSearch === "function") {
      onSearch(searchTerm);
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <div className="flex justify-center gap-7 mb-8">
      <input
        type="text"
        autoComplete="off"
        autoFocus
        className="rounded-xl p-1.5 px-5 outline-0 font-medium"
        placeholder="Search characters..."
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />
      <button
        className="bg-sky-600 rounded-2xl px-3.5 font-medium"
        onClick={handleSearchClick}
      >
        Search
      </button>
    </div>
  );
};

export default Input;