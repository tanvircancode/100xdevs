// working properly
//my code starts from here

const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

let ADMINS = [];
let USERS = [];
let COURSES = [];
let purchasedCourses = [];

const secretKeyAdmin = "rbje4PkCZb2Fzqsj9OFJtjBw5TM";
const secretKeyUsers = "tA0vNplLmEwPhwpPo32upeCl";


const generateJwtAdmin = (user) => {
  const payload = {
    username: user.username,
  };
  return jwt.sign(payload, secretKeyAdmin, { expiresIn: "1h" });
};

const generateJwtUsers = (user) => {
  const payload = {
    username: user.username,
  };
  return jwt.sign(payload, secretKeyUsers, { expiresIn: "1h" });
};

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
app.post("/admin/signup", (req, res) => {
  // logic to sign up admin
  const admin = req.body;
  const existingAdmin = ADMINS.find((obj) => obj.username == admin.username);
  if (existingAdmin) {
    res.status(403).json({ message: "Admin already exists" });
  } else {
    ADMINS.push(admin);
    const token = generateJwtAdmin(admin);
    res.json({ message: "Admin created successfully", token });
  }
});   

app.get("/admin/me", authenticateJwtAdmin, (req, res) => {
  res.json({
    username : req.user.username
  })
})

app.post("/admin/login", (req, res) => {
  // logic to log in admin
  const { username, password } = req.headers;

  const isAdmin = ADMINS.find(
    (obj) => obj.username === username && obj.password === password
  );

  if (isAdmin) {
    const token = generateJwtAdmin(isAdmin);
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Admin authentication failed" });
  }
});

app.post("/admin/courses", authenticateJwtAdmin, (req, res) => {
  // logic to create a course
  const course = req.body;
  course.id = (COURSES.length) + 1;

  COURSES.push(course);
  res.json({ message: "Course created successfully", courseId: course.id });
});

app.put("/admin/courses/:courseId", authenticateJwtAdmin, (req, res) => {
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

app.get("/admin/courses", authenticateJwtAdmin, (req, res) => {
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
    const token = generateJwtUsers(user);
    res.json({ message: "User created successfully", token });
  }
});

app.post("/users/login", (req, res) => {
  // logic to log in user
  const { username, password } = req.headers;

  const user = USERS.find(
    (obj) => obj.username === username && obj.password === password
  );

  if (user) {
    const token = generateJwtUsers(user);
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "User authentication failed" });
  }
});

app.get("/users/courses", authenticateJwtUsers, (req, res) => {
  // logic to list all courses
  res.json({ courses: COURSES });
});

app.post("/users/courses/:courseId", authenticateJwtUsers, (req, res) => {
  // logic to purchase a course
  const courseId = parseInt(req.params.courseId);

  const course = COURSES.find((c) => c.id === courseId && c.published);
  if (course) {
    const user = USERS.find((obj) => obj.username === req.user.username);
    if (user) {
      user.purchasedCourses.push(course);
      res.json({ message: "Course purchased successfully" });
    } else {
      res.status(403).json({ message: "User not found" });
    }
  } else {
    res.status(404).json({ message: "Course not found or not available" });
  }
});

app.get("/users/purchasedCourses", authenticateJwtUsers, (req, res) => {
  // logic to view purchased courses

  const user = USERS.find((obj) => obj.username === req.user.username);
  if(user) {
    if (user.purchasedCourses) {
      res.json({ purchasedCourses: user.purchasedCourses });
    } else {
      res.status(404).json({ message: "No Courses Purchased" });
    }
  }else {
    res.status(403).json({ message: "User not found" });
  }
  
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
