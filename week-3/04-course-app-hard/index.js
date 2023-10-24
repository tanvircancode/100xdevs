// working properly
//my code starts from here hard.js

const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());


const secretKeyAdmin = "rbje4PkCZb2Fzqsj9OFJtjBw5TM";
const secretKeyUsers = "tA0vNplLmEwPhwpPo32upeCl";

const userSchema = new mongoose.Schema({
  username: { type: String },
  password: String,
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean,
});

const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Course = mongoose.model("Course", courseSchema);

const generateJwtAdmin = (user) => {
  const payload = {
    username: user.username,
    role: user.role,
  };
  return jwt.sign(payload, secretKeyAdmin, { expiresIn: "1h" });
};

const generateJwtUsers = (user) => {
  const payload = {
    username: user.username,
  };
  return jwt.sign(payload, secretKeyUsers, { expiresIn: "1h" });
};

mongoose.connect(
  "mongodb+srv://tanvirxahm:2wr2dnu9Ytq98Xro@cluster0.cd4afbe.mongodb.net/courses",
  { useNewUrlParser: true, useUnifiedTopology: true, dbName: "courses" }
);

const authenticateJwtAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
 
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, secretKeyAdmin, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
const authenticateJwtUsers = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, secretKeyUsers, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Admin routes
app.post("/admin/signup", async (req, res) => {
  // logic to sign up admin
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });

  if (admin) {
    res.status(403).json({ message: "Admin already exists" });
  } else {
    const newAdmin = new Admin({ username, password });
    await newAdmin.save();
    const token = generateJwtAdmin({ username, role: "admin" });
    res.json({ message: "Admin created successfully", token });
  }
});

app.get("/admin/me", authenticateJwtAdmin,  (req, res) => {
  res.json({
    username : req.user.username
  })
})

app.post("/admin/login", async (req, res) => {
  // logic to log in admin
  const { username, password } = req.headers;
  const admin = await Admin.findOne({ username, password });

  if (admin) {
    const token = generateJwtAdmin({ username, role: "admin" });
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});

app.post("/admin/courses", authenticateJwtAdmin, async (req, res) => {
  // logic to create a course
  const course = new Course(req.body);
  await course.save();
  res.json({ message: "Course created successfully", courseId: course.id });
});

app.put("/admin/courses/:courseId", authenticateJwtAdmin, async (req, res) => {
  // logic to edit a course
  const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, {
    new: true,
  });

  if (course) {
    res.json({ message: "Course updated successfully" });
  } else {
    res.status(405).json({ message: "Course not found" });
  }
});

app.get("/admin/courses", authenticateJwtAdmin, async (req, res) => {
  // logic to get all courses
  const courses = await Course.find({});
  res.json({ courses });
});

// User routes
app.post("/users/signup", async (req, res) => {
  // logic to sign up user
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user) {
    res.status(403).json({ message: "User already exists" });
  } else {
    const newUser = new User({ username, password });
    await newUser.save();
    const token = generateJwtUsers({ username, role: "user" });
    res.json({ message: "User created successfully", token });
  }
});

app.post("/users/login", async (req, res) => {
  // logic to log in user
  const { username, password } = req.headers;

  const user = await User.findOne({ username, password });

  if (user) {
    const token = generateJwtUsers({ username, role: "user" });
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "User authentication failed" });
  }
});

app.get("/users/courses", authenticateJwtUsers, async (req, res) => {
  // logic to list all courses
  const courses = await Course.find({ published: true });
  res.json({ courses });
});

app.post("/users/courses/:courseId", authenticateJwtUsers, async (req, res) => {
  // logic to purchase a course
  const course = await Course.findById(req.params.courseId);

  if (course) {
    const user = await User.findOne({ username: req.user.username });
    if (user) {
      user.purchasedCourses.push(course);
      await user.save();
      res.json({ message: "Course purchased successfully" });
    } else {
      res.status(403).json({ message: "User not found" });
    }
  } else {
    res.status(404).json({ message: "Course not found or not available" });
  }
});

app.get("/users/purchasedCourses", authenticateJwtUsers, async (req, res) => {
  // logic to view purchased courses

  const user = await User.findOne({ username: req.user.username }).populate(
    "purchasedCourses"
  );

  if (user) {
    res.json({ purchasedCourses: user.purchasedCourses || [] });
  } else {
    res.status(403).json({ message: "User not found" });
  }
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
