import axios from "axios";
import { Character, ApiResponse } from "../components/List/ListType";

const API_URL = "https://rickandmortyapi.com/api/character";

export const fetchAllCharacters = async (): Promise<Character[]> => {
  let nextPage: string | null = API_URL;
  const allResults: Character[] = [];

  const fetchPage = async (url: string) => {
    const response = await axios.get<ApiResponse>(url);
    const data = response.data;
    allResults.push(...data.results);
    return data.info.next;
  };

  while (nextPage) {
    const fetchQueue = [];
    for (let i = 0; i < 5 && nextPage; i++) {
      fetchQueue.push(fetchPage(nextPage));
      nextPage = null;
    }
    const nextPages: (string | null)[] = await Promise.all(fetchQueue);
    nextPage = nextPages.find((next): next is string => next !== null) || null;
  }

  return allResults;
};