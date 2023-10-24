import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Appbar from "./components/Appbar";
import Signup from "./components/Signup";
import Courses from "./components/Courses";
import Signin from "./components/Signin";
import UserCourses from "./components/UserCourses";
import AddCourse from "./components/AddCourse.jsx";
import Course from "./components/Course";
import {  useState } from "react";

function App() {
 
  return (
    <div
      style={{ width: "100vw", height: "100vh", backgroundColor: "#eeeeee" }} 
    > 
      <Appbar /> 
      <Routes> 
        <Route path={"/addcourse"} element={<AddCourse />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/courses" element={<Courses />} />
       
        <Route path="/course/:courseId" element={<Course />} />
        <Route path="/usercourses" element={<UserCourses />} />
        
  
       

       
        

      </Routes>
    </div>
  );
}

export default App;
