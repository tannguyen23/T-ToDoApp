import { Button } from "@mui/material";
import styled from "styled-components";
import { useAppDispatch } from "../../redux/store";
import { useState } from "react";
import { Team } from "../../types/Team";
import { addTeam, deleteTeam } from "../../redux/features/TeamSlice";
import { sendNotification } from "../../redux/features/NotificationSlice";
import AddTeamDialog from "./AddTeamDialog";
import ListTeam from "./ListTeam";
import ViewTeamDialog from "./ViewTeamDialog";
import Grid from "@mui/material/Unstable_Grid2";
import JoinTeamDialog from "./JoinTeamDialog";

const Container = styled.div`
  padding: 6px;
  text-align: right;
  height: 92vh;
  overflow-y: auto;
  overflow-x: hidden;
`;
export default function Teams() {
  const dispatch = useAppDispatch();

  const [openAddTeamDialog, setOpenAddTeamDialog] = useState(false);
  const [openJoinTeamDialog, setOpenJoinTeamDialog] = useState(false);
  const [openViewTeamDialog, setOpenViewTeamDialog] = useState(false);
  const [idTeamView, setIdTeamView] = useState<number | undefined>();

  const handleClickOpenAddTeamDialog = () => {
    setOpenAddTeamDialog(true);
  };

  const handleCloseAddTeamDialog = () => {
    setOpenAddTeamDialog(false);
  };

  const handleClickOpenJoinTeamDialog = () => {
    setOpenJoinTeamDialog(true);
  };

  const handleCloseJointeamDialog = () => {
    setOpenJoinTeamDialog(false);
  };

  const handleClickOpenViewTeamDialog = () => {
    setOpenViewTeamDialog(true);
  };

  const handleCloseViewTeamDialog = () => {
    setOpenViewTeamDialog(false);
  };

  const handleAddTeam = (team: Team) => {
    dispatch(addTeam({ addTeam: team }));
    dispatch(sendNotification({ message: "Add team successfully " }));
    handleCloseAddTeamDialog();
  };

  const handleRemoveTeam = (deleteTeamId: number) => {
    dispatch(deleteTeam({ deleteTeamId }));
    dispatch(sendNotification({ message: "Delete team successfully " }));
    handleCloseViewTeamDialog();
  }

  return (
    <Container>
      <Grid container justifyContent={"flex-end"} gap={2}>
        <Button
          variant="contained"
          onClick={handleClickOpenJoinTeamDialog}
          color="info"
          size="small"
        >
          Join a team
        </Button>
        <Button
          variant="contained"
          onClick={handleClickOpenAddTeamDialog}
          color="info"
          size="small"
        >
          Create a new Team
        </Button>
      </Grid>

      <ListTeam
        handleOpenAddDialog={() => {
          handleClickOpenAddTeamDialog();
        }}
        handleOpenViewDialog={(id: number | undefined) => {
          setIdTeamView(id);
          handleClickOpenViewTeamDialog();
        }}
      />
      {openAddTeamDialog ? (
        <AddTeamDialog
          addTeam={handleAddTeam}
          open={openAddTeamDialog}
          onClose={() => handleCloseAddTeamDialog()}
        />
      ) : (
        <></>
      )}
      {openJoinTeamDialog ? (
        <JoinTeamDialog
          open={openJoinTeamDialog}
          onClose={() => handleCloseJointeamDialog()}
        />
      ) : (
        <></>
      )}
      {openViewTeamDialog ? (
        <ViewTeamDialog
          id={idTeamView}
          open={openViewTeamDialog}
          onClose={() => {
            handleCloseViewTeamDialog();
          }}
          onDelete={(id) => {handleRemoveTeam(id)}}
        />
      ) : (
        <></>
      )}
    </Container>
  );
}
