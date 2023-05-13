import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        paddingY: "6px",
        alignSelf: "flex-end",
        position: "absolute",
        width: "100%",
        backgroundColor: "#2476D2",
      }}
    >
      <Box sx={{ alignSelf: "center", width: "100%", textAlign: "right" }}>
        <Typography
          variant="body2"
          color="rgb(255, 255, 255,0.6)"
          // sx={{ paddingX: "16px" }}
        >
          This website made by TanNguyen (tanta2358@gmail.com)
        </Typography>
      </Box>
    </Box>
  );
}
