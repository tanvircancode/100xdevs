const express = require("express");
const app = express();

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];
let purchasedCourses = [];

const adminAuthentication = (req, res, next) => {
  const { username, password } = req.headers;

  const isAdmin = ADMINS.find(
    (obj) => obj.username === username && obj.password === password
  );

  if (isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Admin authentication failed" });
  }
};

const userAuthentication = (req, res, next) => {
  const { username, password } = req.headers;

  const user = USERS.find(
    (obj) => obj.username === username && obj.password === password
  );

  if (user) {
    req.user = user;
    next();
  } else {
    res.status(403).json({ message: "User authentication failed" });
  }
};
// Admin routes
app.post("/admin/signup", (req, res) => {
  // logic to sign up admin
  const admin = req.body;
  const existingAdmin = ADMINS.find((obj) => obj.username == admin.username);
  if (existingAdmin) {
    res.status(403).json({ message: "Admin already exists" });
  } else {
    ADMINS.push(admin);
    res.json({ message: "Admin created successfully" });
  }
});

app.post("/admin/login", adminAuthentication, (req, res) => {
  // logic to log in admin
  res.json({ message: "Logged in successfully" });
});

app.post("/admin/courses", adminAuthentication, (req, res) => {
  // logic to create a course
  const course = req.body;
  course.id = Date.now();

  COURSES.push(course);
  res.json({ message: "Course created successfully", courseId: course.id });
});

app.put("/admin/courses/:courseId", adminAuthentication, (req, res) => {
  // logic to edit a course
  const course = req.body;
  const courseId = parseInt(req.params.courseId);

  const index = COURSES.find((item) => item.id === courseId);
  if (index) {
    Object.assign(index, course);
    res.json({ message: "Course updated successfully" });
  } else {
    res.status(405).json({ message: "Course not found" });
  }
});

app.get("/admin/courses", adminAuthentication, (req, res) => {
  // logic to get all courses
  res.json({ courses: COURSES });
});

// User routes
app.post("/users/signup", (req, res) => {
  // logic to sign up user
  const user = { ...req.body, purchasedCourses: [] };
  const existingUser = USERS.find((obj) => obj.username === user.username);
  if (existingUser) {
    res.status(403).json({ message: "User already exists" });
  } else {
    USERS.push(user);

    res.json({ message: "User created successfully" });
  }
});

app.post("/users/login", userAuthentication, (req, res) => {
  // logic to log in user
  res.json({ message: "Logged in successfully" });
});

app.get("/users/courses", userAuthentication, (req, res) => {
  // logic to list all courses
  res.json({ courses: COURSES });
});

app.post("/users/courses/:courseId", userAuthentication, (req, res) => {
  // logic to purchase a course
  const { user } = req.headers;
  const courseId = parseInt(req.params.courseId);

  const course = COURSES.find((c) => c.id === courseId && c.published);
  if (course) {
    req.user.purchasedCourses.push(courseId);
    res.json({ message: "Course purchased successfully" });
  } else {
    res.status(404).json({ message: "Course not found or not available" });
  }
});

app.get("/users/purchasedCourses", userAuthentication, (req, res) => {
  // logic to view purchased courses

  var purchasedCourseIds = [];
  var purchasedCourses = req.user.purchasedCourses;

  for (var i = 0; i < COURSES.length; i++) {
    var check = purchasedCourses.indexOf(COURSES[i].id);
    if(check !== -1) {
      purchasedCourseIds.push(COURSES[i]);
    }
  }

  res.json({purchasedCourses : purchasedCourseIds});
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
