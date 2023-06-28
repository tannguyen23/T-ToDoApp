import styled from 'styled-components';

import NavBar from '../components/NavBar';
import Teams from '../components/Team/Teams';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  color: #ffffff;
  background: #d2d0dd;
  overflow: hidden;
`;

export default function Team() {
  return (
    <Container>
      <NavBar></NavBar>
      <Teams></Teams>
    </Container>
  );
}
