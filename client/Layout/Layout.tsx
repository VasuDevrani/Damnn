import React, { ReactNode } from "react";
import SideNavBar from "../components/SideNavBar";
import { useRouter } from "next/router";
import { useAppSelector } from "../context/hooks";
import Loader from "../components/Loader";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const router = useRouter();
  const { userInfo, isLoading } = useAppSelector((state) => state.user);

  return (
    <div className="box flex flex-row font-poppins">
      {userInfo ? (
        <div className={`${router.pathname === "/auth" ? "hidden" : ""}`}>
          <SideNavBar />
        </div>
      ) : (
        ""
      )}
      <div className="flex-1 w-full min-h-[100vh]">{children}</div>
    </div>
  );
};

export default Layout;
