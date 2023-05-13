import {
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  TextField,
  Grid,
  DialogActions,
  Button,
  Box,
  Chip,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Theme,
  useTheme,
  SelectChangeEvent,
} from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { Task, StatusTask } from "../../types/Task";
import { Category } from "../../types/Category";
import { useAppSelector } from "../../redux/store";
import { Member } from "../../types/Member";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export interface AddTaskDialogProps {
  open: boolean;
  addTask: (task: Task) => void;
  onClose: () => void;
}

export default function AddTaskDialog(props: AddTaskDialogProps) {
  const theme = useTheme();
  const categories = useAppSelector((state) => state.category.categories);
  const members = useAppSelector((state) => state.member.members);

  const [categoryName, setCategoryName] = useState<string[]>([]);
  const [memberName, setMemberName] = useState<string[]>([]);
  const { open, addTask } = props;

  const [title, setTitle] = useState("");
  const [imgUrl , setImgUrl] = useState("");
  const [description, setDescription] = useState("");
  const [timeStart, setTimeStart] = useState<Dayjs | null | undefined>(dayjs());
  const [timeEnd, setTimeEnd] = useState<Dayjs | null | undefined>(dayjs());
  const [status, setStatus] = useState<StatusTask>("NOT_START");
  const handleClose = () => {
    props.onClose();
  };

  const handleAddTask = () => {
    if (timeStart && timeEnd) {
      const currentCategories: Category[] = [];
      categoryName.map((category: string, index: number) => {
        currentCategories.push({
          id: index,
          name: category,
        });
      });
      const currentMembers: Member[] = [];
      memberName.map((member: string, index: number) => {
        currentMembers.push({
          id: index,
          name: member,
          avatar: "/",
        });
      });
      addTask({
        title,
        imgUrl,
        description,
        timeStart: timeStart?.format("hh:mm A"),
        timeEnd: timeEnd?.format("hh:mm A"),
        categories: currentCategories,
        assignMember: currentMembers,
        status,
      });
    }
  };

  const handleChangeCategory = (
    event: SelectChangeEvent<typeof categoryName>
  ) => {
    const {
      target: { value },
    } = event;
    setCategoryName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleChangeMember = (event: SelectChangeEvent<typeof memberName>) => {
    const {
      target: { value },
    } = event;
    setMemberName(
      // On autofille we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth={"md"}>
      <DialogTitle>Add a task to do</DialogTitle>
      <DialogContent
        sx={{
          padding: "16px",
          borderTop: "1px solid blue",
          borderBottom: "1px solid blue",
        }}
      >
        <FormControl sx={{ marginY: "8px", paddingY: "8px" }} fullWidth>
          <TextField
            label="Title"
            id="task-title"
            variant="outlined"
            placeholder="Input task title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </FormControl>
        <FormControl sx={{ marginY: "8px", paddingY: "8px" }} fullWidth>
          <TextField
            label="Image url"
            id="task-img-url"
            variant="outlined"
            placeholder="Input image url"
            value={imgUrl}
            onChange={(event) => {
              setImgUrl(event.target.value);
            }}
          />
        </FormControl>
        <FormControl sx={{ paddingY: "8px" }} fullWidth>
          <TextField
            multiline
            id="task-description"
            variant="outlined"
            label="Description"
            minRows={3}
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          ></TextField>
        </FormControl>
        <FormControl sx={{ paddingY: "8px" }} fullWidth>
          <Grid container justifyContent={"space-between"}>
            <Grid>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Time Start"
                  value={timeStart}
                  onChange={(newValue: Dayjs | null) => {
                    setTimeStart(newValue);
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Time end"
                  value={timeEnd}
                  onChange={(newValue: Dayjs | null) => {
                    setTimeEnd(newValue);
                  }}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </FormControl>
        {/* Select for categories */}
        <FormControl sx={{ marginY: "4px" }} fullWidth>
          <InputLabel id="label-category">Categories</InputLabel>
          <Select
            labelId="label-category"
            id="category-select"
            multiple
            value={categoryName}
            onChange={handleChangeCategory}
            input={<OutlinedInput label="Categories" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {categories.map((category) => (
              <MenuItem
                key={category.name}
                value={category.name}
                style={getStyles(category.name, categoryName, theme)}
              >
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* Select for member */}
        <FormControl sx={{ marginY: "4px" }} fullWidth>
          <InputLabel id="label-member">Members</InputLabel>
          <Select
            labelId="label-member"
            id="member-select"
            multiple
            value={memberName}
            onChange={handleChangeMember}
            input={<OutlinedInput label="Members" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {members.map((member) => (
              <MenuItem
                key={member.name}
                value={member.name}
                style={getStyles(member.name, memberName, theme)}
              >
                {member.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            handleAddTask();
          }}
        >
          Add
        </Button>
        <Button variant="outlined" color="info" onClick={() => handleClose()}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
