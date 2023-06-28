import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Theme,
  useTheme,
} from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';

import { useAuth } from '../../contexts/AuthContext';
import { useAppSelector } from '../../redux/store';
import { Member } from '../../types/Member';
import { Team } from '../../types/Team';

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

export interface AddTeamDialogProps {
  open: boolean;
  addTeam: (team: Team) => void;
  onClose: () => void;
}

export default function AddTeamDialog(props: AddTeamDialogProps) {
  const {authUser} = useAuth();
  const theme = useTheme();
  const members = useAppSelector((state) => state.member.members);

  const [memberName, setMemberName] = useState<string[]>([]);
  const { open, addTeam } = props;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
 
  const handleClose = () => {
    props.onClose();
  };

  const handleAddTeam = () => {
    const timeCreate = dayjs();
    const currentMembers: Member[] = [];
    memberName.map((member: string, index: number) => {
      currentMembers.push({
        id: index,
        name: member,
        avatar: "/",
      });
    });
    const authUserId = parseInt(authUser?.id || '-1');
    if (authUserId !== -1) {
      addTeam({
        name,
        ownerId : authUserId,
        description,
        createTime : timeCreate.format("DD-MM-YYYY"),
        members: currentMembers,
      });
    }
    
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
      <DialogTitle>Create a new team</DialogTitle>
      <DialogContent
        sx={{
          padding: "16px",
          borderTop: "1px solid blue",
          borderBottom: "1px solid blue",
        }}
      >
        <FormControl sx={{ marginY: "8px", paddingY: "8px" }} fullWidth>
          <TextField
            label="Name"
            id="team-name"
            variant="outlined"
            placeholder="Input team name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </FormControl>
        <FormControl sx={{ paddingY: "8px" }} fullWidth>
          <TextField
            multiline
            id="team-description"
            variant="outlined"
            label="Description"
            minRows={3}
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          ></TextField>
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
            handleAddTeam();
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
