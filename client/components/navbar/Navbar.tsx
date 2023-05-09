import React from "react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import Category from "./Category";
import Profile from "./Profile";
import { GiHamburgerMenu } from "react-icons/gi";
import { useQuery } from "@apollo/client";
import { GetUserDetailDocument } from "@/generated/graphql";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  const categories = [
    "Pulls",
    "Issues",
    "Codespaces",
    "Marketplace",
    "Explore",
  ];
  const { data, error } = useQuery(GetUserDetailDocument);
  if (error) {
    return null;
  }
  return (
    <nav className="flex items-center justify-between w-full p-4 text-white shadow-sm bg-slate-900 ">
      <div className="flex lg:hidden">
        <GiHamburgerMenu size={28} />
      </div>
      <div
        className="hidden ml-2 cursor-pointer lg:flex"
        onClick={() => router.push("/")}
      >
        <Logo color="white" />
        <div className="ml-4 w-80">
          <SearchBar />
        </div>
      </div>
      <div className="hidden gap-4 font-medium lg:flex">
        <Category categories={categories} />
      </div>
      <div
        className="flex cursor-pointer lg:hidden"
        onClick={() => router.push("/")}
      >
        <Logo color="white" />
      </div>
      {data?.viewer.avatarUrl && <Profile imgSrc={data?.viewer.avatarUrl} />}
    </nav>
  );
};

export default Navbar;
