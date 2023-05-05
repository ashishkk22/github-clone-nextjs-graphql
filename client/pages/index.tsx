import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import { gql, useQuery } from "@apollo/client";
import { NextPageWithLayout } from "./_app";
import { ReactElement } from "react";
import Layout from "@/components/layout";
import Repository from "@/components/home/Repository";
import HomeLayout from "@/components/home/HomeLayout";

export const CURRENT_USER = gql`
  fragment OneUser on User {
    id
    name
    login
    email
    bio
    avatarUrl
    company
    twitterUsername
    createdAt
    isFollowingViewer
    viewerIsFollowing
    isViewer
    location
    url
    followers(first: 1) {
      totalCount
      nodes {
        id
      }
    }
    following(first: 1) {
      totalCount
      nodes {
        id
      }
    }
    repositories(first: 1) {
      totalCount
      nodes {
        id
      }
    }
  }
`;
const GET_CURRENT_VIEWER = gql`
  ${CURRENT_USER}
  query GetUserDetail {
    viewer {
      ...OneUser
    }
  }
`;

const Home: NextPageWithLayout = () => {
  const { error, loading, data } = useQuery(GET_CURRENT_VIEWER);
  console.log(error, loading, data);
  return (
    <main className="bg-slate-900">
      <Repository />
    </main>
  );
};
Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <HomeLayout>{page}</HomeLayout>
    </Layout>
  );
};

export default Home;
