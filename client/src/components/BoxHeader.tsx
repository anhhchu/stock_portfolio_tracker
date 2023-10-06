import React from "react";
import FlexBetween from "./FlexBetween";
import { Box, Typography, useTheme } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";

type Props = {
  title: string; 
  substitle?: string;
  icon?: React.ReactNode;
  sidetext: string;
};

const BoxHeader = ({ icon, title, substitle, sidetext }: Props) => {
  const { palette } = useTheme();
  return (
    <FlexBetween color={palette.grey[400]} margin="1.5rem 1rem 0 1rem">
      <FlexBetween>
        {icon}
        <Box width="100%">
          <Typography variant="h4" mb="-0.1rem">
            {title}
          </Typography>
          <Typography variant="h6">{substitle}</Typography>
        </Box>
      </FlexBetween>
      <Typography variant="h5" fontWeight="200" align="right" color={palette.secondary[500]}>
        {sidetext}
        <IconButton color="secondary" aria-label="refresh" component="span">
          <RefreshIcon />
        </IconButton>
      </Typography>
      
    </FlexBetween>
  );
};

export default BoxHeader;
