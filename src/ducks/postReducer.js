import axios from "axios";
const initialState = {
  posts: [],
  comment: ""
};

const CREATE_POST = "CREATE_POST";
const CREATE_COMMENT = "CREATE_COMMENT";

export const createPost = (title, type, post, user_id) => {
  console.log(title, type, post, user_id);
  return {
    type: CREATE_POST,
    payload: axios.post("/api/createPost", { title, type, post, user_id })
  };
};
export const createComment = (postOwner, comment, personCommenting) => {
  console.log(postOwner, comment, personCommenting);
  return {
    type: CREATE_COMMENT,
    payload: axios.post("/api/createComment", {
      postOwner,
      comment,
      personCommenting
    })
  };
};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_POST:
      console.log(action.payload);
      return {
        ...state,
        posts: action.payload.data
      };
    case CREATE_COMMENT:
      console.log(action.payload);
      return {
        ...state,
        comments: action.payload.data
      };
    default:
      return state;
  }
}
