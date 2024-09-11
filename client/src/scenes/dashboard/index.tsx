import DashboardBox from "@/components/DashboardBox";
import { Box, useMediaQuery, Typography } from "@mui/material";
import PortfolioTable from "./PortfolioTable";
import PerformanceTable from "./PerformanceTable";
import FundamentalTable from "./FundamentalTable";
import Upload from "./TransactionUpload";
import { useSelector } from "react-redux";
import { useGetPortfolioQuery, useGetTransactionQuery } from "@/state/api";
import { Palette } from "@mui/icons-material";
import { useTheme } from "@mui/material";
import PortfolioTableCollapsible from "./PortfolioTableCollapsible";
import Welcome from "./Welcome";
import { useMemo } from "react";
import BoxHeader from "@/components/BoxHeader";

const gridTemplateLargeScreen = `
  "w w w w w w"
  "p p p p p p"
  "s s y y z z"
  "a a a a a a"
  "a a a a a a"
  "a a a a a a"
  "a a a a a a"
  "a a a a a a"
  "b b b b b b"
  "b b b b b b"
  "b b b b b b"
  "c c c c c c"
  "c c c c c c"
  "c c c c c c"
  "c c c c c c"
`;

// const gridTemplateSmallScreen = `
//   "w"
//   "p"
//   "p"
//   "p"
//   "a"
//   "a"
//   "a"
//   "b"
//   "b"
//   "b"
//   "c"
//   "c"
//   "c"
// `;

const Dashboard = () => {
  // object destructuring
  const { palette } = useTheme();
  const userId = useSelector((state) => state.auth.user._id);
  const userName = useSelector((state) => state.auth.user.name);

  const { data } = useGetPortfolioQuery(userId);
  const portfolioData = useMemo(() => data, [data]);

  if (!portfolioData) {
    return <Typography sx={{ color: "white" }}>Loading...</Typography>;
  }

  const symbols = portfolioData.map((item) => item.symbol);
  const symbolsString = symbols.join(",");
  const totalCostBasicSum = portfolioData.reduce(
    (sum, item) => sum + item.totalCostBasic,
    0
  );
  const totalValueSum = portfolioData.reduce(
    (sum, item) => sum + item.totalValue,
    0
  );
  const totalGainLoss = (totalValueSum - totalCostBasicSum) ;
  const totalPercentGainLoss = (totalGainLoss * 100) / totalCostBasicSum;

  return (
    <Box
      width="100%"
      height="100%"
      display="grid"
      gap="1.5rem"
      sx={{
        //repeat(3, minmax(370px, 1fr)) -> 3 units on column with size from 370px to 1fr: 1 fractional unit
        gridTemplateColumns: "repeat(6, minmax(60px, 1fr))",
        gridTemplateRows: "repeat(100, minmax(70px, 1fr))",
        gridTemplateAreas: gridTemplateLargeScreen,
      }}
    >
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
      </DashboardBox>

      <DashboardBox gridArea="s">
        <Box
          mt="0.25 rem"
          p="0 0.5rem"
          display="flex"
          flexDirection="column"
          sx={{
            height: "80%",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4" align="center" color={palette.grey[300]}>
            Portfolio Cost Basic
          </Typography>
          <Typography
            variant="h4"
            align="center"
            style={{ color: palette.primary.main }}
          >
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalCostBasicSum)}
          </Typography>
        </Box>
      </DashboardBox>

      <DashboardBox gridArea="y">
        <Box
          mt="0.25 rem"
          p="0 0.5rem"
          display="flex"
          flexDirection="column"
          sx={{
            height: "80%",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4" align="center" color={palette.grey[300]}>
            Portfolio Current Value
          </Typography>
          <Typography
            variant="h4"
            align="center"
            style={{ color: palette.primary.main }}
          >
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalValueSum)}
          </Typography>
        </Box>
      </DashboardBox>


      <DashboardBox gridArea="z">
        <Box
          mt="0.25 rem"
          p="0 0.5rem"
          display="flex"
          flexDirection="column"
          sx={{
            height: "80%",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4" align="center" color={palette.grey[300]}>
            Portfolio Gain Loss
          </Typography>
          <Typography
            variant="h4"
            align="center"
            style={{ color: palette.primary.main }}
          >
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalGainLoss)} | {totalPercentGainLoss.toFixed(2)}% 
          </Typography>
        </Box>
      </DashboardBox>

      <Upload userName={userName} />

      <PortfolioTableCollapsible
        userName={userName}
        portfolioData={portfolioData}
      />
      <PerformanceTable symbols={symbolsString} />
      <FundamentalTable symbols={symbolsString} />
    </Box>
  );
};

export default Dashboard;
