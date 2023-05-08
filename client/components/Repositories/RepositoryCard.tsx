import React from "react";
import { AiOutlineStar } from "react-icons/ai";
const RepositoryCard = () => {
  return (
    <div>
      <hr className="h-px bg-gray-700 border-0" />
      <div className="flex justify-between my-6">
        <div className="flex flex-col">
          <div className="flex">
            <div className="text-xl font-bold text-blue-500">
              github-clone-sm
            </div>
            <span className="ml-2 text-xs font-medium rounded-full px-2 text-center pt-1 border-slate-700 border-[1px] opacity-50">
              Public
            </span>
          </div>
          <div className="flex items-center mt-2">
            <svg height={30} width={30}>
              <circle cx="16" cy="16" r="8" strokeWidth="3" fill="blue" />
            </svg>
            <div className="text-sm opacity-50"> Typescript</div>
            <div className="text-sm opacity-50 ms-2">Updated 2 days ago</div>
          </div>
        </div>
        <button
          id="dropdownDefaultButton"
          data-dropdown-toggle="dropdown"
          className="text-white bg-slate-800 hover:bg-slate-800 border-slate-400 border-[1px] font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center h-fit	opacity-50"
          type="button"
        >
          <AiOutlineStar className="mr-2" size={18} />
          Star
        </button>
      </div>
    </div>
  );
};

export default RepositoryCard;
