const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("path");
const userModel = require("./models/user");
const postModel = require("./models/post");

const PORT = 3000;
const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/create", async (req, res) => {
  const user = await userModel.create({
    username: "ashik",
    email: "a@gmail.com",
    age: 22,
  });
  res.send(user);
});

app.get("/create/post", async (req, res) => {
  const post = await postModel.create({
    postData: "blank",
    user: "66db0717d81f4668bb0a999a",
  });
  const user = await userModel.findOne({ _id: "66db0717d81f4668bb0a999a" });
  user.posts.push(user);
  await user.save();
  res.send({
    user,
    post,
  });
});

// server listen
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
