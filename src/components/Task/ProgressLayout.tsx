import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import PendingIcon from "@mui/icons-material/Pending";
import DoneIcon from "@mui/icons-material/Done";
import TimelineIcon from "@mui/icons-material/Timeline";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import { useAppSelector, useAppDispatch } from "../../redux/store";
import { StatusTask, Task } from "../../types/Task";
import { ReactNode } from "react";

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

const renderListTaskWithStatus = (
  tasks: Task[],
  status: StatusTask,
  handleOpenViewDialog: (id: number | undefined) => void
) => {
  let checkHaveStatus;
  return (
    <>
      {tasks.map((task, index) => {
        if (task.status === status) {
          checkHaveStatus = true;
          return (
            <Box key={index} boxShadow={6} sx={{ borderRadius: "8px", mb: 3 }}>
              <Card variant="outlined" sx={{ borderRadius: "8px" }}>
                <CardActionArea
                  sx={{ overflow: "hidden", borderRadius: "8px" }}
                  onClick={() => {
                    console.log("Open view dialog...");
                    handleOpenViewDialog(task.id);
                  }}
                >
                  <CardMedia
                    sx={{ borderTopRadius: "8px" }}
                    component="img"
                    height="120px"
                    image={
                      task.imgUrl || process.env.PUBLIC_URL + "/img/task.jpg"
                    }
                    alt="task img"
                  />
                  <CardContent sx={{ textAlign: "left" }}>
                    <Typography variant="h6" component="span">
                      {task.title}
                    </Typography>
                    <Grid
                      container
                      justifyContent={"flex-start"}
                      wrap="wrap"
                      gap={1.5}
                      sx={{
                        py: 1,
                      }}
                    >
                      {task.categories?.map((category) => (
                        <Chip
                          key={category.id}
                          label={category.name}
                          onClick={() => {}}
                        />
                      ))}
                    </Grid>

                    <Grid
                      container
                      justifyContent={"flex-end"}
                      wrap="wrap"
                      gap={1.5}
                      sx={{
                        py: 1,
                      }}
                    >
                      {task.assignMember?.map((member) => (
                        <Chip
                          size={"small"}
                          key={member.id}
                          label={member.name}
                          onClick={() => {}}
                        />
                      ))}
                    </Grid>
                    <Grid
                      container
                      justifyContent={"flex-start"}
                      alignItems={"center"}
                      wrap="wrap"
                      gap={1.5}
                      sx={{
                        py: 1,
                      }}
                    >
                      <AccessTimeIcon color="warning" />
                      <Typography
                        component="span"
                        variant="body2"
                        fontStyle={"italic"}
                      >
                        Dec 23
                      </Typography>
                    </Grid>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
          );
        }
      })}
      {!checkHaveStatus && (
        <Typography
          variant="subtitle1"
          component="div"
          sx={{ textAlign: "center", color: "rgba(0,0,0,0.5)" }}
        >
          No task here
        </Typography>
      )}
    </>
  );
};

export default function ProgressLayout(props: ListTaskProps) {
  const tasks = useAppSelector((state) => state.task.tasks);
  const dispatch = useAppDispatch();
  return (
    <Grid
      container
      flexDirection={"row"}
    >
      <Grid
        xs={6}
        container
        spacing={12}
        sx={{ margin: "0", width: "100%" }}
        alignItems="stretch"
      >
        <Grid xs={12} sm={12} md={6} lg={4}>
          <Typography
            variant={"subtitle1"}
            sx={{ color: "#000000" }}
            fontWeight={"bold"}
          >
            Started
          </Typography>
          <Box sx={{ backgroundColor: "#F8F8F8" }} borderRadius={1} padding={2}>
            {renderListTaskWithStatus(
              tasks,
              "NOT_START",
              props.handleOpenViewDialog
            )}
            ;
          </Box>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={4}>
          <Typography
            variant={"subtitle1"}
            sx={{ color: "#000000" }}
            fontWeight={"bold"}
          >
            Processing
          </Typography>
          <Box sx={{ backgroundColor: "#F8F8F8" }} borderRadius={1} padding={2}>
            {renderListTaskWithStatus(
              tasks,
              "PROCESSING",
              props.handleOpenViewDialog
            )}
            ;
          </Box>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={4}>
          <Typography
            variant={"subtitle1"}
            sx={{ color: "#000000" }}
            fontWeight={"bold"}
          >
            Done
          </Typography>
          <Box sx={{ backgroundColor: "#F8F8F8" }} borderRadius={1} padding={2}>
            {renderListTaskWithStatus(
              tasks,
              "DONE",
              props.handleOpenViewDialog
            )}
            ;
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={12}
        sx={{ margin: "0", width: "100%" }}
        alignItems="stretch"
        justifyContent="flex-end"
      >
        <Grid xs={12} sm={12} md={6} lg={4}>
          <Typography
            variant={"subtitle1"}
            sx={{ color: "#000000" }}
            fontWeight={"bold"}
          >
            Failed
          </Typography>
          <Box sx={{ backgroundColor: "#F8F8F8" }} borderRadius={1} padding={2}>
            {renderListTaskWithStatus(
              tasks,
              "FAILED",
              props.handleOpenViewDialog
            )}
            ;
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}
