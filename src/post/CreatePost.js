import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { useResource } from "react-request-hook";
import { StateContext } from "../context";

export default function CreatePost() {
  const current = new Date();
  const dateCreated = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { state, dispatch } = useContext(StateContext);
  const { user } = state;
  const [error, setError] = useState(false);
  const isCompleted = false;
  const dateCompleted = "";

  const [post, createPost] = useResource(
    ({ title, content, author, dateCreated, isCompleted, dateCompleted }) => ({
      url: "/post",
      method: "post",
      headers: { Authorization: `${state?.user?.access_token}` },
      data: { title, content, author, dateCreated, isCompleted, dateCompleted },
    })
  );

  useEffect(() => {
    console.log("Create post");
    if (post?.isLoading === false && post?.data) {
      dispatch({
        type: "CREATE_POST",
        title: post.data.title,
        content: post.data.content,
        author: user.username,
        id: post.data._id,
        dateCreated: post.data.dateCreated,
        isCompleted: post.data.isCompleted,
      });
    }
  }, [post]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createPost({
          title,
          content,
          author: user.username,
          dateCreated,
          isCompleted,
          dateCompleted,
        });
      }}
    >
      <div>
        Author: <b>{user.username}</b>
      </div>
      <div>
        <label htmlFor="create-title">Title:</label>
        <input
          type="text"
          name="create-title"
          id="create-title"
          required
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <textarea
        value={content}
        required
        onChange={(event) => setContent(event.target.value)}
      />
      <input type="submit" value="Create" />
    </form>
  );
}
