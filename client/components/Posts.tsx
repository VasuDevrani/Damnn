import React from "react";
import Post from "./Post";
import { postI } from "../interfaces/postInterface";

export default function Posts({ posts }: { posts: postI[] }) {
  return (
    <>
      {posts.length > 0 ? (
        <div>
          {posts.map((post) => (
            <Post
              key={post._id}
              _id={post._id}
              name={post?.user && post.user.name}
              profile={
                post?.user
                  ? post.user.poster_path
                    ? post.user.poster_path
                    : ""
                  : ""
              }
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
