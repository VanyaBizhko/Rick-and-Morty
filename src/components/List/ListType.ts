export interface Character {
  id: number;
  name: string;
  species: string;
  gender: string;
  status: string;
  image: string;
  episode: string[];
}

export interface ApiResponse {
  info: {
    next: string | null;
  };
  results: Character[];
}