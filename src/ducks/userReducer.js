import axios from "axios";
const initialState = {
  username: "",
  password: "",
  email: "",
  user: {},
  pref:[],
  loggedIn: false
};
const UPDATE_USERNAME = "UPDATE_USERNAME";
const UPDATE_PASSWORD = "UPDATE_PASSWORD";
const UPDATE_EMAIL = "UPDATE_EMAIL";
const REGISTER = "REGISTER";
const LOGIN = "LOGIN";
const GET_USER = "GET_USER";
const INSERT_PREF = "INSERT_PREF";

export const updateUsername = username => {
  return {
    type: UPDATE_USERNAME,
    payload: username
  };
};
export const updateEmail = email => {
  return {
    type: UPDATE_EMAIL,
    payload: email
  };
};

export const updatePassword = password => {
  return {
    type: UPDATE_PASSWORD,
    payload: password
  };
};

export const register = (username, password, email) => {
  return {
    type: REGISTER,
    payload: axios.post("/api/signup", { username, password, email })
  };
};

export const login = (username, password) => {
  return {
    type: LOGIN,
    payload: axios.post("/api/signin", { username, password })
  };
};
export const insertPref = (rooms,gender,smoke,pets,profession,bio) => {
  return {
    type: LOGIN,
    payload: axios.post("/api/pref", { rooms,gender,smoke,pets,profession,bio})
  };
}
export const getUser = () => {
  return {
    type: GET_USER,
    payload: axios.get("/api/me")
  };
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USERNAME:
      return {
        ...state,
        username: action.payload
      };
    case UPDATE_PASSWORD:
      return {
        ...state,
        password: action.payload
      };
    case UPDATE_EMAIL:
      return {
        ...state,
        email: action.payload
      };
    case `${REGISTER}_FULFILLED`:
      return {
        ...state,
        user: action.payload.data
      };
    case `${LOGIN}_FULFILLED`:
      console.log(action.payload); // anyway of checking?
      return {
        ...state,
        user: action.payload.data
      };
    case `${GET_USER}_FULFILLED`:
      return {
        ...state,
        user: action.payload.data
      };
      case `${INSERT_PREF}_FULFILLED`:
      return {
        ...state,
        pref: action.payload.data
      };
    default:
      return state;
  }
}
