import { Button, Typography, AppBar, Box, Toolbar } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isUserLoading } from "../store/selectors/isUserLoading";
import { userEmailState } from "../store/selectors/userEmail";
import { userState } from "../store/atoms/user";

function Appbar() {
  const navigate = useNavigate();
  const userLoading = useRecoilValue(isUserLoading);
  const userEmail = useRecoilValue(userEmailState);
  const setUser = useSetRecoilState(userState);

  const role = localStorage.getItem("role");

  if(userLoading) {
    return <div>Loading...</div>
  }
  
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
                      navigate("/purchasecourse");
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
                    setUser({
                      isLoading: false,
                      userEmail: null,
                    });

                    navigate("/signin");
                  }}
                >
                  Logout
                </Button>
              </div>
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
