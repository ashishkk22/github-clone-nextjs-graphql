import React from "react";
import { BsPeople } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import { useQuery } from "@apollo/client";
import { GetUserDetailSidebarDocument } from "@/generated/graphql";
import { GetServerSidePropsContext } from "next";
import { addApolloState, initializeApollo } from "@/lib/apolloClient";
import Image from "next/image";

const Sidebar = () => {
  const { data } = useQuery(GetUserDetailSidebarDocument);
  return (
    <div className="flex items-center lg:w-[80%] w-[90%] flex-col">
      <div className="flex items-center gap-3 lg:flex-col lg:items-start">
        <Image
          src={data?.viewer.avatarUrl}
          alt="profile picture"
          className="lg:w-[90%] rounded-full border-[1px] border-slate-500 w-[30%]"
          width={1200}
          height={1200}
        />
        <div>
          <div className="self-start mt-4 text-2xl font-semibold text-start">
            {data?.viewer.name}
          </div>
          <div className="self-start text-xl opacity-50">
            {data?.viewer.login}
          </div>
        </div>
      </div>
      <button className="mt-4 border-[1px] bg-slate-800	 opacity-70 w-full rounded-lg p-1 border-slate-500	">
        Edit profile
      </button>
      <div className="flex items-center self-start mt-4">
        <span className="opacity-50">
          <BsPeople />
        </span>
        &nbsp;
        <span className="opacity-100">{data?.viewer.followers.totalCount}</span>
        &nbsp;
        <span className="opacity-50">followers</span>
        &nbsp;
        <span>{data?.viewer.following.totalCount}</span>
        <span className="opacity-50">following</span>
      </div>
      <div className="flex items-center self-start mt-2">
        <IoLocationOutline className="mr-1 opacity-50" />
        <span>{data?.viewer.location}</span>
      </div>
      <div className="flex items-center self-start mt-2">
        <HiOutlineMail className="mr-1 opacity-50" />
        <span>{data?.viewer.email}</span>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  req,
}: GetServerSidePropsContext) => {
  try {
    const userToken = req.cookies?.TOKEN;
    const apolloClient = initializeApollo(null, userToken);
    await apolloClient.query({
      query: GetUserDetailSidebarDocument,
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

export default Sidebar;
