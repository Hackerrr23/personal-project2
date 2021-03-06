import axios from "axios";
const initialState = {
  username: "",
  password: "",
  email: "",
  user: {},
  pref:[],
  loggedIn: false,
  profile_pic: {}
};
const UPDATE_USERNAME = "UPDATE_USERNAME";
const UPDATE_PASSWORD = "UPDATE_PASSWORD";
const UPDATE_EMAIL = "UPDATE_EMAIL";
const REGISTER = "REGISTER";
const LOGIN = "LOGIN";
const PROFILE_PIC= "PROFILE_PIC"
// const CURRENT_PREF = "CURRENT_PREF";
const INSERT_PREF = "INSERT_PREF";
const DELETE_PREF = "DELETE_PREF"


export const updateProfile = profile => {
  console.log(profile)
  return {
    type: PROFILE_PIC,
    payload: profile
  };
}
export const updateUsername = username => {
  return {
    type: UPDATE_USERNAME,
    payload: username
  };
};
export const updateEmail = email => {
  // console.log("email hit")
  // console.log(email)
  return {
    type: UPDATE_EMAIL,
    payload: email
  };
};

export const updatePassword = password => {
  // console.log(password)
  return {
    type: UPDATE_PASSWORD,
    payload: password
  };
};

export const register = (username, password, email) => {
  // console.log(username, password, email)
  return {
    type: REGISTER,
    payload: axios.post("/api/signup", { username, password, email })
  };
};

export const login = (username, password) => {
  // console.log("user hit")
  return {
    type: LOGIN,
    payload: axios.post("/api/signin", { username, password })
  };
};
export const insertPref = (rooms,gender,smoke,pets,profession,bio,user_id) => {
  // console.log("insert pref hit")
  return {
    type: INSERT_PREF,
    payload: axios.post("/api/pref", { rooms,gender,smoke,pets,profession,bio,user_id})
  };
}
export const deletePref = id => {
  // console.log("delete pref hit")
  // console.log(id);
  return {
    type: DELETE_PREF,
    payload: axios.delete(`/api/deletePref/${id}`)
  }
}
// export const getCurrentPref = () => {
//   console.log("current pref hit")
//   console.log(initialState)
//   return {
//     type: CURRENT_PREF,
//     payload: axios.get(`/api/current/${initialState.user.id}`)
//   };
// };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case PROFILE_PIC:
    console.log(action.payload)
      return {
        ...state,
        profile_pic: action.payload
      };
    case UPDATE_USERNAME:
    // console.log(action.payload)
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
      // console.log(action.payload); // anyway of checking?
      return {
        ...state,
        user: action.payload.data
      };
    // case `${CURRENT_PREF}_FULFILLED`:
    //   return {
    //     ...state,
    //     pref: action.payload.data
    //   };
      case `${INSERT_PREF}_FULFILLED`:
      return {
        ...state,
        pref: action.payload.data
      };
      case `${DELETE_PREF}_FULFILLED`:
        return {
          ...state,
              pref: action.payload.data
        };
    default:
      return state;
  }
}
