/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import FilterComponent from "../Filter/Filter";
import Input from "../Input/Input";
import SortComponent from "../Sort/Sort";
import { Character } from "./ListType";
import { fetchAllCharacters } from "../../Api/fetchCharacters";

const ITEMS_PER_PAGE = 20;

const List: React.FC = () => {
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [displayedCharacters, setDisplayedCharacters] = useState<Character[]>([]);
  const [speciesFilter, setSpeciesFilter] = useState<string[]>([]);
  const [genderFilter, setGenderFilter] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [loading, setLoading] = useState<boolean>(false);
  const currentPage = 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const allResults = await fetchAllCharacters();
        setLoading(false);

        setAllCharacters(allResults);
        setFilteredCharacters(allResults);
        setDisplayedCharacters(allResults.slice(0, ITEMS_PER_PAGE));
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [speciesFilter, genderFilter, statusFilter, searchTerm, allCharacters]);

  useEffect(() => {
    applySort();
  }, [sortOrder]);

  useEffect(() => {
    updateDisplayedCharacters();
  }, [filteredCharacters, currentPage]);

  const applyFilters = () => {
    const filteredResults = allCharacters.filter((char) => {
      return (
        (speciesFilter.length === 0 || speciesFilter.includes(char.species)) &&
        (genderFilter.length === 0 || genderFilter.includes(char.gender)) &&
        (statusFilter.length === 0 || statusFilter.includes(char.status)) &&
        (searchTerm === "" ||
          char.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });

    setFilteredCharacters(filteredResults);
  };

  const applySort = () => {
    const sorted = [...filteredCharacters].sort((a, b) => {
      const episodeA = parseInt(a.episode[0].split("/").pop()!);
      const episodeB = parseInt(b.episode[0].split("/").pop()!);

      return sortOrder === "asc" ? episodeA - episodeB : episodeB - episodeA;
    });

    setFilteredCharacters(sorted);
  };

  const updateDisplayedCharacters = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setDisplayedCharacters(filteredCharacters.slice(startIndex, endIndex));
  };

  const loadMore = () => {
    const startIndex = displayedCharacters.length;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const additionalCharacters = filteredCharacters.slice(startIndex, endIndex);
    setDisplayedCharacters((prevCharacters) => [
      ...prevCharacters,
      ...additionalCharacters,
    ]);
  };

  const handleFilterChange = (filterType: string, selectedOptions: string[]) => {
    switch (filterType) {
      case "species":
        setSpeciesFilter(selectedOptions);
        break;
      case "gender":
        setGenderFilter(selectedOptions);
        break;
      case "status":
        setStatusFilter(selectedOptions);
        break;
      default:
        break;
    }
  };

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const handleSortChange = (selectedSortOption: "asc" | "desc") => {
    setSortOrder(selectedSortOption);
  };

  return (
<div className="bg-slate-600 min-h-screen overflow-hidden">
  <div className="bg-slate-400 p-5 w-full mx-auto"> 
    {loading && <p className="w-10 ml-auto mr-auto">Loading...</p>}
    <Input onSearch={handleSearch} />
    <div className="flex flex-col lg:flex-row mx-4 bg-slate-400 mb-10">
      <div className="flex flex-wrap gap-10 lg:gap-4">
        <div className="w-full lg:w-96 flex-wrap">
          <FilterComponent
            title="Species"
            options={["Human", "Alien", "Humanoid", "Poopybutthole", "Mythological Creature", "Animal", "Robot", "Cronenberg", "unknown"]}
            selectedOptions={speciesFilter}
            onFilterChange={(selectedOptions) =>
              handleFilterChange("species", selectedOptions)
            }
          />
        </div>
        <FilterComponent
          title="Gender"
          options={["Male", "Female", "unknown"]}
          selectedOptions={genderFilter}
          onFilterChange={(selectedOptions) =>
            handleFilterChange("gender", selectedOptions)
          }
        />
        <FilterComponent
          title="Status"
          options={["Alive", "Dead", "unknown"]}
          selectedOptions={statusFilter}
          onFilterChange={(selectedOptions) =>
            handleFilterChange("status", selectedOptions)
          }
        />
      </div>
      <div className="ml-auto justify-center mt-4 lg:mt-0">
        <span>Sort by appearance in the series:</span>
        <SortComponent onSortChange={handleSortChange} />
      </div>
    </div>
  </div>
  <div className="rounded-lg">
    {filteredCharacters.length === 0 ? (
      <p className="text-white text-center">No Results</p>
    ) : (
      <>
        <ul className="flex flex-wrap gap-7 justify-center p-5">
          {displayedCharacters.map((char) => (
            <li key={char.id} className="bg-sky-950 w-96 border-2 mb-5 p-5 rounded-lg">
              <img className="block w-full" src={char.image} alt={char.name} />
              <h1 className="mt-4 font-bold text-orange-400">Name: {char.name}</h1>
              <p className="text-white">Species: {char.species}</p>
              <p className="text-white">Gender: {char.gender}</p>
              <p className="text-white">Status: {char.status}</p>
              <p className="text-white text-sm">Episode: {char.episode[0]}</p>
            </li>
          ))}
        </ul>
        {displayedCharacters.length < filteredCharacters.length && (
          <button className="bg-sky-600 rounded-2xl px-3.5 font-medium flex justify-center w-full mb-5 py-1.5" onClick={loadMore}>Load more</button>
        )}
      </>
    )}
  </div>
</div>
  );
};

export default List;