import React from "react";
import Post from "./Post";
import { postI } from "../interfaces/postInterface";
import { useAppSelector } from "../context/hooks";

export default function Posts({ posts }: { posts: postI[] }) {
  const { userInfo } = useAppSelector((state) => state.user);

  return (
    <>
      {posts.length > 0 ? (
        <div>
          {posts.map((post) => (
            <Post
              key={post._id}
              _id={post._id}
              name={userInfo?.name}
              time={post.time}
              images={post.images}
              content={post.content}
              likes={post.likes}
              comments={post.comments}
              shares={post.shares}
            />
          ))}
        </div>
      ) : (
        <h1>No posts available</h1>
      )}
    </>
  );
}
