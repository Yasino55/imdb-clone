"use client";
import { handleSearch } from "@/lib/requests";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import SearchResults from "@/components/SearchResults";

type Suggestions = {
  id: number;
  title?: string;
  name?: string;
  vote_average?: number;
  poster_path: string;
  media_type?: string;
  release_date?: string;
  first_air_date?: string;
};

const SearchInput = () => {
  const [input, setInput] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Suggestions[]>([]);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (input.trim() !== "") {
        const data = await handleSearch(input);

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

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsFocused(false);
    }
  };

  return (
    <div className='relative' onBlur={handleBlur}>
      <Input
        className=''
        placeholder='Search...'
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={handleFocus}
        // onBlur={handleBlur}
      />
      {isFocused && suggestions.length > 0 && (
        <div className='border solid rounded-md h-[500px] md:w-[370px] w-[220px] mt-2 overflow-y-scroll overflow-x-hidden bg-secondary absolute z-20'>
          {suggestions.map((item) => (
            <SearchResults key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};
export default SearchInput;
