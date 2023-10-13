import DashboardBox from "@/components/DashboardBox";
import { useGetPerformanceQuery, useGetTransactionQuery } from "@/state/api";
import React from "react";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import { useMemo } from "react";
import { useTheme } from "@mui/material";
import BoxHeader from "@/components/BoxHeader";

const PerformanceTable = ({ symbols }) => {
  const { palette } = useTheme();

  const { data } = useGetPerformanceQuery(symbols);
  const performanceData = useMemo(() => data, [data]);  

  const performanceCols: GridColDef[] = [
    {
      field: "symbol",
      headerName: "Symbol",
      type: "string",
      flex: 0.5,
    },
    {
      field: "1D",
      headerName: "1D",
      type: "number",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `${params.value.toFixed(2)}%`,
    },
    {
      field: "5D",
      headerName: "5D",
      type: "number",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `${params.value.toFixed(2)}%`,
    },
    {
      field: "1M",
      headerName: "1M",
      type: "number",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `${params.value.toFixed(2)}%`,
    },
    {
      field: "3M",
      headerName: "3M",
      type: "number",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `${params.value.toFixed(2)}%`,
    },
    {
      field: "6M",
      headerName: "6M",
      type: "number",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `${params.value.toFixed(2)}%`,
    },
    {
      field: "ytd",
      headerName: "YTD",
      type: "number",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `${params.value.toFixed(2)}%`,
    },
    {
      field: "1Y",
      headerName: "1Y",
      type: "number",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `${params.value.toFixed(2)}%`,
    },
    {
      field: "3Y",
      headerName: "3Y",
      type: "number",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `${params.value.toFixed(2)}%`,
    },
    {
      field: "5Y",
      headerName: "5Y",
      type: "number",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `${params.value.toFixed(2)}%`,
    },
    {
      field: "10Y",
      headerName: "10Y",
      type: "number",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `${params.value.toFixed(2)}%`,
    },
    {
      field: "max",
      headerName: "Max",
      type: "number",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `${params.value.toFixed(2)}%`,
    },
  ];
  return (
    // use empty tag to create React Fragment
    <>
      <DashboardBox gridArea="b">
        <BoxHeader
          title="Performance"
          sidetext={`Last refreshed: 2023-10-13`}
        />

        <Box
          mt="0.5rem"
          p="0 0.5rem"
          sx={{
            height: "75%",
            width: "100%",
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
            rows={performanceData || []}
            columns={performanceCols}
          />
        </Box>
      </DashboardBox>
    </>
  );
};

export default PerformanceTable;
