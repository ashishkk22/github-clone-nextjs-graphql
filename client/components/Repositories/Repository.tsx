import React from "react";
import RepositoryCard from "./RepositoryCard";
import { GetReposDocument } from "@/generated/graphql";
import { useQuery } from "@apollo/client";
import { timeAgo } from "@/utils/dateFormatter";
import Loader from "../loader/Loader";

type RepositoryProps = {
  username: string | undefined;
};

const Repository: React.FC<RepositoryProps> = ({ username }) => {
  if (!username) {
    return null;
  }
  const { error, loading, data, fetchMore } = useQuery(GetReposDocument, {
    variables: { name: username, first: 10, after: null },
    notifyOnNetworkStatusChange: true,
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
          className="block w-[97%] px-2 py-1 text-gray-500 border border-gray-700 rounded-lg  bg-slate-900 focus:border-blue-700"
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
      <div className="flex justify-center mt-12 text-blue-500">
        {loading ? (
          <Loader />
        ) : (
          <button
            className="flex items-center"
            onClick={() => {
              fetchMore({
                variables: {
                  name: "ashishkk22",
                  first: 10,
                  after: data?.user?.repositories.pageInfo.endCursor,
                },
              });
            }}
            disabled={!data?.user?.repositories.pageInfo.hasNextPage}
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default Repository;
