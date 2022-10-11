import type { NextPage } from "next";
import Head from "next/head";
import UploadPost from "../components/UploadPost";
import { BsStar } from "react-icons/bs";
import Posts from "../components/Posts";
import Popular from "../components/Popular";
import SearchBox from "../components/SearchBox";
import { useAppSelector } from "../context/hooks";
import Auth from "../components/auth";

const Home: NextPage = () => {
  const { userInfo } = useAppSelector((state) => state.user);
  return (
    <>
      {userInfo ? (
        <>
          <Head>
            <title>Home</title>
          </Head>
          <div className="flex flex-row w-full h-[100vh] overflow-scroll">
            <div className="flex-[0.60]">
              <div className="flex flex-row justify-between p-2 w-full px-5 items-center sticky top-0 bg-white z-50">
                <p className="text-xl font-bold">Home</p>
                <div>
                  <BsStar />
                </div>
              </div>
              <UploadPost />
              <Posts />
            </div>
            <div className="flex-[0.40] p-3">
              <div className="sticky top-0 py-1 bg-white">
                <SearchBox />
              </div>
              <Popular />
            </div>
          </div>
        </>
      ) : (
        <Auth />
      )}
    </>
  );
};

export default Home;
