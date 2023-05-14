import styled from "styled-components";

import NavBar from "../components/NavBar";
import Tasks from "../components/Task/Tasks";
import { Grid } from "@mui/material";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  color: #ffffff;
  background: #d2d0dd;
  overflow: hidden;
`;

export default function Task() {
  return (
    <Container>
      <Grid container flexDirection={"column"} sx={{ height: "100%" }}>
        <Grid height={"64px"}>
          <NavBar></NavBar>
        </Grid>
        <Grid
          sx={{
            height: "calc(100% - 64px)",
            minHeight: "calc(100% - 64px)",
            width: "100%",
            minWidth: "100%",
          }}
        >
          <Tasks></Tasks>
        </Grid>
      </Grid>
    </Container>
  );
}
