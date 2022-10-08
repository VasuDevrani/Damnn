import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { FiDelete } from "react-icons/fi";

export default function SearchBox() {
  const [search, setSearch] = useState("");

  return (
    <div className="bg-gray-200 mx-5 px-3 text-base flex flex-row gap-4 w-full p-2 rounded-3xl text-gray-700 items-center">
      <BsSearch />
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="search"
        className="bg-gray-200 w-full text-base outline-none p-1"
      />
      {search.length > 0 && (
        <div className="text-siteLightBlue font-bold">
          <FiDelete />
        </div>
      )}
    </div>
  );
}
