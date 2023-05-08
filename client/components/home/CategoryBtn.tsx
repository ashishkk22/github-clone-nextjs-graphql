import React from "react";
import { IconType } from "react-icons/lib";

type CategoryBtnProps = {
  icon: IconType;
  name: string;
  isActive?: boolean;
  count?: number;
};

const CategoryBtn: React.FC<CategoryBtnProps> = ({
  icon: Icon,
  name,
  isActive,
  count,
}) => {
  return (
    <div className="flex flex-col">
      <div
        className={`flex items-center px-2 py-2 rounded-md cursor-pointer hover:bg-slate-800 w-max1 
        `}
      >
        <Icon className="mr-2 opacity-50" />
        <span className="opacity-90">{name}</span>
        {count && (
          <span className="bg-slate-700 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full ml-2">
            {count}
          </span>
        )}
      </div>
      {isActive && (
        <hr className="h-px mt-2 border-orange-500 rounded-md border-[1.5px]" />
      )}
    </div>
  );
};

export default CategoryBtn;
