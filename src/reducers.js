function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
    case "REGISTER":
      return {
        username : action.username,
        access_token: action.access_token,
      };
    case "LOGOUT":
      return "";
    default:
      return state;
  }
}

function postReducer(state, action) {
  switch (action.type) {
    case "CREATE_POST":
      console.log("Create post");
      const newPost = {
        title: action.title,
        content: action.content,
        author: action.author,
        dateCreated: action.dateCreated,
        dateCompleted: "",
        isCompleted: action.isCompleted,
        _id:action.id,
      };
      return [newPost, ...state];
    case "FETCH_POSTS":
      return action.posts;
    case "RESET_POSTS":
      return [];
    case "TOGGLE_TODO":
      console.log("Toggle");
      state = state.map((x) => {
        if (x._id === action.id) {
          x.isCompleted = action.isCompleted;
          x.dateCompleted = action.dateCompleted;
        }
        return x;
      });
      return state;
    case "DELETE_TODO":
      return state.filter(deleteItem => deleteItem._id !== action.id);
    default:
      return state;
  }
}
export default function appReducer(state, action) {
  return {
    user: userReducer(state.user, action),
    posts: postReducer(state.posts, action),
  };
}
