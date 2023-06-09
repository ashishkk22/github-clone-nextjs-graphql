import React from "react";
import FollowerCard from "../UserDetailCard";
import { useQuery } from "@apollo/client";
import { GetFollowerDocument } from "@/generated/graphql";
import Loader from "../loader/Loader";
import { useRouter } from "next/router";

type FollowerProps = {
  username: string;
  btnType: string;
};

const Follower: React.FC<FollowerProps> = ({ username, btnType }) => {
  const router = useRouter();
  const { data, error, loading, fetchMore } = useQuery(GetFollowerDocument, {
    variables: { name: username, first: 10, after: null },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
  });

  if (error) {
    router.push("/error");
  }

  return (
    <div className="w-[93%]">
      {data?.user?.followers?.edges?.map(follower => {
        const name = follower?.node?.name ?? "";
        const login = follower?.node?.login ?? "";
        const image = follower?.node?.avatarUrl ?? "";
        return (
          <FollowerCard
            name={name}
            login={login}
            image={image}
            key={follower?.node?.id}
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
                  first: 10,
                  after: data?.user?.followers.pageInfo.endCursor ?? null,
                },
              });
            }}
            disabled={!data?.user?.followers.pageInfo.hasNextPage}
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default Follower;
