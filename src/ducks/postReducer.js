import axios from "axios";
const initialState = {
  posts: []
};

const CREATE_POST = "CREATE_POST";

export const createPost = (title, type, post, user_id) => {
  console.log(title, type, post, user_id);
  return {
    type: CREATE_POST,
    payload: axios.post("/api/createPost", { title, type, post, user_id })
  };
};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_POST:
      console.log(action.payload);
      return {
        ...state,
        posts: action.payload
      };
    default:
      return state;
  }
}
