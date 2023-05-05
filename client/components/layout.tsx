import React, { ReactNode } from "react";
import Navbar from "./navbar/Navbar";
import { useRouter } from "next/router";

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  console.log(router.pathname);
  const showHead =
    router.pathname === "/login" || router.pathname === "/signup"
      ? false
      : true;
  return (
    <>
      {showHead && <Navbar />}
      {children}
    </>
  );
};

export default Layout;
