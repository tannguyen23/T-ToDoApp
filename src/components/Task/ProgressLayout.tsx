import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Skeleton,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { useState } from "react";
import {
  getListTaskAsync,
  updateStatus,
  updateStatusTaskAsync,
} from "../../redux/features/TaskSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { StatusTask, Task } from "../../types/Task";
import { convertStrDateToMonthDayString } from "../../utils/convert";
import LoadingAction from "../LoadingAction";
import { finishAction, startAction } from "../../redux/features/ActionSlice";
import { sendNotification } from "../../redux/features/NotificationSlice";

interface ListTaskProps {
  handleOpenAddDialog: () => void;
  handleOpenViewDialog: (id: string | undefined) => void;
}

export default function ProgressLayout(props: ListTaskProps) {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.task.tasks);
  const isLoadingList = useAppSelector((state) => state.task.isLoading);

  const [currentTaskDragId, setCurrentTaskDragId] = useState<string>();
  const [newStatus, setNewStatus] = useState<StatusTask>();
  const [dragOverStatus, setDragOverStatus] = useState<
    StatusTask | undefined
  >();

  const handleUpdateStatusTask = (id: string, newStatus: StatusTask) => {
    dispatch(startAction());
    dispatch(updateStatusTaskAsync({ id, newStatus })).then(() => {
      dispatch(getListTaskAsync());
      dispatch(sendNotification({ message: "Update status successfully " }));
      dispatch(finishAction());
    });
    // dispatch(updateStatus({ id, newStatus }));
  };

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    idCurrentTask: string | undefined
  ) => {
    if (idCurrentTask !== undefined) {
      console.log(`dragStart${idCurrentTask}`);
      setCurrentTaskDragId(idCurrentTask);
    }
  };

  const handleDragEnter = (
    event: React.DragEvent<HTMLDivElement>,
    newStatus: StatusTask
  ) => {
    setNewStatus(newStatus);
  };

  const handleDragEnd = () => {
    if (currentTaskDragId !== undefined && newStatus !== undefined) {
      handleUpdateStatusTask(currentTaskDragId, newStatus);
      setDragOverStatus(undefined);
    }
  };

  // useEffect(() => {

  // }, [third])

  // render function
  const renderListTaskWithStatus = (
    tasks: Task[],
    status: StatusTask,
    handleOpenViewDialog: (id: string | undefined) => void
  ) => {
    let checkHaveTask;
    return (
      <Box
        sx={{ backgroundColor: "#F8F8F8", height: "auto" }}
        borderRadius={1}
        padding={2}
        onDragOver={(event: React.DragEvent<HTMLDivElement>) => {
          setDragOverStatus(status);
        }}
        border={status === dragOverStatus ? "2px dashed #1976d2" : ""}
        onDragEnter={(event: React.DragEvent<HTMLDivElement>) => {
          handleDragEnter(event, status);
        }}
        onDragEnd={() => {
          handleDragEnd();
        }}
      >
        {tasks.map((task, index) => {
          if (task.status === status) {
            checkHaveTask = true;
            return (
              <Box
                key={index}
                boxShadow={6}
                sx={{ borderRadius: "8px", mb: 3 }}
              >
                <Card variant="outlined" sx={{ borderRadius: "8px" }}>
                  <div
                    draggable={true}
                    onDragStart={(event: React.DragEvent<HTMLDivElement>) => {
                      handleDragStart(event, task?.id);
                    }}
                  >
                    <CardActionArea
                      sx={{ overflow: "hidden", borderRadius: "8px" }}
                      onClick={() => {
                        console.log("Open view dialog...");
                        handleOpenViewDialog(task.id);
                      }}
                      draggable={false}
                    >
                      <CardMedia
                        sx={{ borderTopRadius: "8px" }}
                        component="img"
                        height="120px"
                        image={
                          task.imgUrl ||
                          process.env.PUBLIC_URL + "/img/task.jpg"
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
                          {task.categories?.map((category, index) => (
                            <Chip
                              key={index}
                              label={category.name}
                              onClick={() => {}}
                              color="info"
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
                          {task.members?.map((member, index) => (
                            <Chip
                              key={index}
                              size={"small"}
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
                            {convertStrDateToMonthDayString(task.timeEnd)}
                          </Typography>
                        </Grid>
                      </CardContent>
                    </CardActionArea>
                  </div>
                </Card>
              </Box>
            );
          }
        })}
        {!checkHaveTask && (
          <Grid
            container
            alignItems={"center"}
            justifyContent={"center"}
            sx={{ minHeight: "180px", width: "100%" }}
          >
            <Typography
              variant="subtitle1"
              component="div"
              sx={{
                color: "rgba(0,0,0,0.5)",
              }}
            >
              No task here
            </Typography>
          </Grid>
        )}
      </Box>
    );
  };

  return (
    <Grid container flexDirection={"row"}>
      <Typography variant={"subtitle1"} marginLeft={6} color={"warning.main"}>
        Notice : You can drag and drop task to change it' status
      </Typography>
      <Grid
        xs={6}
        container
        spacing={6}
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
          {isLoadingList ? (
            <Grid
              container
              alignItems={"center"}
              justifyContent={"center"}
              sx={{ minHeight: "180px", width: "100%" }}
            >
              <Skeleton
                variant="rounded"
                width={"100%"}
                height={"180px"}
                sx={{ p: 2 }}
                animation={"wave"}
              />
            </Grid>
          ) : (
            renderListTaskWithStatus(
              tasks,
              "NOT_START",
              props.handleOpenViewDialog
            )
          )}
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={4}>
          <Typography
            variant={"subtitle1"}
            sx={{ color: "#000000" }}
            fontWeight={"bold"}
          >
            Processing
          </Typography>
          {isLoadingList ? (
            <Grid
              container
              alignItems={"center"}
              justifyContent={"center"}
              sx={{ minHeight: "180px", width: "100%" }}
            >
              <Skeleton
                variant="rounded"
                width={"100%"}
                height={"180px"}
                sx={{ p: 2 }}
                animation={"wave"}
              />
            </Grid>
          ) : (
            renderListTaskWithStatus(
              tasks,
              "PROCESSING",
              props.handleOpenViewDialog
            )
          )}
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={4}>
          <Typography
            variant={"subtitle1"}
            sx={{ color: "#000000" }}
            fontWeight={"bold"}
          >
            Done
          </Typography>
          {isLoadingList ? (
            <Grid
              container
              alignItems={"center"}
              justifyContent={"center"}
              sx={{ minHeight: "180px", width: "100%" }}
            >
              <Skeleton
                variant="rounded"
                width={"100%"}
                height={"180px"}
                sx={{ p: 2 }}
                animation={"wave"}
              />
            </Grid>
          ) : (
            renderListTaskWithStatus(tasks, "DONE", props.handleOpenViewDialog)
          )}
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
          {isLoadingList ? (
            <Grid
              container
              alignItems={"center"}
              justifyContent={"center"}
              sx={{ minHeight: "180px", width: "100%" }}
            >
              <Skeleton
                variant="rounded"
                width={"100%"}
                height={"180px"}
                sx={{ p: 2 }}
                animation={"wave"}
              />
            </Grid>
          ) : (
            renderListTaskWithStatus(
              tasks,
              "FAILED",
              props.handleOpenViewDialog
            )
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
