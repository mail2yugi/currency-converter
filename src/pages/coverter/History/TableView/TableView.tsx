import React from "react";
import { Grid } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";

interface TableViewProps {
  history: Array<any>;
  statistics: Array<any>;
}

const TableView = (props: TableViewProps) => {
  return (
    <React.Fragment>
      <Grid
        container
        spacing={1}
        style={{ marginTop: "1rem", marginBottom: "1rem" }}
      >
        <Grid item xs={6}>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell className="table-head">Date</TableCell>
                  <TableCell className="table-head">Exchange Rate</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.history?.map((row: any) => (
                  <TableRow
                    key={row.label}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.label}
                    </TableCell>
                    <TableCell>{row.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={5}>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell className="table-head">Statistics</TableCell>
                  <TableCell className="table-head"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.statistics?.map((row: any) => (
                  <TableRow
                    key={row.label}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.label}
                    </TableCell>
                    <TableCell>{row.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default TableView;
