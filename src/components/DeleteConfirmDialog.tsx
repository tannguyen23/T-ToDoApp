import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

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
      maxWidth={"sm"}
      fullWidth={true}
    >
      <DialogTitle id="alert-dialog-title">{"Remove Alert"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message || "Are you sure to delete this item ?"}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={onAccept}
          autoFocus
          startIcon={<DeleteIcon />}
          color="error"
        >
          Remove
        </Button>
      </DialogActions>
    </Dialog>
  );
}
