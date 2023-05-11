import React, { useState } from "react";
import RepositoryCard from "./RepositoryCard";
import { GetReposDocument } from "@/generated/graphql";
import { useQuery } from "@apollo/client";
import { timeAgo } from "@/utils/dateFormatter";
import Loader from "../loader/Loader";

type RepositoryProps = {
  username: string | undefined;
};

const Repository: React.FC<RepositoryProps> = ({ username }) => {
  const [searchQuery, setSearchQuery] = useState("");

  if (!username) {
    return null;
  }

  const { error, loading, data, fetchMore } = useQuery(GetReposDocument, {
    variables: { name: username, first: 10, after: null },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
  });

  const filteredData = data?.user?.repositories.edges?.filter(repo => {
    return repo?.node?.name.includes(searchQuery);
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
          className="block w-full px-2 py-2 text-gray-500 border border-gray-700 rounded-lg bg-slate-900 focus:border-blue-700"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>
      {filteredData?.length && filteredData.length >= 0 ? (
        <>
          {filteredData?.map(edge => {
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
        </>
      ) : (
        <div className="text-center text-blue opacity-60">
          {searchQuery && "Opps ! Repository not found !"}
        </div>
      )}

      <div className="flex justify-center mt-12 text-blue-500">
        {loading ? (
          <Loader />
        ) : (
          <button
            className={`text-center text-blue-500 disabled:opacity-0 ${
              searchQuery !== "" ? "opacity-0" : ""
            }`}
            onClick={() => {
              fetchMore({
                variables: {
                  name: username,
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
