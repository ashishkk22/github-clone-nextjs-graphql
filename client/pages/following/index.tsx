import Following from "@/components/following/Following";
import HomeLayout from "@/components/home/HomeLayout";
import Loader from "@/components/loader/Loader";
import { GetUsernameDocument } from "@/generated/graphql";
import { useQuery } from "@apollo/client";
import Head from "next/head";
import React from "react";

const FollowingPage = () => {
  const { data, loading } = useQuery(GetUsernameDocument);
  if (loading) {
    <Loader />;
  }
  return (
    <>
      <Head>
        <title>Following | Github</title>
      </Head>
      <main className="pt-16">
        {data?.viewer.login && (
          <HomeLayout username={data?.viewer.login}>
            {data?.viewer.login && (
              <Following username={data?.viewer.login} btnType="Follow Back" />
            )}
          </HomeLayout>
        )}
      </main>
    </>
  );
};

export default FollowingPage;
