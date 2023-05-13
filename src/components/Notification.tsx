import { Button, IconButton, Snackbar } from "@mui/material";
import React from "react";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch } from "../redux/store";
import { sendNotification } from "../redux/features/NotificationSlice";

interface NotificationProps {
  message: string;
}
export default function Notification(props: NotificationProps) {
  const dispatch = useAppDispatch();
  const { message } = props;
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    console.log("Handle Close")
    setOpen(true);
    dispatch(sendNotification({ message: "" }));
  };
  if (message === "") {
    return null;
  } else {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={open}
        autoHideDuration={10000}
        onClose={() => handleClose()}
        message={message}
        action={
          <React.Fragment>
            <Button
              color="secondary"
              size="small"
              onClick={() => handleClose()}
            >
              Close
            </Button>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => handleClose()}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      ></Snackbar>
    );
  }
}
