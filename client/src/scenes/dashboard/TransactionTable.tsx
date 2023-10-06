import DashboardBox from "@/components/DashboardBox";
import React from "react";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import { Box, Typography, Button } from "@mui/material";
import { useMemo } from "react";
import { useTheme } from "@mui/material";
import BoxHeader from "@/components/BoxHeader";
import { useState } from "react";
import { useSelector } from "react-redux";
// import TransactionTable from "./TransactionTable";
// import { useGetTransactionQuery } from "@/state/api";

const TransactionTable = ({ userName, transactionData }) => {
  const { palette } = useTheme();
  //console.log("transactionData", transactionData);

  const userId = useSelector((state) => state.auth.user._id);
  const token = useSelector((state) => state.auth.token);

  const transactionCols: GridColDef[] = [
    {
      field: "symbol",
      headerName: "Symbol",
      type: "string",
      flex: 0.5,
    },
    {
      field: "date",
      headerName: "Date",
      type: "string",
      flex: 0.5,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      type: "number",
      flex: 0.5,
    },
    {
      field: "costPerShare",
      headerName: "Cost Per Share",
      type: "number",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "costBasic",
      headerName: "Cost Basic",
      type: "number",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "totalValue",
      headerName: "Total Value",
      type: "number",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "totalGainLoss",
      headerName: "Total Gain/Loss",
      type: "number",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "percentGainLoss",
      headerName: "Percent Gain/Loss",
      type: "number",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `${params.value}%`,
    },
  ];


  return (
    // use empty tag to create React Fragment
    <>
      <DashboardBox gridArea="a">
        <BoxHeader
          title={`Transaction`}
          sidetext={`Last refreshed: 2023-10-01`}
        />

        <Box
          mt="0.25 rem"
          p="0 0.5rem"
          sx={{
            height: "80%",
            width: "100%",
            "& .MuiCheckbox-root": { color: palette.grey[300] },
            "& .MuiDataGrid-root": { color: palette.grey[300], border: "none" },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]}`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]}`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
            "& .MuiDataGrid-menuIconButton": {
              color: palette.grey[300],
            },
            "& .MuiDataGrid-sortIcon": {
              color: palette.grey[300],
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={30}
            hideFooter={true}
            rows={transactionData || []}
            columns={transactionCols}
          />

        </Box>
      </DashboardBox>
    </>
  );
};

export default TransactionTable;
