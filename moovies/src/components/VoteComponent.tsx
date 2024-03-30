import { FC } from "react";
import { Typography, Box } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

const VoteComponent: FC<{ voteAverage: number; voteCount: number }> = ({
  voteAverage,
  voteCount,
}) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <ThumbUpIcon color="primary" fontSize="large" />
      <Typography variant="body1" color="primary" fontWeight="bold" ml={1}>
        {voteAverage}
      </Typography>
      <Typography variant="body2" color="textSecondary" ml={1}>
        ({voteCount} votes)
      </Typography>
    </Box>
  );
};

export default VoteComponent;
