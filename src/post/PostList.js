import React, { useContext, useEffect } from "react";
import { useResource } from "react-request-hook";
import { StateContext } from "../context";
import Post from "./Post";

export default function PostList() {
  const { state } = useContext(StateContext);
  const { posts } = state;
  console.log("postlist" + posts);
  return (
    <div>
      <div>
        {posts.length > 0 && posts.map(
          (p, i) => <Post {...p} key={"post-" + i} />
        )}
      </div>
    </div>
  );
}
