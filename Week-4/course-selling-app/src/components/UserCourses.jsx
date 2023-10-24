import {
  Box,
  Button,
  Card,
  Typography,
  CircularProgress,
  TextField,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";

function UserCourses() {
  const [courses, setCourses] = useState([]);

  function callback1(res) {
    res.json().then(callback2);
  }

  function callback2(data) {
    setCourses(data.purchasedCourses);
    console.log(data.purchasedCourses);
  }

  useEffect(() => {
    fetch("http://localhost:3000/users/purchasedCourses/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(callback1);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        marginTop: 15,
      }}
    >
      {courses.length == 0 ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 100
            }}
          >
            <Typography variant="h6"> No Courses purchased!!</Typography>
          </div>
        </>
      ) : (
        <>
          {courses.map((course) => {
            return <DisplayCourses course={course} />;
          })}
        </>
      )}
    </div>
  );
}

function DisplayCourses({ course }) {
  return (
    <Card
      style={{
        padding: 40,
        borderRadius: 10,
        width: 300,
        minHeight: 200,
        margin: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          alignItems: "center",
          marginBottom: 15,
        }}
      >
        <Typography variant="h4">{course.title}</Typography>
        <Typography variant="h6" style={{ textAlign: "center" }}>
          {course.description}
        </Typography>
        <Typography variant="h6">BDT {course.price}</Typography>
      </div>
      <img
        src={course.imageLink}
        style={{ width: 300, height: 250, objectFit: "cover" }}
      />
    </Card>
  );
}

export default UserCourses;
