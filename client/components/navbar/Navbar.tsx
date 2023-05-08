import React from "react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import Category from "./Category";
import Profile from "./Profile";
import { GiHamburgerMenu } from "react-icons/gi";
import { useQuery } from "@apollo/client";
import { GetUserAvatarDocument } from "@/generated/graphql";

const Navbar = () => {
  const categories = [
    "Pulls",
    "Issues",
    "Codespaces",
    "Marketplace",
    "Explore",
  ];
  const { data, error } = useQuery(GetUserAvatarDocument);
  if (error) {
    return null;
  }
  return (
    <div className="flex items-center justify-between w-full p-4 text-white shadow-sm bg-slate-800">
      <div className="flex lg:hidden">
        <GiHamburgerMenu size={28} />
      </div>
      <div className="hidden ml-2 lg:flex">
        <Logo color="white" />
        <div className="ml-4 w-80">
          <SearchBar />
        </div>
      </div>
      <div className="hidden gap-4 font-medium lg:flex">
        <Category categories={categories} />
      </div>
      <div className="flex lg:hidden">
        <Logo color="white" />
      </div>
      <Profile imgSrc={data?.viewer.avatarUrl} />
    </div>
  );
};

export default Navbar;
