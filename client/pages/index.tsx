import type { NextPage } from "next";
import Head from "next/head";
import UploadPost from "../components/UploadPost";
import { BsStar } from "react-icons/bs";
import Posts from "../components/Posts";
import SearchBox from "../components/SearchBox";
import { useAppDispatch, useAppSelector } from "../context/hooks";
import Auth from "../components/auth";
import { useEffect } from "react";
import Loader from "../components/Loader";
import { timeline } from "../slices/PostSlice";
import { postI } from "../interfaces/postInterface";
import ForFollow from "../components/ForFollow";

const Home: NextPage = ({}) => {
  const { userInfo } = useAppSelector((state) => state.user);
  const { posts, isLoading } = useAppSelector((state) => state.post);

  const dispatch = useAppDispatch();

  // const [postData, setPostData] = useState([]);
  // const [loading, setLoading] = useState(false);

  // const getPosts = async () => {
  //   setLoading(true);
  //   try {
  //     const config = {
  //       headers: { Authorization: `Bearer ${userInfo?.token}` },
  //     };
  //     const { data } = await instance.get(`/post/${userInfo?._id}`, config);
  //     setPostData(data);
  //     setLoading(false);
  //   } catch (err: any) {
  //     console.log(err.message);
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    if (userInfo) dispatch(timeline(userInfo));
  }, [userInfo]);
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
              {!isLoading ? <Posts posts={posts} /> : <Loader />}
            </div>
            <div className="flex-[0.40] p-3">
              <div className="sticky top-0 py-1 bg-white">
                <SearchBox />
              </div>
              <ForFollow />
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
