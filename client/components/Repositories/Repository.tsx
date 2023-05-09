import React, { ReactElement } from "react";
import { NextPageWithLayout } from "@/pages/_app";
import RepositoryCard from "./RepositoryCard";
import { GetServerSidePropsContext } from "next";
import { addApolloState, initializeApollo } from "@/lib/apolloClient";
import { GetReposDocument } from "@/generated/graphql";
import { useQuery } from "@apollo/client";
import { timeAgo } from "@/utils/dateFormatter";

const Repository: NextPageWithLayout = () => {
  const { error, loading, data } = useQuery(GetReposDocument, {
    variables: { name: "ashishkk22", first: 20, after: null },
  });

  return (
    <div className="w-[93%]">
      <div className="flex my-4">
        <label
          htmlFor="small-input"
          className="block text-sm font-medium text-gray-900 dark:text-white"
        ></label>
        <input
          type="text"
          id="small-input"
          placeholder="Find a repository...."
          className="block w-[97%] px-2 py-1 text-gray-500 border border-gray-700 rounded-lg sm:text-xs bg-slate-900 focus:border-blue-700"
        />

        <button
          id="dropdownDefaultButton"
          data-dropdown-toggle="dropdown"
          className="text-white bg-slate-800 hover:bg-slate-800 border-slate-400 border-[1px] font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
          type="button"
        >
          Type
          <svg
            className="w-4 h-4 ml-2"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>

        {/* <div
          id="dropdown"
          className="z-10 block bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Settings
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Earnings
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Sign out
              </a>
            </li>
          </ul>
        </div> */}
      </div>
      {data?.user?.repositories?.edges?.map(edge => {
        const title = edge?.node?.name ?? "";
        const type = edge?.node?.visibility ?? "";
        let language = "Javascript";
        let color = "";
        if (edge?.node?.languages?.edges?.length) {
          color = edge?.node?.languages?.edges[0]?.node.color ?? "";
          language = edge?.node?.languages?.edges[0]?.node.name ?? language;
        }
        let time = timeAgo(edge?.node?.pushedAt) ?? "";
        return (
          <RepositoryCard
            key={edge?.cursor}
            title={title}
            type={type}
            language={language}
            languageColor={color}
            time={time}
          />
        );
      })}
    </div>
  );
};

export default Repository;

export const getServerSideProps = async ({
  req,
}: GetServerSidePropsContext) => {
  try {
    const userToken = req.cookies?.TOKEN;
    const apolloClient = initializeApollo(null, userToken);
    await apolloClient.query({
      query: GetReposDocument,
      variables: { name: "ashishkk22", first: 20, after: null },
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
