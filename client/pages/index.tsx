import type { NextPage } from "next";
import Head from "next/head";
import UploadPost from "../components/UploadPost";
import { BsStar } from "react-icons/bs";
import Posts from "../components/Posts";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className="flex flex-row w-full">
        <div className="flex-[0.60]">
          <div className="flex flex-row justify-between p-2 w-full px-5 items-center">
            <p className="text-xl font-bold">Home</p>
            <div>
              <BsStar />
            </div>
          </div>
          <UploadPost />
          <Posts />
        </div>
        <div className="flex-[0.40]"></div>
      </div>
    </>
  );
};

export default Home;
