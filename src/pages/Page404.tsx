import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { PATH_AUTH } from '../routes/path';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  gap: 10px;
`;
export default function Page404() {
  const navigate = useNavigate();
  return (
    <Container>
      <Box
        style={{ margin: 0, padding: 0, width: "30%" }}
        component="img"
        alt="to do img"
        src={process.env.PUBLIC_URL + "/img/404.png"}
      ></Box>
      <Typography
        variant="h4"
        color={"rgb(0,0,0,.4)"}
        sx={{ fontStyle: "italic" }}
      >
        Something went wrong !
      </Typography>
      <Button
        variant="contained"
        onClick={() => {
          navigate(PATH_AUTH.login);
        }}
      >
        Back to home page
      </Button>
    </Container>
  );
}
