import React from "react";
import { BsPeople } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import { useQuery } from "@apollo/client";
import { GetUserDetailByUserIdDocument } from "@/generated/graphql";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Loader from "../loader/Loader";

type SidebarProps = {
  username: string;
};

const Sidebar: React.FC<SidebarProps> = ({ username }) => {
  const { data, error, loading } = useQuery(GetUserDetailByUserIdDocument, {
    variables: {
      name: username,
    },
  });
  const router = useRouter();
  if (error) {
    return <div>Please enter the valid github token</div>;
  }

  if (loading) {
    return <Loader fullPage />;
  }
  return (
    <div className="flex items-center lg:w-[80%] w-[90%] flex-col">
      <div className="flex items-center gap-3 lg:flex-col lg:items-start">
        {data?.user?.avatarUrl && (
          <Image
            src={data?.user.avatarUrl}
            alt="profile picture"
            className="lg:w-[90%] rounded-full border-[1px] border-slate-500 w-[30%]"
            width={1200}
            height={1200}
            priority
          />
        )}
        <div>
          <div className="self-start mt-4 text-2xl font-semibold text-start">
            {data?.user?.name}
          </div>
          <div className="self-start text-xl opacity-50">
            {data?.user?.login}
          </div>
        </div>
      </div>
      <button className="mt-4 border-[1px] bg-slate-800	 opacity-70 w-full rounded-lg p-1 border-slate-500	">
        Edit profile
      </button>
      <div className="flex items-center self-start mt-4">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => router.push("/followers")}
        >
          <span className="opacity-50">
            <BsPeople />
          </span>
          &nbsp;
          <span className="opacity-100">
            {data?.user?.followers.totalCount}
          </span>
          &nbsp;
          <span className="opacity-50">followers</span>
        </div>
        <div
          className="flex items-center cursor-pointer"
          onClick={() => router.push("/following")}
        >
          &nbsp;
          <span>{data?.user?.following.totalCount}</span>
          <span className="opacity-50">following</span>
        </div>
      </div>
      <div className="flex items-center self-start mt-2">
        <IoLocationOutline className="mr-1 opacity-50" />
        <span>{data?.user?.location}</span>
      </div>
      <div className="flex items-center self-start mt-2">
        <HiOutlineMail className="mr-1 opacity-50" />
        <span>{data?.user?.email}</span>
      </div>
    </div>
  );
};

export default Sidebar;
