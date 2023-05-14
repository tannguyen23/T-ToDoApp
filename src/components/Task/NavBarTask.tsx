import { useState, useRef } from "react";
import {
  Typography,
  Box,
  FormControlLabel,
  Switch,
  Slide,
  Checkbox,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

export default function NavBarTask() {
  const [checkedToday, setCheckedToday] = useState(true);
  const [checkedThisWeek, setCheckedThisWeek] = useState(true);
  const [checkedThisMonth, setCheckedThisMonth] = useState(true);

  const containerTodayRef = useRef(null);
  const containerThisWeekRef = useRef(null);
  const containerThisMonthRef = useRef(null);

  const handleChangeCheckedToday = () => {
    setCheckedToday((prev) => !prev);
  };
  const handleChangeCheckedThisMonth = () => {
    setCheckedThisMonth((prev) => !prev);
  };
  const handleChangeCheckedThisWeek = () => {
    setCheckedThisWeek((prev) => !prev);
  };

  return (
    <Grid sx={{height : '100%'}}>
      <Typography
        variant={"h6"}
        sx={{ paddingY: 2, textAlign: "center" }}
        color={"secondary.light"}
      >
        To - Do Tasks
      </Typography>
      <Box component={"div"} boxShadow={"1"} sx={{}} ref={containerTodayRef}>
        {/*  */}
        <Box
          sx={{ padding: 1, marginY: 1, backgroundColor: "#2733a5" }}
          borderRadius={2}
        >
          <FormControlLabel
            control={
              <Switch
                checked={checkedToday}
                onChange={() => {
                  handleChangeCheckedToday();
                }}
              />
            }
            label={
              <Typography
                variant={"body1"}
                color={"primary.light"}
                fontWeight={"bold"}
              >
                Today
              </Typography>
            }
          />
          {checkedToday && (
            <>
              <Divider sx={{ borderColor: "rgba(0, 0, 0, 0.5)" }} />
              <Slide
                direction="right"
                in={checkedToday}
                container={containerTodayRef.current}
              >
                <Grid container flexDirection={"column"}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={false}
                        onChange={() => {}}
                        name="Implement login page"
                        sx={{ color: "white" }}
                      />
                    }
                    label={
                      <Typography variant={"subtitle2"} color={"text.light"}>
                        Implement Login Page
                      </Typography>
                    }
                  />
                  <Divider />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={false}
                        onChange={() => {}}
                        name="Implement login page"
                        sx={{ color: "white" }}
                      />
                    }
                    label={
                      <Typography variant={"subtitle2"} color={"text.light"}>
                        Implement Login Page
                      </Typography>
                    }
                  />
                  <Divider />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={false}
                        onChange={() => {}}
                        name="Implement login page"
                        sx={{ color: "white" }}
                      />
                    }
                    label={
                      <Typography variant={"subtitle2"} color={"text.light"}>
                        Implement Login Page
                      </Typography>
                    }
                  />
                </Grid>
              </Slide>
            </>
          )}
        </Box>
        {/*  */}

        {/*  */}
        <Box
          sx={{ padding: 1, marginY: 1, backgroundColor: "#2733a5" }}
          borderRadius={2}
        >
          <FormControlLabel
            control={
              <Switch
                checked={checkedThisMonth}
                onChange={() => {
                  handleChangeCheckedThisMonth();
                }}
              />
            }
            label={
              <Typography
                variant={"body1"}
                color={"primary.light"}
                fontWeight={"bold"}
              >
                This month
              </Typography>
            }
          />
          {checkedThisMonth && (
            <>
              <Divider sx={{ borderColor: "rgba(0, 0, 0, 0.5)" }} />
              <Slide
                direction="right"
                in={checkedThisMonth}
                container={containerThisMonthRef.current}
              >
                <Grid container flexDirection={"column"}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={false}
                        onChange={() => {}}
                        name="Implement login page"
                        sx={{ color: "white" }}
                      />
                    }
                    label={
                      <Typography variant={"subtitle2"} color={"text.light"}>
                        Implement Login Page
                      </Typography>
                    }
                  />
                  <Divider />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={false}
                        onChange={() => {}}
                        name="Implement login page"
                        sx={{ color: "white" }}
                      />
                    }
                    label={
                      <Typography variant={"subtitle2"} color={"text.light"}>
                        Implement Login Page
                      </Typography>
                    }
                  />
                  <Divider />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={false}
                        onChange={() => {}}
                        name="Implement login page"
                        sx={{ color: "white" }}
                      />
                    }
                    label={
                      <Typography variant={"subtitle2"} color={"text.light"}>
                        Implement Login Page
                      </Typography>
                    }
                  />
                </Grid>
              </Slide>
            </>
          )}
        </Box>
        {/*  */}

        {/*  */}
        <Box
          sx={{ padding: 1, marginY: 1, backgroundColor: "#2733a5" }}
          borderRadius={2}
        >
          <FormControlLabel
            control={
              <Switch
                checked={checkedThisWeek}
                onChange={() => {
                  handleChangeCheckedThisWeek();
                }}
              />
            }
            label={
              <Typography
                variant={"body1"}
                color={"primary.light"}
                fontWeight={"bold"}
              >
                This week
              </Typography>
            }
          />
          {checkedThisWeek && (
            <>
              <Divider sx={{ borderColor: "rgba(0,0,0,0.5)" }} />
              <Slide
                direction="right"
                in={checkedThisWeek}
                container={containerThisWeekRef.current}
              >
                <Grid container flexDirection={"column"}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={false}
                        onChange={() => {}}
                        name="Implement login page"
                        sx={{ color: "white" }}
                      />
                    }
                    label={
                      <Typography variant={"subtitle2"} color={"text.light"}>
                        Implement Login Page
                      </Typography>
                    }
                  />
                  <Divider/>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={false}
                        onChange={() => {}}
                        name="Implement login page"
                        sx={{ color: "white" }}
                      />
                    }
                    label={
                      <Typography variant={"subtitle2"} color={"text.light"}>
                        Implement Login Page
                      </Typography>
                    }
                  />
                  <Divider/>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={false}
                        onChange={() => {}}
                        name="Implement login page"
                        sx={{ color: "white" }}
                      />
                    }
                    label={
                      <Typography variant={"subtitle2"} color={"text.light"}>
                        Implement Login Page
                      </Typography>
                    }
                  />
                </Grid>
              </Slide>
            </>
          )}
        </Box>
        {/*  */}
      </Box>
    </Grid>
  );
}
