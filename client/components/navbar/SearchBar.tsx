import React from "react";

const SearchBar = () => {
  return (
    <div className="flex items-center justify-between border-[1px] border-slate-500 rounded-md cursor-pointer">
      <div className="flex flex-1">
        <div className="self-center m-1">
          <svg
            aria-hidden="true"
            height="16"
            viewBox="0 0 16 16"
            version="1.1"
            width="16"
            fill="white"
            data-view-component="true"
          >
            <path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z"></path>
          </svg>
        </div>
        <div className="flex-1 w-12 m-1">Search or jump to...</div>
      </div>
      <div className="m-1 d-flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="20"
          aria-hidden="true"
          className="mr-1"
          fill="white"
        >
          <path
            fill="none"
            stroke="#979A9C"
            opacity=".4"
            d="M3.5.5h12c1.7 0 3 1.3 3 3v13c0 1.7-1.3 3-3 3h-12c-1.7 0-3-1.3-3-3v-13c0-1.7 1.3-3 3-3z"
          ></path>
          <path fill="#979A9C" d="M11.8 6L8 15.1h-.9L10.8 6h1z"></path>
        </svg>
      </div>
    </div>
  );
};

export default SearchBar;
