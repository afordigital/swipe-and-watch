import { useEffect, useState } from "react";

type Genre = {
  id: number;
  name: string;
};

export const useGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=86f5f3f73bd8480c9ce28e46c1de3b32&language=en-US`
        );
        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  return genres;
};
