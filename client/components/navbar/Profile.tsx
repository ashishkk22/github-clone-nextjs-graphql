import Image from "next/image";
import React from "react";
import {
  AiOutlineCaretDown,
  AiOutlineBell,
  AiOutlinePlus,
} from "react-icons/ai";

type ProfileType = {
  imgSrc: string;
};

const Profile: React.FC<ProfileType> = ({ imgSrc }) => {
  return (
    <div className="flex items-center justify-center cursor-pointer">
      <AiOutlineBell size={24} />
      <div className="justify-center hidden lg:flex">
        <AiOutlinePlus className="ml-2" size={20} />
        <AiOutlineCaretDown className="mt-1" size={12} />
      </div>
      <div className="hidden mx-4 lg:flex">
        <Image
          className="w-6 h-6 mr-1 rounded-full"
          src={imgSrc}
          alt="user avatar"
          width={100}
          height={100}
        />
        <AiOutlineCaretDown className="mt-2" size={10} />
      </div>
    </div>
  );
};

export default Profile;
