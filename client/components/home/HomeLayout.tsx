import React, { ReactNode } from "react";
import Sidebar from "../sidebar/Sidebar";
import Repository from "./Repository";

type HomeLayoutProps = {
  children: ReactNode;
};

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  console.log("called home layout");
  return (
    <div className="flex flex-row min-h-screen text-white bg-slate-900">
      <div className="basis-1/3">
        <Sidebar />
      </div>
      <div className="basis-8/12">{children}</div>
    </div>
  );
};

export default HomeLayout;
