import Image from "next/image";
import React from "react";

type UserDetailCardProps = {
  name: string;
  login: string;
  image: string;
  btnText: string;
  onClick?: () => void;
};

const UserDetailCard: React.FC<UserDetailCardProps> = ({
  name,
  login,
  image,
  btnText,
  onClick = () => {},
}) => {
  if (!image) return null;
  return (
    <div className="mt-4 mr-2">
      <hr className="h-px bg-gray-700 border-0" />
      <div className="flex justify-center mt-4 items-between">
        <div className="flex w-full gap-2 lg:gap-8">
          <div className="rounded-full min-w-fit">
            <Image
              src={image}
              alt="follower avatar"
              width={56}
              height={56}
              className="rounded-full border-[1px] border-slate-600"
            />
          </div>
          <div>
            <div className="text-xl opacity-80">{name}</div>
            <div className="opacity-50 ">{login}</div>
          </div>
        </div>
        {btnText && (
          <button
            id="dropdownDefaultButton"
            data-dropdown-toggle="dropdown"
            className="text-white bg-slate-800 hover:bg-slate-900 border-slate-400 border-[1px] font-medium rounded-lg text-sm px-4 py-2.5 text-center opacity-50 h-fit whitespace-nowrap"
            type="button"
            onClick={onClick}
          >
            {btnText}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserDetailCard;
