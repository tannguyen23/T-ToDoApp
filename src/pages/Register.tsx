import {
  AppBar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  IconButton,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import Grid from "@mui/material/Unstable_Grid2";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATH_AUTH, PATH_PAGE } from "../routes/path";
import Footer from "../components/Footer";
const MyContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background: #d2d0dd;
`;

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  return (
    <MyContainer>
      <Box
        boxShadow={10}
        sx={{ borderRadius: "8px", background: "#ffffff", alignSelf: "center" }}
      >
        <Container style={{ padding: 0 }}>
          <Grid container>
            <Grid sx={{ padding: 3 }} xs={6}>
              <Typography variant="h4" component={"div"} fontWeight={"bold"}>
                Become a member in To Do App
              </Typography>
              <Typography
                variant="body2"
                component={"div"}
                sx={{ marginY: "8px" }}
              >
                Please enter your detail
              </Typography>
              <FormControl sx={{ paddingY: "8px", marginY: "8px" }} fullWidth>
                <TextField
                  id="username"
                  variant="outlined"
                  label="User Name"
                  value={username}
                  onChange={(event) => {
                    setUsername(event.target.value);
                  }}
                ></TextField>
              </FormControl>
              <FormControl sx={{ paddingY: "8px", marginY: "8px" }} fullWidth>
                <TextField
                  id="fullname"
                  variant="outlined"
                  label="Full Name"
                  value={fullName}
                  onChange={(event) => {
                    setFullName(event.target.value);
                  }}
                ></TextField>
              </FormControl>
              <FormControl sx={{ paddingY: "8px", marginY: "8px" }} fullWidth>
                <TextField
                  id="email"
                  type="email"
                  variant="outlined"
                  label="Email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                ></TextField>
              </FormControl>
              <FormControl sx={{ paddingY: "8px", marginY: "8px" }} fullWidth>
                <TextField
                  id="address"
                  variant="outlined"
                  label="Address"
                  value={address}
                  onChange={(event) => {
                    setAddress(event.target.value);
                  }}
                ></TextField>
              </FormControl>

              <FormControl sx={{ paddingY: "8px", marginY: "8px" }} fullWidth>
                <TextField
                  id="password"
                  variant="outlined"
                  type={"password"}
                  label="Password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                ></TextField>
              </FormControl>
              <FormControl sx={{ paddingY: "8px", marginY: "8px" }} fullWidth>
                <TextField
                  id="rePassword"
                  variant="outlined"
                  type={"rePassword"}
                  label="Confirm Password"
                  value={rePassword}
                  onChange={(event) => {
                    setRePassword(event.target.value);
                  }}
                ></TextField>
              </FormControl>
              <Button
                variant="contained"
                onClick={(event) => {
                  event.preventDefault();
                  navigate(PATH_AUTH.login);
                }}
                fullWidth
                sx={{ my: 1 }}
              >
                Sign up
              </Button>

              <Button
                variant="outlined"
                onClick={() => {}}
                fullWidth
                sx={{ my: 1 }}
                endIcon={<GoogleIcon />}
              >
                Sign up with google
              </Button>
              <Grid textAlign={"left"}>
                <Typography variant="body2" component="span" sx={{ pr: 1 }}>
                  Already have account,
                </Typography>
                <Link
                  href="#"
                  variant="body2"
                  color={"primary"}
                  onClick={(event) => {
                    event.preventDefault();
                    navigate(PATH_AUTH.login);
                  }}
                >
                  Sign in
                </Link>
              </Grid>
            </Grid>
            <Grid xs={6}>
              <Box
                sx={{
                  height: "auto",
                  width: "100%",
                  borderTopEndRadius: "8px",
                  borderEndEndRadius: "8px",
                }}
                style={{ margin: 0, padding: 0 }}
                component="img"
                alt="to do img"
                src={process.env.PUBLIC_URL + "/img/to-do-list.png"}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </MyContainer>
  );
}
