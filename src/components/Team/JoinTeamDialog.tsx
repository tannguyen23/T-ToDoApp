import { Button, Dialog, DialogContent, DialogTitle, FormControl, FormHelperText, Input, InputLabel } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

interface JoinTeamDialogProps {
  open: boolean;
  onClose: () => void;
}
export default function JoinTeamDialog(props: JoinTeamDialogProps) {
  const { open, onClose } = props;
  const handleClose = () => {
    onClose();
  };
  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth={"sm"}>
      <DialogTitle>Join a team</DialogTitle>
      <DialogContent
        sx={{
          padding: "16px",
          borderTop: "1px solid blue",
        }}
      >
        <Grid
          container
          justifyContent={"space-around"}
          alignItems={"center"}
          sx={{ marginY: "16px" }}
        >
          <Grid>
            <FormControl sx={{ paddingY: "4px" }}>
              <InputLabel htmlFor="code-input">Enter code</InputLabel>
              <Input id="code-input" aria-describedby="code-helper-text" />
              <FormHelperText id="code-helper-text">
                Enter the code of the group you are invited to join
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid container gap={2}>
            <Button variant="contained" onClick={() => {}}>
              Join
            </Button>
            <Button
              variant="outlined"
              color="info"
              onClick={() => handleClose()}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
