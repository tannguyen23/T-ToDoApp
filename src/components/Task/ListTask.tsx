import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import PendingIcon from "@mui/icons-material/Pending";
import DoneIcon from "@mui/icons-material/Done";
import TimelineIcon from "@mui/icons-material/Timeline";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";

import { useAppSelector, useAppDispatch } from "../../redux/store";
import { StatusTask } from "../../types/Task";

const renderStatusIcon = (status: StatusTask) => {
  switch (status) {
    case "DONE":
      return (
        <Grid container alignItems={"center"}>
          <Grid>
            <Box
              component="span"
              sx={{ color: "success.main", margin: "12px" }}
            >
              {status}
            </Box>
          </Grid>
          <Grid>
            <DoneIcon></DoneIcon>
          </Grid>
        </Grid>
      );

    case "PROCESSING":
      return (
        <Grid container alignItems={"center"}>
          <Grid>
            <Box component="span" sx={{ color: "info.main", margin: "12px" }}>
              {status}
            </Box>
          </Grid>
          <Grid>
            <TimelineIcon></TimelineIcon>
          </Grid>
        </Grid>
      );
    case "NOT_START":
      return (
        <Grid container alignItems={"center"}>
          <Grid>
            <Box
              component="span"
              sx={{ color: "text.disabled", margin: "12px" }}
            >
              {status}
            </Box>
          </Grid>
          <Grid>
            <PendingIcon color="info"></PendingIcon>
          </Grid>
        </Grid>
      );
    case "FAILED":
      return (
        <Grid container alignItems={"center"}>
          <Grid>
            <Box component="span" sx={{ color: "error.main", margin: "12px" }}>
              {status}
            </Box>
          </Grid>
          <Grid>
            <ClearIcon></ClearIcon>
          </Grid>
        </Grid>
      );
  }
};

interface ListTaskProps {
  handleOpenAddDialog: () => void;
  handleOpenViewDialog: (id: number | undefined) => void;
}

export default function ListTask(props: ListTaskProps) {
  const tasks = useAppSelector((state) => state.task.tasks);
  const dispatch = useAppDispatch();
  return (
    <Grid
      container
      spacing={4}
      sx={{ marginY: "2px",marginX : '0', height: "220px" }}
      alignItems="stretch"
    >
      {tasks.map((task, index) => (
        <Grid key={index} xs={12}  sm={4} sx={{ height: "100%" }}>
          <Box boxShadow={6}>
            <Card variant="outlined">
              <CardActionArea
                sx={{ padding: "2px", overflow: "hidden" }}
                onClick={() => {
                  console.log("Open view dialog...");
                  props.handleOpenViewDialog(task?.id);
                }}
              >
                <CardMedia
                  sx={{ borderRadius: "4px" }}
                  component="img"
                  height="140"
                  image={process.env.PUBLIC_URL + "/img/task.jpg"}
                  alt="task img"
                />
                <CardContent sx={{ textAlign: "left" }}>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="flex-end"
                    direction={"row"}
                  >
                    <Grid>
                      <Typography variant="h6" component="span">
                        {task.title}
                      </Typography>
                    </Grid>
                    <Grid>{renderStatusIcon(task.status)}</Grid>
                  </Grid>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        </Grid>
      ))}
      <Grid xs={12} sm={4} sx={{ height: "100%" }}>
        <CardActionArea
          sx={{
            border: "2px dashed #1976d2",
            height: "110%",
            background : '#ffffff'
          }}
          onClick={() => {
            console.log("Open add dialog...");
            props.handleOpenAddDialog();
          }}
        >
          <Grid container justifyContent={"center"} alignItems={"center"}>
            <Grid>
              <Box fontSize={"large"} color="text.primary">
                Add New
              </Box>
            </Grid>
            <Grid>
              <AddIcon sx={{ fontSize: "5rem" }} color="primary"></AddIcon>
            </Grid>
          </Grid>
        </CardActionArea>
      </Grid>
    </Grid>
  );
}
