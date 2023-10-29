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
import { BASE_URL } from "../config";
import { courseState } from "../store/atoms/course";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  isCourseLoading,
  courseTitle,
  courseImage,
  coursePrice,
} from "../store/selectors/course";

function Course() {
  const { courseId } = useParams();
  const setCourse = useSetRecoilState(courseState);
  const courseLoading = useRecoilValue(isCourseLoading);

  const [hasPurchased, setHasPurchased] = useState(false);

  const role = localStorage.getItem("role");
  console.log(role);

  const getCourse = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/users/haspurchased/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ` + localStorage.get("token"),
          },
        }
      );
      if (response.data.status == 200) {
        setHasPurchased(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/${role}/course/${courseId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setCourse({ isLoading: false, course: res.data.course });
      })
      .catch((e) => {
        setCourse({ isLoading: false, course: null });
      });

    if (role == "users") {
      getCourse();
    }
  }, []);

  if (courseLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress color="success" />
      </div>
    );
  }

  return (
    <div>
      <GrayTopper />

      <Grid container>
        <Grid item lg={8} md={12} sm={12}>
          <PurchaseCard
            course={course}
            setCourse={setCourse}
            hasPurchased={hasPurchased}
            setHasPurchased={setHasPurchased}
            role={role}
          />
        </Grid>

        <Grid item lg={4} md={12} sm={12}>
          <CourseCard />
        </Grid>
      </Grid>
    </div>
  );
}

function GrayTopper() {
  const title = useRecoilValue(courseTitle);

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

function CourseCard() {
  const title = useRecoilValue(courseTitle);
  const imageLink = useRecoilValue(courseImage);
  const price = useRecoilValue(coursePrice);

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
        <img src={imageLink} style={{ width: 300, height: 170 }} />
        <div style={{ marginLeft: 15 }}>
          <Typography style={{ fontWeight: 600 }} variant="h6">
            {title}
          </Typography>
          <Typography variant="subtitle2">Price</Typography>
          <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
            Tk {price}
          </Typography>
        </div>
      </Card>
    </div>
  );
}

function PurchaseCard({ hasPurchased, setHasPurchased, role }) {
    const [courseDetails, setCourse] = useRecoilState(courseState);

    const [title, setTitle] = useState(courseDetails.course.title);
    const [description, setDescription] = useState(courseDetails.course.description);
    const [price, setPrice] = useState(courseDetails.course.price);
    const [image, setImage] = useState(courseDetails.course.imageLink);
  
  
    const handlePurchaseCourse = () => {
      fetch("http://localhost:3000/users/courses/" + course._id, {
        method: "POST",
  
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setHasPurchased(false);
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
              readOnly: false 
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
              readOnly:  false 
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
              readOnly:  false 
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
              readOnly: false 
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
              disabled={role == "users" && !hasPurchased}
              style={{ width: "100%" }}
              onClick={handlePurchaseCourse}
            >
              {hasPurchased ? "purchase Course" : "Course Already Purchased!"}
            </Button>
          </Box>
          
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
           
          
        </Card>
      </div>
    );
}

export default Course;
