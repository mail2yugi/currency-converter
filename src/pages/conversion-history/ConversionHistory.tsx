import "./ConversionHistory.scss";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/ReduxHooks";
import { deleteConversionHistoryById, setQueryObject } from "../../actions/CurrencyConverterActions";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { ConversionHistoryModel } from "../../store/CurrencyConverterStore";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const ConversionHistory = () => {
  const dispatch = useAppDispatch();
  const conversionHistory: Array<ConversionHistoryModel> = useAppSelector(
    (state) => state.currencyConverter.conversionHistory || []
  );

  return (
    <React.Fragment>
      <h1>Conversion History</h1>
      <Grid container spacing={1} style={{ marginTop: "1rem" }}>
        <Grid item xs={12} style={{ marginBottom: "1rem" }}>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell className="table-head">Date</TableCell>
                  <TableCell className="table-head">Exchange Rate</TableCell>
                  <TableCell className="table-head">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {conversionHistory?.map((row: any) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    className="table-row"
                  >
                    <TableCell component="th" scope="row">
                      {" "}
                      {row.dateTime}{" "}
                    </TableCell>
                    <TableCell>
                      Converted an amout of {row.amount} from {row.from} to{" "}
                      {row.to}
                    </TableCell>
                    <TableCell>
                      <Grid container spacing={1}>
                        <Grid item xs={3}>
                          <Grid
                            container
                            spacing={1}
                            className="action-view"
                            component={Link}
                            to="/"
                            onClick={() => dispatch(setQueryObject(row))}
                          >
                            <Grid item xs={4}>
                              <VisibilityIcon></VisibilityIcon>
                            </Grid>
                            <Grid item xs={6}>
                              View
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={7}>
                          <Grid container spacing={1} className="action-del" onClick={() => dispatch(deleteConversionHistoryById(row.id))}>
                            <Grid item xs={2}>
                              <DeleteForeverIcon></DeleteForeverIcon>
                            </Grid>
                            <Grid item xs={10}>
                              Delete from history
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </TableCell>
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

export default ConversionHistory;
