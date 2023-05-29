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
import { PATH_AUTH, PATH_USER } from "../routes/path";
import Footer from "../components/Footer";
import { useAuth } from "../contexts/AuthContext";
import { sendNotification } from "../redux/features/NotificationSlice";
import { useAppDispatch } from "../redux/store";
import { loginAsync } from "../redux/features/AuthSlice";
import { AxiosError, AxiosResponse } from "axios";
import { finishAction, startAction } from "../redux/features/ActionSlice";
import { AuthUser } from "../types/Authentication";

const MyContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background: #d2d0dd;
`;

export default function Login() {
  const { setAuthUser, setIsLoggedIn } = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleLoginDemo = () => {
    if (username === "demo" && password === "demo@todo") {
      setAuthUser({
        id: "0",
        username: "Demo",
        address: "addressTMP",
        avaUrl: "https://",
        email: "mail@test.com",
        fullname: "De mo",
      });
      setIsLoggedIn(true);
      dispatch(sendNotification({ message: "Login Successfully" }));
      navigate(PATH_USER.task);
    } else {
      dispatch(sendNotification({ message: "Login Failed" }));
    }
  };

  const handleLogin = () => {
    dispatch(startAction());
    dispatch(loginAsync({ username, password }))
      .unwrap()
      .then((response : AuthUser) => {
        const userInfo = response;
        setAuthUser({
          id: userInfo._id,
          username: userInfo.username,
          address: userInfo.address,
          avaUrl: userInfo.avaUrl,
          email: userInfo.email,
          fullname: userInfo.fullname,
        });
        setIsLoggedIn(true);
        navigate(PATH_USER.task);
        dispatch(sendNotification({ message: "Login Successfully" }));
      })
      .catch((error: AxiosError) => {
        if (error.response?.status === 401) {
          dispatch(sendNotification({ message: "Login failed" }));
        } else {
          dispatch(sendNotification({ message: "Something went wrong" }));
        }
      })
      .finally(() => {
        dispatch(finishAction());
      });
  };

  return (
    <MyContainer>
      <Box
        boxShadow={10}
        sx={{
          margin: 2,
          padding: 5,
          borderRadius: "3px",
          background: "#ffffff",
          alignSelf: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="body2"
          component={"div"}
          sx={{ marginY: "8px" }}
          fontWeight={"bold"}
          color={"primary"}
        >
          Demo Account
        </Typography>
        <Typography
          variant="subtitle2"
          component={"div"}
          sx={{ marginY: "8px" }}
        >
          Username : demo
        </Typography>
        <Typography
          variant="subtitle2"
          component={"div"}
          sx={{ marginY: "8px" }}
        >
          Password : demo@todo
        </Typography>
      </Box>
      <Box
        boxShadow={10}
        sx={{ borderRadius: "8px", background: "#ffffff", alignSelf: "center" }}
      >
        <Container style={{ padding: 0 }}>
          <Grid container>
            <Grid sx={{ padding: 3 }}>
              <Typography variant="h4" component={"div"} fontWeight={"bold"}>
                Welcome back to To Do App
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
                  label="Username"
                  value={username}
                  onChange={(event) => {
                    setUsername(event.target.value);
                  }}
                ></TextField>
              </FormControl>
              <FormControl sx={{ paddingY: "8px", marginY: "8px" }} fullWidth>
                <TextField
                  id="password"
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleLogin();
                    }
                  }}
                ></TextField>
              </FormControl>
              <Grid
                container
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Grid>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={showPassword}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          setShowPassword(event.target.checked);
                        }}
                      />
                    }
                    label="Show password"
                    labelPlacement="start"
                  />
                </Grid>
                <Grid>
                  <Link href="#" variant="body2" color={"primary"}>
                    Forget password ?
                  </Link>
                </Grid>
              </Grid>
              <Button
                variant="contained"
                onClick={() => {
                  handleLogin();
                }}
                fullWidth
                sx={{ my: 1 }}
              >
                Sign in
              </Button>

              <Button
                variant="outlined"
                onClick={() => {}}
                fullWidth
                sx={{ my: 1 }}
                endIcon={<GoogleIcon />}
              >
                Sign in with google
              </Button>
              <Grid textAlign={"center"}>
                <Typography variant="body2" component="span" sx={{ pr: 1 }}>
                  Don't have account
                </Typography>
                <Link
                  href="#"
                  variant="body2"
                  color={"primary"}
                  onClick={(event) => {
                    event.preventDefault();
                    navigate(PATH_AUTH.register);
                  }}
                >
                  Sign up
                </Link>
              </Grid>
            </Grid>
            <Grid display={{ xs: "none", md: "flex" }}>
              <Box
                sx={{
                  // height: 570,
                  width: 390,
                  borderEndEndRadius: "8px",
                  borderTopEndRadius: "8px",
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
