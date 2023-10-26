import { Button, Typography, AppBar, Box, Toolbar } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

function Appbar({userEmail, setUserEmail}) {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  // useEffect(() => {
  //   console.log(role);
   
  //     // function callback1(res) {
  //     //   res.json().then(callback2);
  //     // }

  //     // function callback2(data) {
  //     //   setLoggedIn(true);

  //     //   setUserEmail(data.username);
  //     // }

     
    
  // }, [userEmail, loggedIn]);

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            100xdevs
          </Typography>
          {userEmail ? (
            <>
              {role == "admin" ? (
                <div style={{ marginRight: 15 }}>
                  <Button
                    color="inherit"
                    style={{ fontWeight: 600 }}
                    onClick={() => {
                      navigate("/addcourse");
                    }}
                  >
                    Add Course
                  </Button>
                </div>
              ) : (
                <div style={{ marginRight: 15 }}>
                  <Button
                    color="inherit"
                    style={{ fontWeight: 600 }}
                    onClick={() => {
                      navigate("/usercourses");
                    }}
                  >
                    Purchased Course
                  </Button>
                </div>
              )}

              <div style={{ marginRight: 15 }}>
                <Button
                  color="inherit"
                  style={{ fontWeight: 600 }}
                  onClick={() => {
                    navigate("/courses");
                  }}
                >
                  Courses
                </Button>
              </div>
              <div>
                <Button
                  variant="contained"
                  onClick={() => {
                    localStorage.setItem("token", null);
                    localStorage.setItem("role", null);
                    setUserEmail(null)
                    // navigate("/signin");
                  }}
                >
                  Logout
                </Button>
              </div>l;lp
            </>
          ) : (
            <>
              <div style={{ marginRight: 10 }}>
                <Button
                  color="inherit"
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  Sign up
                </Button>
              </div>
              <div>
                <Button
                  color="inherit"
                  onClick={() => {
                    navigate("/signin");
                  }}
                >
                  Sign in
                </Button>
              </div>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default Appbar;
