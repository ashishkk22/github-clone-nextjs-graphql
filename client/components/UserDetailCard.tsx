import Image from "next/image";
import React from "react";

type UserDetailCardProps = {
  name: string;
  login: string;
  image: string;
  btnText: string;
};

const UserDetailCard: React.FC<UserDetailCardProps> = ({
  name,
  login,
  image,
  btnText,
}) => {
  return (
    <div className="mt-4">
      <hr className="h-px bg-gray-700 border-0" />
      <div className="flex mt-4 items-between">
        <div className="flex w-full gap-8">
          <div className="w-14 h-14 rounded-full border-[1px] border-slate-600">
            <Image
              src={image}
              alt="follower avatar"
              width={100}
              height={100}
              className="rounded-full"
            />
          </div>
          <div>
            <div className="text-xl opacity-80">{name}</div>
            <div className="opacity-50 ">{login}</div>
          </div>
        </div>
        <button
          id="dropdownDefaultButton"
          data-dropdown-toggle="dropdown"
          className="text-white bg-slate-800 hover:bg-slate-800 border-slate-400 border-[1px] font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center h-fit	opacity-50"
          type="button"
        >
          {btnText}
        </button>
      </div>
    </div>
  );
};

export default UserDetailCard;
