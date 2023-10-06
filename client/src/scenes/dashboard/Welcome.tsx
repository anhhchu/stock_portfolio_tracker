import DashboardBox from "@/components/DashboardBox";
import React from "react";
import { Typography } from "@mui/material/Typography";
import { useTheme } from "@mui/material";

const Welcome = ({ userName: string }) => {
  const { palette } = useTheme();

  return (
    <>
      <DashboardBox gridArea="w">
        <Typography
          variant="h2"
          color={palette.grey[300]}
          align="center"
          alignContent="center"
          justifyContent="center"
        >
          Welcome{" "}
          <span style={{ color: palette.primary.main, fontWeight: "bold" }}>
            {userName}
          </span>
        </Typography>
        <Typography
          variant="h5"
          color={palette.grey[300]}
          align="center"
          style={{ fontStyle: "italic" }}
        >
          find your portfolio below
        </Typography>
      </DashboardBox>
      ;
    </>
  );
};

export default Welcome;
