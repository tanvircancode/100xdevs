import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Appbar from "./components/Appbar";
import Signup from "./components/Signup";
import Courses from "./components/Courses";
import Signin from "./components/Signin";
import UserCourses from "./components/UserCourses";
import AddCourse from "./components/AddCourse.jsx";
import Course from "./components/Course";
import { useEffect, useState } from "react";
import { BASE_URL } from "./config.js";
import axios from "axios";


function App() {
  const [userEmail, setUserEmail] = useState(null);
  const role = localStorage.getItem("role");

  const init = async () => {
    const response = await axios.get(`${BASE_URL}/${role}/me`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    if (response.data.username) {
      setUserEmail(response.data.username);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div
      style={{ width: "100vw", height: "100vh", backgroundColor: "#eeeeee" }}
    >
      
        <Appbar userEmail={userEmail} setUserEmail={setUserEmail} />
        <Routes>
          <Route path={"/addcourse"} element={<AddCourse />} />
          <Route
            path="/signin"
            element={<Signin setUserEmail={setUserEmail} />}
          />
          <Route
            path="/signup"
            element={<Signup setUserEmail={setUserEmail} />}
          />
          <Route path="/courses" element={<Courses />} />

          <Route path="/course/:courseId" element={<Course />} />
          <Route path="/usercourses" element={<UserCourses />} />
        </Routes>
      
    </div>
  );
}

export default App;
