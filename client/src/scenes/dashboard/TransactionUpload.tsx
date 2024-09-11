import DashboardBox from "@/components/DashboardBox";
import { useGetTransactionQuery } from "@/state/api";
import React from "react";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import { useMemo } from "react";
import { useTheme } from "@mui/material";
import BoxHeader from "@/components/BoxHeader";
import TransactionForm from "@/components/TransactionForm";

const Upload = ( {userName}) => {
  const { palette } = useTheme();

  return (
    // use empty tag to create React Fragment
    <>
      <DashboardBox gridArea="p">

        <Box
          mt="1 rem"
          p="0 1rem"
          display="flex"
          // flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            height: "100%",
            width: "100%",
            "& .MuiInputBase-root": {
              color: palette.grey[300],
              borderColor: "white",
            },
          }}
        >
          <TransactionForm />
        </Box>
      </DashboardBox>
    </>
  );
};

export default Upload;
