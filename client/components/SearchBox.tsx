import { IconButton } from "@mui/material";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { FiDelete } from "react-icons/fi";

export default function SearchBox() {
  const [search, setSearch] = useState("");

  return (
    <div className="bg-gray-200 mx-5 px-3 text-base flex flex-row gap-4 p-1 rounded-3xl justify-evenly text-gray-700 items-center">
      <div className="text-xl">
      <BsSearch />
      </div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="search"
        className="bg-gray-200 w-full text-base outline-none p-1"
      />
      {search.length > 0 && (
        <IconButton>
          <div className="text-siteLightBlue text-xl font-bold mr-2">
            <FiDelete />
          </div>
        </IconButton>
      )}
    </div>
  );
}
