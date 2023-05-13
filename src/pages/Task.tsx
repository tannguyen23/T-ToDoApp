import styled from "styled-components";

import NavBar from "../components/NavBar";
import Tasks from "../components/Task/Tasks";

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
      <NavBar></NavBar>
      <Tasks></Tasks>
    </Container>
  );
}
