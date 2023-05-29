import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Theme,
  useTheme,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppSelector } from "../../redux/store";
import { Category } from "../../types/Category";
import { Member } from "../../types/Member";
import { StatusTask, Task } from "../../types/Task";

import * as yup from "yup";

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

const schema = yup.object({
  title: yup.string().required("Should not be empty"),
  imgUrl: yup.string(),
  description: yup.string(),
  timeStart: yup.string().required("Should not be empty"),
  timeEnd: yup.string().required("Should not be empty"),
  categories: yup
    .array()
    .of(yup.string())
    .min(1, "Please select at least 1 Category")
    .required("Should not be empty"),
  members: yup
    .array()
    .of(yup.string())
    .min(1, "Please select at least 1 Member")
    .required("Should not be empty"),
});

const initValueForm = {
  title: "",
  imgUrl: "",
  description: "",
  timeStart: "",
  timeEnd: "",
  categories: new Array<string>(),
  members: new Array<string>(),
};

export default function AddTaskDialog(props: AddTaskDialogProps) {
  const theme = useTheme();

  const categories = useAppSelector((state) => state.category.categories);
  const members = useAppSelector((state) => state.member.members);

  const [categoryName, setCategoryName] = useState<string[]>([]);
  const [memberName, setMemberName] = useState<string[]>([]);
  const { open, addTask } = props;
  const [status, setStatus] = useState<StatusTask>("NOT_START");

  const handleClose = () => {
    props.onClose();
  };

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initValueForm,
  });

  const onSubmit = handleSubmit((data) => {
    console.log("Submit form");
    handleAddTask();
  });

  const handleAddTask = () => {
      const currentCategories: Category[] = [];
      categoryName.map((category: string, index: number) => {
        currentCategories.push({
          // id: index,
          name: category,
        });
      });
      const currentMembers: Member[] = [];
      memberName.map((member: string, index: number) => {
        currentMembers.push({
          // id: index,
          name: member,
          // avatar: "/",
        });
      });
      const title = getValues('title').trim();
      const imgUrl = getValues('imgUrl').trim();
      const description = getValues('description').trim();
      const timeStart = getValues('timeStart').trim();
      const timeEnd = getValues('timeEnd').trim();
      addTask({
        title,
        imgUrl,
        description,
        timeStart,
        timeEnd,
        categories: currentCategories,
        members: currentMembers,
        status,
      });
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
    setValue(
      "categories",
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
    setValue("members", typeof value === "string" ? value.split(",") : value);
  };

  return (
    <>
      <Dialog onClose={handleClose} open={open} fullWidth maxWidth={"md"}>
        <form
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            onSubmit();
          }}
        >
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
                {...register("title")}
                error={errors.title?.message !== undefined}
                helperText={<>{errors.title?.message}</>}
                label="Title"
                id="task-title"
                variant="outlined"
                placeholder="Input task title"
              />
            </FormControl>
            <FormControl sx={{ marginY: "8px", paddingY: "8px" }} fullWidth>
              <TextField
                {...register("imgUrl")}
                error={errors.imgUrl?.message !== undefined}
                helperText={<>{errors.imgUrl?.message}</>}
                label="Image url"
                id="task-img-url"
                variant="outlined"
                placeholder="Input image url"
              />
            </FormControl>
            <FormControl sx={{ paddingY: "8px" }} fullWidth>
              <TextField
                {...register("description")}
                error={errors.description?.message !== undefined}
                helperText={<>{errors.description?.message}</>}
                multiline
                id="task-description"
                variant="outlined"
                label="Description"
                minRows={3}
              ></TextField>
            </FormControl>
            <FormControl sx={{ paddingY: "8px" }} fullWidth>
              <Grid container justifyContent={"space-between"} columnGap={10} rowGap={2}>
                <Grid flexGrow={1}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{ width: "100%" }}
                      {...register("timeStart")}
                      label="Time Start"
                      onChange={(newValue: Dayjs | null) => {
                        if (newValue) {
                          setValue("timeStart", newValue?.format("DD-MM-YYYY"));
                        }
                      }}
                      format="DD/MM/YYYY"
                      slotProps={{
                        textField: {
                          variant: "outlined",
                          error: errors.timeStart?.message !== undefined,
                          helperText: <>{errors.timeStart?.message}</>,
                        },
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid flexGrow={1}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{ width: "100%" }}
                      {...register("timeEnd")}
                      label="Time end"
                      onChange={(newValue: Dayjs | null) => {
                        if (newValue) {
                          setValue("timeEnd", newValue?.format("DD-MM-YYYY"));
                        }
                      }}
                      format="DD/MM/YYYY"
                      slotProps={{
                        textField: {
                          variant: "outlined",
                          error: errors.timeEnd?.message !== undefined,
                          helperText: <>{errors.timeEnd?.message}</>,
                        },
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
                {...register("categories")}
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
                error={errors.categories?.message !== undefined}
                MenuProps={MenuProps}
              >
                {categories.map((category: Category) => (
                  <MenuItem
                    key={category.name}
                    value={category.name}
                    style={getStyles(category.name, categoryName, theme)}
                  >
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText
                sx={{ color: "error.main", marginLeft: "16px !important" }}
              >
                <>{errors.categories?.message}</>
              </FormHelperText>
            </FormControl>
            {/* Select for member */}
            <FormControl sx={{ marginY: "4px" }} fullWidth>
              <InputLabel id="label-member">Members</InputLabel>
              <Select
                {...register("members")}
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
                error={errors.members?.message !== undefined}
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
              <FormHelperText
                sx={{ color: "error.main", marginLeft: "16px !important" }}
              >
                <>{errors.members?.message}</>
              </FormHelperText>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="success"
              type="submit"
              // onClick={() => {
              //   handleAddTask();

              // }}
            >
              Add
            </Button>
            <Button
              variant="outlined"
              color="info"
              onClick={() => handleClose()}
            >
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
