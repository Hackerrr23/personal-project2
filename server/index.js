require("dotenv").config();
const express = require("express");
const app = express();
const { json } = require("body-parser");
const massive = require("massive");
const { register, login } = require("./controller/auth");
const { getUsers, userProfile } = require("./controller/users");
const { createPost, getPosts } = require("./controller/posts");
const {
  preferences,
  me,
  currentUserPref
} = require("./controller/preferences");
const session = require("express-session");
const port = 4000;
app.use(json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 * 2
    }
  })
);

massive(process.env.CONNECTION_STRING)
  .then(dbInstance => {
    app.set("db", dbInstance);
    console.log("connected");
  })
  .catch(err => console.log(err));

app.post("/api/signup", register);
app.post("/api/signin", login);
app.get("/api/users", getUsers);
app.get("/api/users/:id", userProfile);
app.get("/api/me", me);

//preferences
app.post("/api/pref", preferences);
app.get("/api/current/:id", currentUserPref);

//posts
app.post("/api/createPost", createPost);
app.get("/api/posts", getPosts);

app.listen(port, () => console.log(`Listening on port ${port}`));
