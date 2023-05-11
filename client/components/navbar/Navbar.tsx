import React, { ChangeEvent, useReducer, useState } from "react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import Category from "./Category";
import Profile from "./Profile";
import { GiHamburgerMenu } from "react-icons/gi";
import { useRouter } from "next/router";
import SearchModal from "./SearchModal";
import { useQuery } from "@apollo/client";
import { GetUserDetailDocument } from "@/generated/graphql";
import { GetServerSidePropsContext } from "next";
import { addApolloState, initializeApollo } from "@/lib/apolloClient";

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

  if (error) return null;

  const [isOpen, toggler] = useReducer(state => !state, false);

  return (
    <>
      <nav className="fixed z-50 flex items-center justify-between w-full p-4 text-white shadow-sm bg-slate-900">
        <div className="flex lg:hidden">
          <GiHamburgerMenu size={28} />
        </div>
        <div className="hidden ml-2 cursor-pointer lg:flex">
          <div onClick={() => router.push("/")}>
            <Logo color="white" />
          </div>
          <button className="ml-4 w-80" onClick={toggler}>
            <SearchBar />
          </button>
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
      {isOpen && <SearchModal handleClose={toggler} />}
    </>
  );
};

export default Navbar;

export const getServerSideProps = async ({
  req,
}: GetServerSidePropsContext) => {
  try {
    const userToken = req.cookies?.TOKEN;
    const apolloClient = initializeApollo(null, userToken);
    await apolloClient.query({
      query: GetUserDetailDocument,
    });
    return addApolloState(apolloClient, {
      props: {},
    });
  } catch (err) {
    return {
      props: {},
    };
  }
};
