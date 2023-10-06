import DashboardBox from "@/components/DashboardBox";
import { useGetFundamentalQuery, useGetTransactionQuery } from "@/state/api";
import React from "react";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import { useMemo } from "react";
import { useTheme } from "@mui/material";
import BoxHeader from "@/components/BoxHeader";
import { useSelector } from "react-redux";

type Props = {};

const Row3 = ({ symbols }) => {
  const { palette } = useTheme();

  const { data: fundamentalData } = useGetFundamentalQuery(symbols);
  //console.log("data:", fundamentalData);

  const formatNumber = (value: number) => {
    if (value && value !== "") {
      let abbr = "";
      if (Math.abs(value) >= 1e10) {
        value /= 1e10;
        abbr = "T";
      } else if (Math.abs(value) >= 1e9) {
        value /= 1e9;
        abbr = "B";
      } else if (Math.abs(value) >= 1e6) {
        value /= 1e6;
        abbr = "M";
      } else if (Math.abs(value) >= 1e3) {
        value /= 1e3;
        abbr = "K";
      }
      return `${value?.toFixed(2)}${abbr}`;
    } else {
      return "";
    }
  };
  const fundamentalCols: GridColDef[] = [
    {
      field: "symbol",
      headerName: "Symbol",
      type: "string",
      flex: 1,
    },
    {
      field: "cashFlowToDebtRatio",
      headerName: "Cashflow To Debt Ratio",
      type: "number",
      flex: 0.5,
      renderCell: (params: GridCellParams) =>
        params.value && params.value !== "" ? `${params.value.toFixed(2)}` : "",
    },
    {
      field: "debtRatio",
      headerName: "Debt Ratio",
      type: "number",
      flex: 0.5,
      renderCell: (params: GridCellParams) =>
        params.value && params.value !== "" ? `${params.value.toFixed(2)}` : "",
    },
    {
      field: "dividendYield",
      headerName: "Dividend Yield",
      type: "number",
      flex: 0.5,
      renderCell: (params: GridCellParams) =>
        params.value && params.value !== ""
          ? `${(params.value * 100).toFixed(2)}%`
          : "",
    },
    {
      field: "grossProfitMargin",
      headerName: "Gross Profit Margin",
      type: "number",
      flex: 0.5,
      renderCell: (params: GridCellParams) =>
        params.value && params.value !== "" ? `${params.value.toFixed(2)}` : "",
    },
    {
      field: "netProfitMargin",
      headerName: "Net Profit Margin",
      type: "number",
      flex: 0.5,
      renderCell: (params: GridCellParams) =>
        params.value && params.value !== "" ? `${params.value.toFixed(2)}` : "",
    },
    {
      field: "operatingProfitMargin",
      headerName: "Operating Profit Margin",
      type: "number",
      flex: 0.5,
      renderCell: (params: GridCellParams) =>
        params.value && params.value !== "" ? `${params.value.toFixed(2)}` : "",
    },
    {
      field: "priceEarningsRatio",
      headerName: "Earnings Ratio",
      type: "number",
      flex: 0.5,
      renderCell: (params: GridCellParams) =>
        params.value && params.value !== "" ? `${params.value.toFixed(2)}` : "",
    },
    {
      field: "priceEarningsToGrowthRatio",
      headerName: "Earnings To Growth Ratio",
      type: "number",
      flex: 0.5,
      renderCell: (params: GridCellParams) =>
        params.value && params.value !== "" ? `${params.value.toFixed(2)}` : "",
    },
    {
      field: "priceToBookRatio",
      headerName: "Price To Book Ratio",
      type: "number",
      flex: 0.5,
      renderCell: (params: GridCellParams) =>
        params.value && params.value !== "" ? `${params.value.toFixed(2)}` : "",
    },
    {
      field: "marketCapitalization",
      headerName: "Market Cap",
      type: "number",
      flex: 0.5,
      renderCell: (params: GridCellParams) => formatNumber(params.value),
    },
    {
      field: "enterpriseValue",
      headerName: "Enterprise Value",
      type: "number",
      flex: 0.5,
      renderCell: (params: GridCellParams) => formatNumber(params.value),
    },
    {
      field: "fairValue",
      headerName: "fairValue",
      type: "number",
      flex: 0.5,
      renderCell: (params: GridCellParams) => formatNumber(params.value),
    },
    {
      field: "ratingRecommendation",
      headerName: "Rating",
      type: "string",
      flex: 0.5,
      renderCell: (params: GridCellParams) => params.value,
    },
    {
      field: "ratingScore",
      headerName: "Rating Score",
      type: "number",
      flex: 0.5,
      renderCell: (params: GridCellParams) => params.value,
    },
  ];
  return (
    // use empty tag to create React Fragment
    <>
      <DashboardBox gridArea="c">
        <BoxHeader
          title="Fundamental"
          sidetext={`${fundamentalData?.length} companies`}
        />

        <Box
          mt="0.5rem"
          p="0 0.5rem"
          sx={{
            height: "100%",
            width: "100%",
            "& .MuiDataGrid-root": { color: palette.grey[300], border: "none" },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]}`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]}`,
              maxHeight: "180px !important",
            },
            "& .MuiDataGrid-columnHeader": {
              height: "100px !important",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              whiteSpace: "normal",
              lineHeight: "normal",
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
            rows={fundamentalData || []}
            columns={fundamentalCols}
          />
        </Box>
      </DashboardBox>
    </>
  );
};

export default Row3;
