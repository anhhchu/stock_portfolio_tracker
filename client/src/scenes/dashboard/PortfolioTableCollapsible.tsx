import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DashboardBox from "@/components/DashboardBox";
import { useTheme } from "@mui/material";
import BoxHeader from "@/components/BoxHeader";



const PortfolioTableCollapsible = ({ userName, portfolioData }) => {
  console.log("Portfolio Data:", portfolioData);
  const { palette } = useTheme();

  function Row(props: { row }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
  
    const handleClick = () => {
      setOpen(!open);
    };
  
    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={handleClick}
              style={{ color: palette.primary.main }}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.symbol}
          </TableCell>
          <TableCell align="right" >{row.totalQuantity}</TableCell>
          <TableCell align="right">{row.price}</TableCell>
          <TableCell align="right">{row.totalCostBasic.toFixed(2)}</TableCell>
          <TableCell align="right">{row.totalValue.toFixed(2)}</TableCell>
          <TableCell align="right">{row.totalGainLoss.toFixed(2)}</TableCell>
          <TableCell align="right">{row.averagePercentGainLoss.toFixed(2)}%</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
            <Collapse in={open} timeout="auto" >
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div" color={palette.primary.main}>
                  Transaction History
                </Typography>
                <Table size="small" aria-label="transations" >
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell align="right">Cost Per Share</TableCell>
                      <TableCell align="right">Cost Basic ($)</TableCell>
                      <TableCell align="right">Value ($)</TableCell>
                      <TableCell align="right">Gain Loss ($)</TableCell>
                      <TableCell align="right">Gain Loss (%)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {console.log('transactions:',row.transaction)}
                    {[...row.transaction].sort((a, b) => b.date.localeCompare(a.date)).map((trans) => (
                      <TableRow key={trans._id}>
                        <TableCell component="th" scope="row">
                          {trans.date}
                        </TableCell>
                        <TableCell>{trans.quantity}</TableCell>
                        <TableCell align="right">{trans.costPerShare}</TableCell>
                        <TableCell align="right">{trans.costBasic.toFixed(2)}</TableCell>
                        <TableCell align="right">{trans.totalValue.toFixed(2)}</TableCell>
                        <TableCell align="right">{trans.totalGainLoss.toFixed(2)}</TableCell>
                        <TableCell align="right">
                          {trans.percentGainLoss.toFixed(2)}%
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  return (
    <DashboardBox gridArea="a">
      <BoxHeader title={`Portfolio`} sidetext={`Last refreshed: 2023-10-13`} />
      <Box
        mt="0.25 rem"
        p="0 0.5rem"
        sx={{
          height: "80%",
          width: "100%",
          // "& .MuiTableRow-head": { color: palette.grey[300], border: `0.1px` },
          "& .MuiTableCell-root": { color: palette.grey[300], border: `0.1px` },
          "& .MuiTableCell-body": {
            borderBottom: `0.1px solid ${palette.grey[300]}`,
          },
        }}
      >
        <TableContainer style={{ maxHeight: 500, overflow: 'auto' }}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow style={{ borderBottom: '2px solid white' }}>
                <TableCell />
                <TableCell>Symbol</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Cost Basic</TableCell>
                <TableCell align="right">Total Value</TableCell>
                <TableCell align="right">Total Gain Loss ($)</TableCell>
                <TableCell align="right">Total Gain Loss (%)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {portfolioData.map((row) => (
                <Row row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </DashboardBox>
  );
};

export default PortfolioTableCollapsible;
