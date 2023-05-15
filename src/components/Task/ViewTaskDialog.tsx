import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { sendNotification } from "../../redux/features/NotificationSlice";
import { updateStatus } from "../../redux/features/TaskSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Category } from "../../types/Category";
import { Member } from "../../types/Member";
import { StatusTask, Task } from "../../types/Task";
import DeleteConfirmDialog from "../DeleteConfirmDialog";
import ProgressBar from "../ProgressBar/ProgressBar";
import StatusIcon from "../StatusIcon";

interface ViewTaskDialogProps {
  id: number | undefined;
  open: boolean;
  onClose: () => void;
  onDelete: (id: number) => void;
}
export default function ViewTaskDialog(props: ViewTaskDialogProps) {
  const { id } = props;
  const dispatch = useAppDispatch();
  const detail: Task | undefined = useAppSelector((state ) =>
    state.task.tasks.find((task: Task) => task.id === id)
  );
  const { open } = props;
  const [openRemoveConfirmDialog, setOpenRemoveConfirmDialog] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState<string | undefined>("");
  const [timeStart, setTimeStart] = useState<string>();
  const [timeEnd, setTimeEnd] = useState<string>();
  const [categories, setCategories] = useState<Category[]>();
  const [members, setMembers] = useState<Member[]>();
  const [status, setStatus] = useState<StatusTask>("NOT_START");
  const handleClose = () => {
    props.onClose();
  };

  const handleClickOpenRemoveConfirmDialog = () => {
    setOpenRemoveConfirmDialog(true);
  };

  const handleCloseRemoveConfirmDialog = () => {
    setOpenRemoveConfirmDialog(false);
  };

  const handleDeleteTask = () => {
    if (id !== undefined) {
      props.onDelete(id);
      handleCloseRemoveConfirmDialog();
    }
  };

  const handleUpdateStatus = (newStatus: StatusTask) => {
    if (id !== undefined) {
      setStatus(newStatus);
      dispatch(updateStatus({ id, newStatus }));
      dispatch(sendNotification({ message: "Update status successfully" }));
    }
  };

  useEffect(() => {
    if (detail !== undefined) {
      console.log("Task detail");
      setTitle(detail.title);
      setDescription(detail.description);
      setImgUrl(detail.imgUrl);
      setTimeStart(detail.timeStart);
      setTimeEnd(detail.timeEnd);
      setCategories(detail.categories);
      setMembers(detail.assignMember);
      setStatus(detail.status);
    }
  }, [id]);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth={"md"}>
      <DialogContent>
        <Card variant="outlined" sx={{ my: 1 }}>
          <CardHeader
            action={
              <>
                <IconButton aria-label="settings" color="primary">
                  <EditIcon />
                </IconButton>
              </>
            }
          ></CardHeader>
          <CardMedia
            sx={{ borderRadius: "4px" }}
            component="img"
            height="140"
            image={imgUrl || process.env.PUBLIC_URL + "/img/task.jpg"}
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
                <Typography variant="h5" component="span">
                  {title}
                </Typography>
              </Grid>
              <Grid>
                <StatusIcon status={status}></StatusIcon>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Typography variant="body2" component="span">
          <Typography variant="subtitle1" component="span" sx={{ pr: 1 }}>
            Description :
          </Typography>
          {description}
        </Typography>
        <Grid sx={{ my: 1 }}>
          <ProgressBar
            updateStatus={(newStatus: StatusTask) => {
              handleUpdateStatus(newStatus);
            }}
            status={status}
          ></ProgressBar>
        </Grid>
        <Grid
          container
          justifyContent={"flex-start"}
          wrap="wrap"
          gap={1.5}
          sx={{ pb: 1, borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
        >
          {categories?.map((category) => (
            <Chip key={category.id} label={category.name} onClick={() => {}} />
          ))}
        </Grid>
        <Grid
          container
          justifyContent={"flex-start"}
          wrap="wrap"
          gap={1.5}
          sx={{ py: 1, borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
        >
          {members?.map((member) => (
            <Chip key={member.id} label={member.name} onClick={() => {}} />
          ))}
        </Grid>

        <Grid container justifyContent={"space-between"} alignItems={"center"}>
          <Grid>
            <Button
              variant="outlined"
              color="error"
              endIcon={<DeleteForeverIcon />}
              onClick={() => {
                handleClickOpenRemoveConfirmDialog();
              }}
            >
              Remove
            </Button>
            <DeleteConfirmDialog
              onAccept={() => {
                handleDeleteTask();
              }}
              onClose={() => {
                handleCloseRemoveConfirmDialog();
              }}
              open={openRemoveConfirmDialog}
              message="Are you sure to delete this task ?"
            />
          </Grid>

          <Grid>
            <Grid container justifyContent={"flex-end"} alignItems={"center"}>
              <Box
                component="span"
                sx={{
                  p: 1,
                  m: 1,
                  border: "1px solid grey",
                  borderRadius: "16px",
                }}
              >
                <Typography variant="body2">{timeStart}</Typography>
              </Box>
              <Box
                component="span"
                sx={{
                  p: 1,
                  m: 1,
                  border: "1px solid grey",
                  borderRadius: "16px",
                }}
              >
                <Typography variant="body2">{timeEnd}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
