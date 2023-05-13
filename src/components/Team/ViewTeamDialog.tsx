import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Dialog,
  DialogContent,
  Grid,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Member } from "../../types/Member";
import { Team } from "../../types/Team";

interface ViewTaskDialogProps {
  id: number | undefined;
  open: boolean;
  onClose: () => void;
}
export default function ViewTaskDialog(props: ViewTaskDialogProps) {
  const { id } = props;
  const dispatch = useAppDispatch();
  const detail: Team | undefined = useAppSelector((state) =>
    state.team.teams.find((team: Team) => team.id === id)
  );
  const { open } = props;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [timeCreate, setTimeCreate] = useState<string>();
  const [members, setMembers] = useState<Member[]>();
  const handleClose = () => {
    props.onClose();
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
              justifyContent="space-between"
              alignItems="flex-end"
              direction={"row"}
            >
              <Grid>
                <Typography variant="h5" component="span">
                  {name}
                </Typography>
              </Grid>
              {/* <Grid>
                <StatusIcon status={status}></StatusIcon>
              </Grid> */}
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
            borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
          }}
        >
          {members?.map((member) => (
            <Chip key={member.id} label={member.name} onClick={() => {}} />
          ))}
        </Grid>

        <Grid container justifyContent={"flex-end"} alignItems={"center"}>
        <Typography variant="caption">Create at </Typography>
          <Box
            component="span"
            sx={{ p: 1, m: 1, border: "1px solid grey", borderRadius: "16px" }}
          >
            <Typography variant="body2">{timeCreate}</Typography>
          </Box>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
