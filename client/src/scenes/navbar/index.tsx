import { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "@/components/FlexBetween";
import PixIcon from "@mui/icons-material/Pix";
import { useDispatch } from "react-redux";
import { setLogout } from "@/state";
import { useNavigate } from "react-router-dom";

type Props = {};

const Navbar = (props: Props) => {
  const { palette } = useTheme();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/");
  };

  return (
    <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette.grey[300]}>
      {/* Left */}
      <FlexBetween gap="0.75rem">
        <PixIcon sx={{ fontSize: "28px" }} />
        <Typography variant="h4" fontSize="16px">
          Portfolier
        </Typography>
      </FlexBetween>
      {/* Right */}
      <FlexBetween gap="2rem">
        <Box sx={{ "&:hover": { color: palette.primary.main } }}>
          <button
            onClick={handleLogout}
            style={{ backgroundColor: "transparent", color: "white", boxShadow: 'none' }}
          >
            Logout
          </button>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Navbar;
