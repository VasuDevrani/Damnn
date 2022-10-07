import React, { ReactNode } from "react";
import SideNavBar from "../components/SideNavBar";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="box flex flex-row font-poppins">
      <SideNavBar />
      <div className="flex-1 w-full min-h-[100vh]">{children}</div>
    </div>
  );
};

export default Layout;
