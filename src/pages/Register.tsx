import { yupResolver } from '@hookform/resolvers/yup';
import GoogleIcon from '@mui/icons-material/Google';
import { Box, Button, Container, FormControl, Link, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as yup from 'yup';

import Footer from '../components/Footer';
import { finishAction, startAction } from '../redux/features/ActionSlice';
import { registerAsync } from '../redux/features/AuthSlice';
import { sendNotification } from '../redux/features/NotificationSlice';
import { useAppDispatch } from '../redux/store';
import { PATH_AUTH } from '../routes/path';

const MyContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background: #d2d0dd;
`;

const schema = yup.object({
  username: yup
    .string()
    .required("Should not be empty")
    .min(6, "At least 6 characters "),
  password: yup.string().required("Should not be empty"),
  rePassword: yup
    .string()
    .required("Should not be empty")
    .test(
      "compare_password",
      "Password and confirm password must be the same",
      (value, context) => {
        if (context.parent.password === value) {
          return true;
        } else {
          return false;
        }
      }
    ),
  fullname: yup.string().required("Should not be empty"),
  email: yup
    .string()
    .required("Should not be empty")
    .email("Shoud follow email format"),
  address: yup.string().required("Should not be empty"),
});

const initValueForm = {
  username: "",
  password: "",
  rePassword: "",
  fullname: "",
  email: "",
  address: "",
};

export default function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initValueForm,
  });

  const onSubmit = handleSubmit((data) => {
    console.log(JSON.stringify(data));
    handleRegister();
  });

  const handleRegister = () => {
    const username = getValues("username").trim();
    const fullname = getValues("fullname").trim();
    const email = getValues("email").trim();
    const address = getValues("address").trim();
    const password = getValues("password");
    const avaUrl = "";
    dispatch(startAction());
    dispatch(
      registerAsync({
        username,
        password,
        fullname,
        email,
        address,
        avaUrl,
      })
    ).unwrap().then(() => {
      dispatch(finishAction());
      dispatch(sendNotification({ message: "Register account Successfully" }));
      navigate(PATH_AUTH.login);
    }).catch((error : AxiosError) => {
      dispatch(finishAction());
      // handle error
      if(error.response?.status === 422 ) {
        if (error.response.data === 'Username is exist') {
          setError('username',{message : 'User already exists'});
        } 
        if (error.response.data === 'Email is exist') {
          setError('email',{message : 'Email already exists'});
        }
      }
      dispatch(sendNotification({ message: "Register account failed" }));
    });
  };

  return (
    <MyContainer>
      <Box
        boxShadow={10}
        sx={{ borderRadius: "8px", background: "#ffffff", alignSelf: "center" }}
      >
        <Container style={{ padding: 0 }}>
          <Grid container>
            <Grid sx={{ padding: 3 }} xs={6}>
              <form
                onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                  event.preventDefault();
                  onSubmit();
                }}
              >
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
                    {...register("username")}
                    error={errors.username?.message !== undefined}
                    helperText={errors.username?.message}
                    id="username"
                    variant="outlined"
                    label="User Name"
                  ></TextField>
                </FormControl>
                <FormControl sx={{ paddingY: "8px", marginY: "8px" }} fullWidth>
                  <TextField
                    {...register("fullname")}
                    error={errors.fullname?.message !== undefined}
                    helperText={errors.fullname?.message}
                    id="fullname"
                    variant="outlined"
                    label="Full Name"
                  ></TextField>
                </FormControl>
                <FormControl sx={{ paddingY: "8px", marginY: "8px" }} fullWidth>
                  <TextField
                    {...register("email")}
                    error={errors.email?.message !== undefined}
                    helperText={errors.email?.message}
                    id="email"
                    type="email"
                    variant="outlined"
                    label="Email"
                  ></TextField>
                </FormControl>
                <FormControl sx={{ paddingY: "8px", marginY: "8px" }} fullWidth>
                  <TextField
                    {...register("address")}
                    error={errors.address?.message !== undefined}
                    helperText={errors.address?.message}
                    id="address"
                    variant="outlined"
                    label="Address"
                  ></TextField>
                </FormControl>

                <FormControl sx={{ paddingY: "8px", marginY: "8px" }} fullWidth>
                  <TextField
                    {...register("password")}
                    error={errors.password?.message !== undefined}
                    helperText={errors.password?.message}
                    id="password"
                    variant="outlined"
                    type={"password"}
                    label="Password"
                  ></TextField>
                </FormControl>
                <FormControl sx={{ paddingY: "8px", marginY: "8px" }} fullWidth>
                  <TextField
                    {...register("rePassword")}
                    error={errors.rePassword?.message !== undefined}
                    helperText={errors.rePassword?.message}
                    id="rePassword"
                    variant="outlined"
                    type={"password"}
                    label="Confirm Password"
                  ></TextField>
                </FormControl>
                <Button
                  variant="contained"
                  type="submit"
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
              </form>
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
