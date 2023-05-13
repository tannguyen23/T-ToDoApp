import styled from "styled-components";
import { useRef, useState } from "react";

import Button from "@mui/material/Button";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import CloseIcon from "@mui/icons-material/Close";

import { Task } from "../../types/Task";
import { useAppDispatch } from "../../redux/store";
import { addTask } from "../../redux/features/TaskSlice";
import { sendNotification } from "../../redux/features/NotificationSlice";

import ListTask from "./ListTask";
import AddTaskDialog from "./AddTaskDialog";
import ViewTaskDialog from "./ViewTaskDialog";
import {
  AppBar,
  Box,
  Card,
  Checkbox,
  Chip,
  Dialog,
  FormControlLabel,
  IconButton,
  Slide,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import NavBarTask from "./NavBarTask";
import ProgressLayout from "./ProgressLayout";

export default function Tasks() {
  const dispatch = useAppDispatch();

  const [openAddTaskDialog, setOpenAddTaskDialog] = useState(false);
  const [openViewTaskDialog, setOpenViewTaskDialog] = useState(false);
  const [openTodoTaskDialog, setOpenTodoTaskDialog] = useState(false);
  const [idTaskView, setIdTaskView] = useState<number | undefined>();

  const handleClickOpenAddTaskDialog = () => {
    setOpenAddTaskDialog(true);
  };

  const handleCloseAddTaskDialog = () => {
    setOpenAddTaskDialog(false);
  };

  const handleClickOpenViewTaskDialog = () => {
    setOpenViewTaskDialog(true);
  };

  const handleCloseViewTaskDialog = () => {
    setOpenViewTaskDialog(false);
  };

  const handleClickOpenTodoTaskDialog = () => {
    setOpenTodoTaskDialog(true);
  };

  const handleCloseTodoTaskDialog = () => {
    setOpenTodoTaskDialog(false);
  };

  const handleAddTask = (task: Task) => {
    dispatch(addTask({ addTask: task }));
    dispatch(sendNotification({ message: "Add task successfully " }));
    handleCloseAddTaskDialog();
  };

  return (
    <Grid container height={"inherit"}>
      <Grid
        xs={2}
        md={3}
        lg={2}
        sx={{
          display: { xs: "none", md: "flex", lg: "flex" },
          backgroundColor: "#1D267D",
          padding: 1,
          height: "100%",
        }}
        flexDirection={"column"}
        gap={1}
      >
        <NavBarTask />
      </Grid>
      <Grid
        xs={12}
        md={9}
        lg={10}
        container
        sx={{
          padding: "6px",
          display: "flex",
          flexDirection: "column",
          height: "93.5%",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <Grid
          container
          sx={{ width: "100%", paddingY: 1, margin: 0 }}
          columnSpacing={3}
          justifyContent={"space-between"}
        >
          <Grid
            justifySelf={"flex-start"}
            sx={{
              display: {
                xs: "flex",
                sm: "flex",
                md: "none",
                lg: "none",
              },
              paddingBottom: 1,
            }}
            xs={12}
          >
            <IconButton
              aria-label="Show Todo Task"
              onClick={() => {
                handleClickOpenTodoTaskDialog();
              }}
            >
              <MenuOpenIcon />
            </IconButton>
            <Dialog
              sx={{
                display: {
                  xs: "block",
                  sm: "block",
                  md: "none",
                  lg: "none",
                },
              }}
              open={openTodoTaskDialog}
              onClose={handleCloseTodoTaskDialog}
              fullScreen
            >
              <Box
                sx={{
                  backgroundColor: "#1D267D",
                  padding: 1,
                  height: "100%",
                }}
                flexDirection={"column"}
              >
                <Grid container justifyContent={"flex-end"}>
                  <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleCloseTodoTaskDialog}
                    aria-label="close"
                    sx={{ color: "white" }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Grid>
                <NavBarTask />
              </Box>
            </Dialog>
          </Grid>
          <Grid
            container
            xs={12}
            alignItems={"center"}
            justifyContent={"space-around"}
            display={"flex"}
          >
            <Grid container gap={2}>
              <Chip label="Today" variant="filled" color="primary"></Chip>
              <Chip
                label="This month"
                variant="outlined"
                color="primary"
              ></Chip>
              <Chip label="This week" variant="outlined" color="primary"></Chip>
            </Grid>

            <Grid>
              <Button
                variant="contained"
                onClick={handleClickOpenAddTaskDialog}
                color="info"
                size="small"
              >
                Add more task
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <ProgressLayout
          handleOpenAddDialog={() => {
            handleClickOpenAddTaskDialog();
          }}
          handleOpenViewDialog={(id: number | undefined) => {
            setIdTaskView(id);
            handleClickOpenViewTaskDialog();
          }}
        />
        {openAddTaskDialog ? (
          <AddTaskDialog
            addTask={handleAddTask}
            open={openAddTaskDialog}
            onClose={() => handleCloseAddTaskDialog()}
          />
        ) : (
          <></>
        )}
        {openViewTaskDialog ? (
          <ViewTaskDialog
            id={idTaskView}
            open={openViewTaskDialog}
            onClose={() => {
              handleCloseViewTaskDialog();
            }}
          />
        ) : (
          <></>
        )}
      </Grid>
    </Grid>
  );
}
