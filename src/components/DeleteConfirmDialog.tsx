import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
interface DeleteConfirmDialogProps {
  message?: string;
  open: boolean;
  onAccept: () => void;
  onClose: () => void;
}
export default function DeleteConfirmDialog(props: DeleteConfirmDialogProps) {
  const { message, open, onAccept, onClose } = props;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Remove Alert"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message || 'Are you sure to delete this item ?'}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Disagree</Button>
        <Button onClick={onAccept} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}
