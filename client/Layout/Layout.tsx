import React, { ReactNode, useEffect } from "react";
import SideNavBar from "../components/SideNavBar";
import { useRouter } from "next/router";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const router = useRouter();

  return (
    <div className="box flex flex-row font-poppins">
      <div className={`${router.pathname === "/auth" ? "hidden" : ""}`}>
        <SideNavBar />
      </div>
      <div className="flex-1 w-full min-h-[100vh]">{children}</div>
    </div>
  );
};

export default Layout;
