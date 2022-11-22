import React from "react";
import { useEffect, useState, useReducer } from "react";

import UserBar from "./user/UserBar";
import PostList from "./post/PostList";
import CreatePost from "./post/CreatePost";

import appReducer from "./reducers";
import { StateContext } from "./context";
import { useResource } from "react-request-hook";

function App() {

  var [initialPosts ,setInitialPosts] = useState([]);


  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    posts: initialPosts,
  });

  const { user } = state;

  useEffect(() => {
    if (user) {
      document.title = `${user.username}’s Blog`;
    } else {
      document.title = "Blog";
    }
  }, [user]);

  const [posts, getPosts] = useResource(() => ({
    url: "/post",
    method: "get",
    headers: {"Authorization": `${state?.user?.access_token}`},
  }));

  useEffect(()=>{
    if(state.user.username){
      getPosts();
    }
  }, [state?.user?.access_token]);

  
  useEffect(() => {
    if (posts && posts.isLoading === false && posts.data) {
        dispatch({ type: 'FETCH_POSTS', posts: posts.data.posts.reverse() })
    }    
  }, [posts]);


  return (
    <div>
      <StateContext.Provider value={{ state, dispatch }}>
        <React.Suspense fallback={"Loading..."}>
          <UserBar user={state.user} dispatch={dispatch} />
        </React.Suspense>
        <PostList />
        {state.user && <CreatePost />}
      </StateContext.Provider>
    </div>
  );
}

export default App;
