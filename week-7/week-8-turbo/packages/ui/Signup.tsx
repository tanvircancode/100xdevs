import { Card, TextField, Button } from "@mui/material"

export const Signup = () => {
    return <div style={{ width : "100vw", display: "flex", justifyContent: "center" }}>
        <Card style={{
            width: 400, padding: 20, height: 250, border: "1px solid black"
        }}>
            <TextField fullWidth={true} label="Username" variant="outlined" />
            <br />
            <br />
            <TextField fullWidth={true} label="Password" variant="outlined" type="password" />
            <br />
            <br />
            <Button variant="contained">Sign Up</Button>

        </Card>
    </div>
}