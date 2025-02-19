"use client";

import { SearchIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useSearchParam } from "@/hooks/use-search-param";

const SearchInput = () => {
  const [value, setValue] = useState("");
  const [search, setSearch] = useSearchParam("search");
  console.log(search);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(value);
    inputRef.current?.blur();
  };

  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="relative max-w-[720px] w-full">
        <form onSubmit={(e) => handleSubmit(e)}>
          <Input
            placeholder="Search"
            ref={inputRef}
            onChange={(e) => handleChange(e)}
            value={value}
            className="rounded-lg px-12 py-5 md:text-base  focus-visible:placeholder:text-black border-none focus-visible:shadow-md focus-visible:ring-0 focus-visible:bg-[#F0F3F9] bg-neutral-100/60"
          />
          <Button
            variant="ghost"
            type="submit"
            className="absolute left-4 top-[4px] -translate-x-2.5 hover:bg-neutral-200 rounded-full [&_svg]:size-4 h-8 w-8"
          >
            <SearchIcon />
          </Button>
          {value && (
            <Button
              variant="ghost"
              type="button"
              className="absolute right-4 top-[4px] -translate-x-2.5 hover:bg-neutral-200 rounded-full [&_svg]:size-4 h-8 w-8"
              onClick={() => {
                setValue("");
                setSearch("");
              }}
            >
              <XIcon />
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default SearchInput;
