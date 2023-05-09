import React from "react";
import { PuffLoader } from "react-spinners";

type LoaderPage = {
  fullPage?: boolean;
};

const Loader: React.FC<LoaderPage> = ({ fullPage = false }) => {
  return (
    <div className={`${fullPage ? "fixed left-[50%] top-[44%]" : ""}`}>
      <PuffLoader size={100} color="blue" />
    </div>
  );
};

export default Loader;
