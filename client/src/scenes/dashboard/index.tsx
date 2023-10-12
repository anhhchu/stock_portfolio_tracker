import DashboardBox from "@/components/DashboardBox";
import { Box, useMediaQuery, Typography } from "@mui/material";
import PortfolioTable from "./PortfolioTable";
import Row2 from "./PerformanceTable";
import Row3 from "./FundamentalTable";
import Upload from "./TransactionUpload";
import { useSelector } from "react-redux";
import { useGetPortfolioQuery, useGetTransactionQuery } from "@/state/api";
import { Palette } from "@mui/icons-material";
import { useTheme } from "@mui/material";
import PortfolioTableCollapsible from "./PortfolioTableCollapsible";
import Welcome from "./Welcome";

const gridTemplateLargeScreen = `
  "w w w w w w"
  "p p p p p p"
  "p p p p p p"
  "s s y y z z"
  "s s y y z z"
  "a a a a a a"
  "a a a a a a"
  "a a a a a a"
  "a a a a a a"
  "a a a a a a"
  "a a a a a a"
  "a a a a a a"
  "b b b b b b"
  "b b b b b b"
  "b b b b b b"
  "b b b b b b"
  "b b b b b b"
  "c c c c c c"
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

  const { data: portfolioData } = useGetPortfolioQuery(userId);
  if (!portfolioData) {
    return <Typography sx={{ color: "white" }}>Loading...</Typography>;
  }

  const symbols = portfolioData.map((item) => item.symbol);
  // const uniqueSymbols = [...new Set(symbols)];
  const symbolsString = symbols.join(",");

  return (
    <Box
      width="100%"
      height="100%"
      display="grid"
      gap="1.5rem"
      sx={{
        //repeat(3, minmax(370px, 1fr)) -> 3 units on column with size from 370px to 1fr: 1 fractional unit
        gridTemplateColumns: "repeat(3, minmax(370px, 1fr))",
        gridTemplateRows: "repeat(20, minmax(60px, 1fr))",
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

      <Upload userName={userName} />

      <PortfolioTableCollapsible
        userName={userName}
        portfolioData={portfolioData}
      />
      <Row2 symbols={symbolsString} />
      <Row3 symbols={symbolsString} />
    </Box>
  );
};

export default Dashboard;
