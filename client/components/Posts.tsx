import React from "react";
import posts from "../data/postData";
import Post from "./Post";

export default function Posts() {
  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          userName={post.userName}
          time={post.time}
          content={post.content}
          Name={post.Name}
          likes={post.likes}
          comments={post.comments}
          shares={post.shares}
        />
      ))}
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          userName={post.userName}
          time={post.time}
          content={post.content}
          Name={post.Name}
          likes={post.likes}
          comments={post.comments}
          shares={post.shares}
        />
      ))}
    </div>
  );
}
