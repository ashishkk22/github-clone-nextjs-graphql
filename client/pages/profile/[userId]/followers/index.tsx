import Follower from "@/components/follower/Follower";
import HomeLayout from "@/components/home/HomeLayout";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

const FollowersPage = () => {
  const router = useRouter();
  const userId: string = router.query.userId as string;
  if (!userId) {
    return null;
  }
  return (
    <>
      <Head>
        <title>Follower | Github</title>
      </Head>
      <main className="pt-16">
        <HomeLayout username={userId}>
          <Follower username={userId} />
        </HomeLayout>
      </main>
    </>
  );
};

export default FollowersPage;
