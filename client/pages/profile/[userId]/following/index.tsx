import Following from "@/components/following/Following";
import HomeLayout from "@/components/home/HomeLayout";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

const FollowingPage = () => {
  const router = useRouter();
  const userId: string = router.query.userId as string;
  if (!userId) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Following | Github</title>
      </Head>
      <main className="pt-16">
        <HomeLayout username={userId}>
          <Following username={userId} btnType="See Profile" />
        </HomeLayout>
      </main>
    </>
  );
};

export default FollowingPage;
