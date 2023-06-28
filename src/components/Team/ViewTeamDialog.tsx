import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

import { sendNotification } from '../../redux/features/NotificationSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { Member } from '../../types/Member';
import { Team } from '../../types/Team';
import { createRandomString } from '../../utils/createRandom';
import DeleteConfirmDialog from '../DeleteConfirmDialog';

const INVITE_CODE_LENGTH = 6;

interface ViewTaskDialogProps {
  id: number | undefined;
  open: boolean;
  onClose: () => void;
  onDelete: (id: number) => void;
}
export default function ViewTaskDialog(props: ViewTaskDialogProps) {
  const { id } = props;
  const dispatch = useAppDispatch();
  const detail: Team | undefined = useAppSelector((state) =>
    state.team.teams.find((team: Team) => team.id === id)
  );
  const { open } = props;
  const [openRemoveConfirmDialog, setOpenRemoveConfirmDialog] = useState(false);
  const [name, setName] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [description, setDescription] = useState("");
  const [timeCreate, setTimeCreate] = useState<string>();
  const [members, setMembers] = useState<Member[]>();
  const handleClose = () => {
    props.onClose();
  };

  const handleClickCreateInviteCode = () => {
    setInviteCode(createRandomString(INVITE_CODE_LENGTH));
  };

  function copyTextToClipboard(text: string) {
    if (!navigator.clipboard) {
      document.execCommand("copy", true, text);
    } else {
      navigator.clipboard
        .writeText(text)
        .then(function () {
          dispatch(sendNotification({ message: "Copied Text" }));
        })
        .catch(function () {
          alert("Copy failed"); // error
        });
    }
  }

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

  const handleClickCopyInviteCode = () => {
    console.log("Copy Invite Code");
    copyTextToClipboard(inviteCode);
  };

  useEffect(() => {
    if (detail !== undefined) {
      console.log("Load Team detail");
      setName(detail.name);
      setDescription(detail.description);
      setTimeCreate(detail.createTime);
      setMembers(detail.members);
    }
  }, [id]);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth={"md"}>
      <DialogContent>
        <Card variant="outlined" sx={{ my: 1 }}>
          <CardMedia
            sx={{ borderRadius: "4px" }}
            component="img"
            width="auto"
            height="240px"
            image={process.env.PUBLIC_URL + "/img/group.png"}
            alt="task img"
          />
          <CardContent sx={{ textAlign: "left" }}>
            <Grid
              container
              justifyContent={"flex-start"}
              alignItems={"center"}
              gap={3}
            >
              <Typography variant="h5" component="span">
                {name}
                
              </Typography>
              <Typography variant="caption">Created on </Typography>
                <Box
                  component="span"
                  sx={{
                    p : 1,
                    border: "1px solid grey",
                    borderRadius: "16px",
                  }}
                >
                  <Typography variant="body2">{timeCreate}</Typography>
                </Box>
            </Grid>
          </CardContent>
        </Card>
        <Grid sx={{ pb: 1 }}>
          <Typography variant="body2" component="span">
            <Typography variant="subtitle1" component="span" sx={{ pr: 1 }}>
              Description :
            </Typography>
            {description}
          </Typography>
        </Grid>

        <Grid
          container
          justifyContent={"flex-start"}
          wrap="wrap"
          gap={1.5}
          sx={{
            py: 2,
            borderTop: "1px solid rgba(0, 0, 0, 0.12)",
          }}
        >
          {members?.map((member) => (
            <Chip key={member.id} label={member.name} onClick={() => {}} />
          ))}
        </Grid>

        <Grid
          container
          justifyContent={"flex-start"}
          alignItems={"center"}
          gap={2}
        >
          <Button
            variant="contained"
            onClick={() => {
              handleClickCreateInviteCode();
            }}
          >
            Created code to invite
          </Button>
          <TextField
            id="invite-code"
            variant="outlined"
            placeholder=""
            value={inviteCode}
            size="medium"
            InputProps={{
              endAdornment: (
                <IconButton
                  color={"primary"}
                  onClick={() => {
                    handleClickCopyInviteCode();
                  }}
                >
                  <ContentCopyIcon />
                </IconButton>
              ),
            }}
          ></TextField>
        </Grid>
        <DialogActions>
          <Grid container justifyContent={'flex-end'} alignItems={'center'}>
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
              message="Are you sure to delete this team ?"
            />
          </Grid>
          </Grid>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
