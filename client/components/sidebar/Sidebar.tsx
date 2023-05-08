import React from "react";
import { BsPeople } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";

const Sidebar = () => {
  return (
    <div className="flex flex-col items-center w-[80%]">
      <img
        src="https://avatars.githubusercontent.com/u/83124264?v=4"
        alt="profile picture"
        className="w-[90%] rounded-full border-[1px] border-slate-500"
      />
      <div className="self-start mt-4 text-2xl font-semibold text-start">
        Ashish Kachhadiya
      </div>
      <div className="self-start text-xl opacity-50">ashishkk22</div>
      <button className="mt-4 border-[1px] bg-slate-800	 opacity-70 w-full rounded-lg p-1 border-slate-500	">
        Edit profile
      </button>
      <div className="flex items-center self-start mt-4">
        <span className="opacity-50">
          <BsPeople />
        </span>
        &nbsp;
        <span className="opacity-100"> 3 </span>&nbsp;
        <span className="opacity-50">followers</span>
        &nbsp;
        <span>11</span>
        <span className="opacity-50">following</span>
      </div>
      <div className="flex items-center self-start mt-2">
        <IoLocationOutline className="mr-1 opacity-50" />
        <span>Ahemdabad, Gujarat, India</span>
      </div>
      <div className="flex items-center self-start mt-2">
        <HiOutlineMail className="mr-1 opacity-50" />
        <span>ashishkachhadiya22@gmail.com</span>
      </div>
    </div>
  );
};

export default Sidebar;
