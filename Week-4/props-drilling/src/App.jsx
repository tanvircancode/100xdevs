import { createContext, useContext, useState } from "react";
import { Button, Card, Typography } from "@mui/material";
import { RecoilRoot, atom, useRecoilValue , useSetRecoilState} from "recoil";



function App() {


  return (
    
    <RecoilRoot>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
        }}
      >
        <Card style={{ padding: 20, width: 400 }}>
          <Typography variant="h5" textAlign="center">
            Welcome to the counter
          </Typography>
          <br />
          <Buttons />
          <CountComponent />
        </Card>
      </div>
      </RecoilRoot>
    
  );
}

function Buttons() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Increase />
      <Decrease />
    </div>
  );
}

function Increase() {
  const  setCount  = useSetRecoilState(countState);
  return (
    <div>
      <Button variant="contained" onClick={() => setCount(existingCount => existingCount + 1)}>
        Increase
      </Button>
    </div>
  );
}
function Decrease() {
  const  setCount  = useSetRecoilState(countState);
  return (
    <div>
      <Button variant="contained" onClick={() => setCount(existingCount => existingCount - 1)}>
        Increase
      </Button>
    </div>
  );
}

function CountComponent() {
  const count  = useRecoilValue(countState);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Typography variant="h4"> {count}</Typography>
    </div>
  );
}

export default App;

const countState = atom({
  key: 'countState',
  default: 0
})