"use client";
import { handleSearch } from "@/lib/requests";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import SearchResults from "@/components/SearchResults";

type suggestions = {
  id: number;
  title?: string;
  name?: string;
  vote_average: number;
  poster_path: string;
  media_type?: string;
  release_date?: string;
  first_air_date?: string;
};

const SearchInput = () => {
  const [input, setInput] = useState<string>("");
  const [suggestions, setSuggestions] = useState<suggestions[]>([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (input.trim() !== "") {
        const shows = await handleSearch(input, "search-shows");
        const movies = await handleSearch(input, "search-movies");
        const data = [...shows, ...movies];
        setSuggestions(data);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [input]);

  const handleChange = (value: string) => {
    setInput(value);
  };

  return (
    <div className='relative z-50'>
      <Input
        className=''
        placeholder='Search...'
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
      {suggestions.length > 0 && (
        <div className='border solid rounded-md h-[400px] w-full mt-2 absolute overflow-y-scroll overflow-x-hidden bg-secondary'>
          {suggestions.map((item) => (
            <SearchResults item={item} />
          ))}
        </div>
      )}
    </div>
  );
};
export default SearchInput;
