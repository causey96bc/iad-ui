import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import {
  Checkbox,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Grid,
  TablePagination,
  Box,
  makeStyles,
} from "@material-ui/core";
const SearchResults = ({ store }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    console.log("e", newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };
  const hoveredStyle = {
    cursor: "pointer",
  };
  const useStyles = makeStyles((theme) => ({
    tableRow: {
      "&$hover:hover": {
        backgroundColor: "#f2f2f2",
      },
    },
    hover: {},
  }));
  const classes = useStyles();
  return (
    <>
      <span>
        <h4>Agencies</h4>
      </span>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={8}>
          <Table size={"small"}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>Code</TableCell>
                <TableCell>Account</TableCell>
                <TableCell>Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {store.matches
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, key) => (
                  <TableRow
                    selected={store.active.agency_code === row.agency_code}
                    hover
                    className={classes.tableRow}
                    style={hoveredStyle}
                    onClick={() => {
                      store.setActive(row);
                    }}
                  >
                    <TableCell>
                      <Checkbox
                        onChange={() => {
                          store.setActive(row);
                        }}
                      />
                    </TableCell>
                    <TableCell>{row.agency_code}</TableCell>
                    <TableCell>{row.agency_name}</TableCell>
                    <TableCell>{row.ivans_account}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={store.getMatches}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <div className="details">
            <h4>Additional information</h4>
            {store.hasActive && (
              <Grid container>
                <Box color="text.primary">
                  Address: {store.active.address.line_1},{" "}
                  {store.active.address.city}, {store.active.address.state}{" "}
                  {store.active.address.zip}
                </Box>
                <Grid item>
                  <Box>Phone: {store.active.phone_number}</Box>
                  <Box>Last Update: {store.active.last_upd_date}</Box>
                  <Box>Machine Address: {store.active.ibm_machine_address}</Box>
                </Grid>
              </Grid>
            )}
          </div>
        </Grid>
      </Grid>
    </>
  );
};
export default observer(SearchResults);
