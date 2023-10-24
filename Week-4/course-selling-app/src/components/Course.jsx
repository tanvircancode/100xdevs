import {
  Box,
  Button,
  Card,
  Typography,
  CircularProgress,
  TextField,
  Grid,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Course() {
  const { courseId } = useParams();

  const [course, setCourse] = useState(null);

  const [hasPurchased, setHasPurchased] = useState(false);

  const role = localStorage.getItem("role");
  console.log(role);

  const getCourse = () => {
    fetch("http://localhost:3000/users/haspurchased/" + courseId, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((res) => {
      console.log(res);
      if (res.status == 200) {
        setHasPurchased(true);
      }
    });
  };

  useEffect(() => {
    function callback1(res) {
      res.json().then(callback2);
    }

    function callback2(data) {
      setCourse(data.course);
      console.log(data);
    }

    fetch(`http://localhost:3000/${role}/course/` + courseId, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then(callback1);

    if (role == "users") {
      getCourse();
    }
  }, []);

  if (!course) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress color="success" />
      </div>
    );
  }

  return (
    <div>
      <GrayTopper title={course.title} />

      <Grid container>
        {role == "admin" ? (
          <Grid item lg={8} md={12} sm={12}>
            <UpdateCard
              course={course}
              setCourse={setCourse}
              hasPurchased={hasPurchased}
              setHasPurchased={setHasPurchased}
              role={role}
            />
          </Grid>
        ) : (
          <Grid item lg={8} md={12} sm={12}>
            <PurchaseCard
              course={course}
              setCourse={setCourse}
              hasPurchased={hasPurchased}
              setHasPurchased={setHasPurchased}
              role={role}
            />
          </Grid>
        )}
        <Grid item lg={4} md={12} sm={12}>
          <CourseCard course={course} />
        </Grid>
      </Grid>
    </div>
  );
}

function GrayTopper({ title }) {
  return (
    <div
      style={{
        background: "#212121",
        height: 250,
        width: "100vw",
        top: 0,
        zIndex: 0,
        marginBottom: -250,
      }}
    >
      <div
        style={{
          height: 250,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" style={{ fontWeight: 600, color: "white" }}>
          {title}
        </Typography>
      </div>
    </div>
  );
}

function CourseCard({ course }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <Card
        style={{
          width: 300,
          paddingBottom: 20,
          height: 250,
          borderRadius: 20,
          marginTop: 100,
          zIndex: 2,
        }}
      >
        <img src={course.imageLink} style={{ width: 300, height: 170 }} />
        <div style={{ marginLeft: 15 }}>
          <Typography style={{ fontWeight: 600 }} variant="h6">
            {course.title}
          </Typography>
          <Typography variant="subtitle2">Price</Typography>
          <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
            Tk {course.price}
          </Typography>
        </div>
      </Card>
    </div>
  );
}

function UpdateCard({
  course,
  setCourse,
  hasPurchased,
  setHasPurchased,
  role,
}) {
  return (
    <DisplayField
     
      role={role}
      course={course}
      setCourse={setCourse}
      hasPurchased={hasPurchased}
      setHasPurchased={setHasPurchased}
    />
  );
}

function PurchaseCard({
  course,
  setCourse,
  hasPurchased,
  setHasPurchased,
  role,
}) {
  const [title, setTitle] = useState(course.title);
  const [description, setDescription] = useState(course.description);
  const [image, setImage] = useState(course.imageLink);
  const [price, setPrice] = useState(course.price);

  return (
    <DisplayField
      role={role}
      course={course}
      setCourse={setCourse}
      hasPurchased={hasPurchased}
      setHasPurchased={setHasPurchased}
    />
  );
}

function DisplayField({
  course,
  setCourse,
  hasPurchased,
  setHasPurchased,
  role,
}) {
  const [title, setTitle] = useState(course.title);
  const [description, setDescription] = useState(course.description);
  const [image, setImage] = useState(course.imageLink);
  const [price, setPrice] = useState(course.price);
  const isEditable = role == "admin";

  const handlePurchaseCourse = () => {
    fetch("http://localhost:3000/users/courses/" + course._id, {
      method: "POST",

      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    setHasPurchased(false);
  };

  const handleUpdateCourse = () => {
    fetch("http://localhost:3000/admin/courses/" + course._id, {
      method: "PUT",
      body: JSON.stringify({
        title: title,
        description: description,
        imageLink: image,
        published: true,
        price,
      }),
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    let updatedCourse = {
      _id: course._id,
      title,
      description,
      imageLink: image,
      price,
    };
    setCourse(updatedCourse);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card
        variant="outlined"
        style={{
          width: 400,
          padding: 20,
          marginTop: 200,
        }}
      >
        <Typography variant="h5">Update Course </Typography>
        <br />
        <br />
        <TextField
          value={title}
          fullWidth={true}
          label="Title"
          InputProps={{
            readOnly: isEditable ? false : true,
            style: {
              color: isEditable ? "black" : "gray",
            },
          }}
          variant="outlined"
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <br />
        <TextField
          value={description}
          fullWidth={true}
          label="Description"
          InputProps={{
            readOnly: isEditable ? false : true,
            style: {
              color: isEditable ? "black" : "gray",
            },
          }}
          variant="outlined"
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <br />
        <TextField
          value={image}
          fullWidth={true}
          label="Image Link"
          InputProps={{
            readOnly: isEditable ? false : true,
            style: {
              color: isEditable ? "black" : "gray",
            },
          }}
          variant="outlined"
          onChange={(e) => setImage(e.target.value)}
        />
        <br />
        <br />
        <TextField
          value={price}
          fullWidth={true}
          label="Price"
          InputProps={{
            readOnly: isEditable ? false : true,
            style: {
              color: isEditable ? "black" : "gray",
            },
          }}
          variant="outlined"
          onChange={(e) => setPrice(e.target.value)}
        />
        <br />
        <br />
        <Box textAlign="center">
          <Button
            size="large"
            variant="contained"
            disabled={role=='users' && !hasPurchased}
            style={{ width: "100%" }}
            onClick={
              role == "admin" ? handleUpdateCourse : handlePurchaseCourse
            }
          >
            {role == "admin"
              ? "Update Course"
              : hasPurchased
              ? "purchase Course"
              : "Course Already Purchased!"
              }
          </Button>
        </Box>
        {role != "admin" ?? (
          <>
            {hasPurchased ? (
              <Box textAlign="center">
                <Button
                  size="large"
                  variant="contained"
                  style={{ width: "100%" }}
                  onClick={handlePurchaseCourse}
                >
                  Purchase Course
                </Button>
              </Box>
            ) : (
              <Button
                disabled
                size="large"
                variant="contained"
                style={{ width: "100%", color: "#000000", fontWeight: 600 }}
              >
                Course Already Purchased!
              </Button>
            )}
          </>
        )}
      </Card>
    </div>
  );
}

export default Course;
