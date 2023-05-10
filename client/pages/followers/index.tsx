import Follower from "@/components/follower/Follower";
import HomeLayout from "@/components/home/HomeLayout";
import Loader from "@/components/loader/Loader";
import { GetUsernameDocument } from "@/generated/graphql";
import { useQuery } from "@apollo/client";
import Head from "next/head";
import React from "react";

const FollowersPage = () => {
  const { data, loading } = useQuery(GetUsernameDocument);
  if (loading) {
    <Loader />;
  }
  return (
    <>
      <Head>
        <title>Follower | Github</title>
      </Head>
      <main className="pt-16">
        {data?.viewer.login && (
          <HomeLayout username={data?.viewer.login}>
            {data?.viewer.login && <Follower username={data?.viewer.login} />}
          </HomeLayout>
        )}
      </main>
    </>
  );
};

export default FollowersPage;
