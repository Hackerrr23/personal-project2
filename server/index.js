require("dotenv").config();
const express = require("express");
const app = express();
const { json } = require("body-parser");
const massive = require("massive");
const { register, login } = require("./controller/auth");
const { sendEmailNotification } = require("./controller/email");
const {
  getNotifications,
  peopleAndComments
} = require("./controller/notifications");
const { createComment, getComments } = require("./controller/comments");
const { getUsers, userProfile, filteredUsers,addImage } = require("./controller/users");
const { createPost, getPosts } = require("./controller/posts");
const {
  preferences,
  me,
  currentUserPref,
  deletePreference,
  updatePreference,
  commentersPreferences
} = require("./controller/preferences");

app.use( express.static( `${__dirname}/../build` ) )

const path = require('path'); 


const session = require("express-session");
const port = 4000;
app.use(json());
const AWS = require("aws-sdk");
const fs = require("fs");
const fileType = require("file-type");
const bluebird = require("bluebird");
const multiparty = require("multiparty");

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
// configure the keys for accessing AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// configure AWS to work with promises
AWS.config.setPromisesDependency(bluebird);

// create S3 instance
const s3 = new AWS.S3();

// abstracts function to upload a file returning a promise
const uploadFile = (buffer, name, type) => {
  const params = {
    ACL: "public-read",
    Body: buffer,
    Bucket: process.env.S3_BUCKET,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`
  };
  return s3.upload(params).promise();
};

// Define POST route
app.post("/api/upload", (request, response) => {
  const form = new multiparty.Form();
  form.parse(request, async (error, fields, files) => {
    if (error) throw new Error(error);
    try {
      const path = files.file[0].path;
      const buffer = fs.readFileSync(path);
      const type = fileType(buffer);
      const timestamp = Date.now().toString();
      const fileName = `bucketFolder/${timestamp}-lg`;
      const data = await uploadFile(buffer, fileName, type);
      return response.status(200).send(data);
    } catch (error) {
      return response.status(400).send(error);
    }
  });
});

massive(process.env.CONNECTION_STRING)
  .then(dbInstance => {
    app.set("db", dbInstance);
    console.log("connected");
  })
  .catch(err => console.log(err));
//auth
app.post("/api/signup", register);
app.post("/api/signin", login);

//users
app.get("/api/users", getUsers);
app.get("/api/users/:id", userProfile);
app.get("/api/me", me);
app.post("/api/register",register)

//filtered users
app.get("/api/filtered", filteredUsers);

//preferences
app.post("/api/pref", preferences);
app.get("/api/current/:id", currentUserPref);
app.delete("/api/deletePref/:id", deletePreference);
app.put("/api/editPreference/", updatePreference);

//person commenting's perferences
app.get("/api/commentersPreferences", commentersPreferences)

//posts
app.post("/api/createPost", createPost);
app.get("/api/posts", getPosts);

//comments
app.get("/api/comments", getComments);
app.post("/api/createComment", createComment);

//notifications
app.get("/api/notifications/:id", getNotifications);
app.get("/api/peopleAndComments/:id", peopleAndComments);

//email notification
app.post("/api/email", sendEmailNotification);

app.post("/api/image",addImage)

app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '../build/index.html'));
});
app.listen(port, () => console.log(`Listening on port ${port}`));
