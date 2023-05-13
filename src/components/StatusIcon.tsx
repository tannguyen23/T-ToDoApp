import { Box } from "@mui/material";
import { StatusTask } from "../types/Task";
import Grid from "@mui/material/Unstable_Grid2";
import PendingIcon from "@mui/icons-material/Pending";
import DoneIcon from "@mui/icons-material/Done";
import TimelineIcon from "@mui/icons-material/Timeline";
import ClearIcon from "@mui/icons-material/Clear";

interface StatusIconProps {
  status: StatusTask;
}
export default function StatusIcon(props: StatusIconProps) {
  const { status } = props;
  switch (props.status) {
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
              sx={{
                color: "text.disabled",
                margin: "12px",
              }}
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
}
