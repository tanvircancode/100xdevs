import {
  TextField,
  Button,
  Box,
  Card,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("users");
  const [isChecked1, setIsChecked1] = useState(true);
  const [isChecked2, setIsChecked2] = useState(false);

  const handleCheckbox1 = () => {
    setIsChecked1(!isChecked1);
    isChecked2 ? setIsChecked2(false) : setIsChecked2(true);
    setRole("");
    setRole("users");
  };
  const handleCheckbox2 = () => {
    setIsChecked2(!isChecked2);
    isChecked1 ? setIsChecked1(false) : setIsChecked1(true);
    setRole("");
    setRole("admin");
  };

  const handleLogin = () => {
    console.log(role);
   
    function callback1(res) {
      console.log(res);
      res.json().then(callback2);
    }

    function callback2(data) {

      console.log(data);
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        navigate("/courses");
      } else {
        alert("Invalid username or password");
        navigate("/signin");
      }
    }

    
      
      fetch(`http://localhost:3000/${role}/login`, {
        method: "POST",
        headers: {
          username: username,
          password: password,
        },
      }).then(callback1);
    
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 15,
          paddingTop: 150,
        }}
      >
        <Typography variant="h6">Welcome back. Sign In below</Typography>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card
          variant="outlined"
          style={{
            width: 400,
            padding: 20,
            height: 230,
          }}
        >
          <TextField
            fullWidth={true}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <br />
          <TextField
            fullWidth={true}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <FormGroup>
            <div style={{ display: "flex" }}>
              <FormControlLabel
                control={
                  <Checkbox checked={isChecked1} onChange={handleCheckbox1} />
                }
                label="User"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={isChecked2} onChange={handleCheckbox2} />
                }
                label="Admin"
              />
            </div>
          </FormGroup>

          <br />
          <Box textAlign="center">
            <Button  size="large" variant="contained"  style={{width:"100%"}} onClick={handleLogin}>
              Login
            </Button>
          </Box>
        </Card>
      </div>
    </div>
  );
}

export default Signin;
