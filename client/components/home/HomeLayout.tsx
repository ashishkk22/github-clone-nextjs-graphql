import React, { ReactNode } from "react";
import Sidebar from "../sidebar/Sidebar";
import Repository from "../Repositories/Repository";
import { BsBook } from "react-icons/bs";
import { AiOutlineProject, AiOutlineStar } from "react-icons/ai";
import { GoRepo } from "react-icons/go";
import { FiPackage } from "react-icons/fi";
import CategoryBtn from "./CategoryBtn";
import { useRouter } from "next/router";
type HomeLayoutProps = {
  children: ReactNode;
};

enum PageSections {
  repository = "",
  overview = "overview",
  project = "projects",
  package = "packages",
  star = "stars",
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  const router = useRouter();
  const activeSection = router.pathname.substring(1, router.pathname.length);
  return (
    <div className="flex flex-col min-h-screen text-white pt-14 bg-slate-900 xl:px-48 lg:flex-row">
      <div className="flex flex-col items-center basis-1/3">
        <Sidebar />
      </div>
      <div className="m-4 basis-8/12">
        <div className="flex gap-4 overflow-auto">
          <CategoryBtn
            icon={BsBook}
            name="Overview"
            isActive={PageSections.overview === activeSection}
          />
          <CategoryBtn
            icon={GoRepo}
            name="Repositories"
            isActive={PageSections.repository == activeSection}
          />
          <CategoryBtn
            icon={AiOutlineProject}
            name="Projects"
            isActive={PageSections.project === activeSection}
          />
          <CategoryBtn
            icon={FiPackage}
            name="Packages"
            isActive={PageSections.package === activeSection}
          />
          <CategoryBtn
            icon={AiOutlineStar}
            name="Stars"
            isActive={PageSections.star === activeSection}
          />
        </div>
        <hr className="h-px bg-gray-700 border-0" />
        <div className="flex justify-center lg:justify-start">{children}</div>
      </div>
    </div>
  );
};

export default HomeLayout;
