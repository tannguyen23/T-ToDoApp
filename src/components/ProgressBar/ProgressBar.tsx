import { Box, Chip } from "@mui/material";
import { StatusTask } from "../../types/Task";
import Grid from "@mui/material/Unstable_Grid2";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";

interface ProgressBarProps {
  status: StatusTask;
  updateStatus: (newStatus: StatusTask) => void;
}
export default function ProgressBar(props: ProgressBarProps) {
  const { status, updateStatus } = props;

  const [currentStatus, setCurrentStatus] = useState(status);

  const handleUpdateStatus = (newStatus: StatusTask) => {
    setCurrentStatus(newStatus);
    updateStatus(newStatus);
  };
  useEffect(() => {
    setCurrentStatus(status);
    return () => {
      console.log("Unmount");
    };
  }, [status]);

  return (
    <Box
      component={"div"}
      sx={{
        paddingY: "20px",
        width: "100%",
        height: "120px",
        borderTop: "1px solid rgba(0, 0, 0, 0.12)",
        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
      }}
    >
      <Grid
        container
        direction="column"
        sx={{ minHeight: "100%" }}
        justifyContent={"space-around"}
      >
        <Grid
          container
          wrap="nowrap"
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Grid xs={2}>
            <Chip
              icon={
                currentStatus !== "FAILED" ? <CheckIcon></CheckIcon> : <></>
              }
              label="Started"
              sx={{ width: "100%" }}
              onClick={() => {
                handleUpdateStatus("NOT_START");
              }}
              color={currentStatus !== "FAILED" ? "success" : "default"}
            />
          </Grid>
          <Grid xs={2}>
            <Box sx={{ border: "1px dashed rgba(0, 0, 0, 0.12)" }}></Box>
          </Grid>
          <Grid xs={2}>
            <Chip
              icon={
                currentStatus === "PROCESSING" || currentStatus === "DONE" ? (
                  <CheckIcon></CheckIcon>
                ) : (
                  <></>
                )
              }
              label="Processing"
              sx={{ width: "100%" }}
              onClick={() => {
                handleUpdateStatus("PROCESSING");
              }}
              color={
                currentStatus === "PROCESSING" || currentStatus === "DONE"
                  ? "success"
                  : "default"
              }
            />
          </Grid>
          <Grid xs={2}>
            <Box sx={{ border: "1px dashed rgba(0, 0, 0, 0.12)" }}></Box>
          </Grid>
          <Grid xs={2}>
            <Chip
              icon={currentStatus === "DONE" ? <CheckIcon></CheckIcon> : <></>}
              label="Done"
              sx={{ width: "100%" }}
              onClick={() => {
                handleUpdateStatus("DONE");
              }}
              color={currentStatus === "DONE" ? "success" : "default"}
            />
          </Grid>
        </Grid>
        <Grid
          container
          wrap="nowrap"
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Grid xs={2}>
            <Chip
              icon={
                currentStatus === "FAILED" ? <CloseIcon></CloseIcon> : <></>
              }
              label="Failed"
              sx={{ width: "100%" }}
              onClick={() => {
                handleUpdateStatus("FAILED");
              }}
              color={currentStatus === "FAILED" ? "error" : "default"}
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
