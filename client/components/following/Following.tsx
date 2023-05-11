import React from "react";
import FollowingCard from "../UserDetailCard";
import { useQuery } from "@apollo/client";
import { GetFollowingDocument } from "@/generated/graphql";
import Loader from "../loader/Loader";
import { useRouter } from "next/router";

type FollowingProps = {
  username: string;
  btnType: string;
};

const Following: React.FC<FollowingProps> = ({ username, btnType }) => {
  const router = useRouter();

  const { data, error, loading, fetchMore } = useQuery(GetFollowingDocument, {
    variables: { name: username, first: 7, after: null },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
  });

  if (error) return null;

  return (
    <div className="w-[93%]">
      {data?.user?.following?.edges?.map(user => {
        const name = user?.node?.name ?? "";
        const login = user?.node?.login ?? "";
        const image = user?.node?.avatarUrl ?? "";
        return (
          <FollowingCard
            name={name}
            login={login}
            image={image}
            key={user?.node?.id}
            btnText={btnType}
            onClick={() => router.push(login ? `/profile/${login}` : "/")}
          />
        );
      })}
      <div className="flex justify-center mt-12 text-blue-500">
        {loading ? (
          <Loader />
        ) : (
          <button
            className="disabled:opacity-0"
            onClick={() => {
              fetchMore({
                variables: {
                  name: username,
                  first: 7,
                  after: data?.user?.following.pageInfo.endCursor,
                },
              });
            }}
            disabled={!data?.user?.following.pageInfo.hasNextPage}
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default Following;
