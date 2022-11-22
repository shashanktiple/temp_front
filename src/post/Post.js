import React, { useContext, useEffect, useState } from "react";
import { useResource } from "react-request-hook";
import { StateContext } from "../context";

export default function Post({
  _id,
  title,
  content,
  author,
  dateCreated,
  isCompleted,
  dateCompleted,
}) {
  const { state, dispatch } = useContext(StateContext);

  const current = new Date();
  console.log("Delete post");
  const currentDate = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const [deleted, deletePost] = useResource((_id) => ({
    url: `/post/delete/${_id}`,
    method: "DELETE",
    headers: { Authorization: `${state.user.access_token}` },
  }));

  const [post, togglePost] = useResource(
    (_id, author, title, content, isCompleted, dateCreated, dateCompleted) => ({
      url: `/post/update/${_id}`,
      method: "PUT",
      headers: { Authorization: `${state.user.access_token}` },
      data: {
        _id,
        author,
        title,
        content,
        isCompleted,
        dateCreated,
        dateCompleted,
      },
    })
  );

  const handleChange = (checked) => {
    console.log(checked);
    isCompleted = checked;
    dateCompleted = checked ? currentDate : "";
    togglePost(
      _id,
      author,
      title,
      content,
      isCompleted,
      dateCreated,
      dateCompleted
    );
    dispatch({
      type: "TOGGLE_TODO",
      id: _id,
      title,
      content,
      author: author,
      dateCreated,
      dateCompleted,
      isCompleted,
    });
  };

  return (
    <div className="container" style={{ marginBottom: "40px" }}>
      <div className="row">
        <div className="col">
          <input
            type="checkbox"
            checked={isCompleted}
            value={isCompleted}
            onChange={(event) => handleChange(event.target.checked, _id)}
          />
        </div>
        <div className="col">
          <h3>{title}</h3>
        </div>
      </div>
      <div className="row">
        <i>
          Description <b>{content}</b>
        </i>
      </div>
      <i>
        Written by <b>{state.user.username}</b>
      </i>
      <br></br>
      <i>
        Date Created <b>{dateCreated}</b>
      </i>
      <br></br>
      <i>
        Completed <b>{isCompleted ? "True" : "false"}</b>
      </i>
      <br></br>
      <i>
        Date Completion<b>{dateCompleted}</b>
      </i>
      <div>
        <input
          type="submit"
          value="Delete"
          onClick={(event) => {
            event.preventDefault();
            deletePost(_id);
            dispatch({
              type: "DELETE_TODO",
              id: _id,
            });
          }}
        />
      </div>
    </div>
  );
}
