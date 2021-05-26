import { toJS } from "mobx";
import React,{useState} from "react";
import { observer } from "mobx-react-lite";
import {
  Checkbox,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Grid,
  TablePagination
} from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
const SearchResults = ({ store, config }) => {
  const dataRow = toJS(store.matches).map((row, key) => {
    return {
      id: key,
      code: row.agency_code,
      account: row.ivans_account,
      name: row.agency_name,
    };
  });
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
    <span>
    <h4>Agencies</h4>
  </span>    
    <Grid container>
      
      <Grid item xs={12} sm={8}>
        <Table size={"small"}>
        <TableHead>
          <TableRow>
            <TableCell>
              <Checkbox />
            </TableCell>
            <TableCell>code</TableCell>
            <TableCell>account</TableCell>
            <TableCell>name</TableCell>
          </TableRow>
          </TableHead>
          <TableBody>
          {store.matches.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, key) => (
            <TableRow>
              <TableCell>
                <Checkbox
                  onChange={() => {
                    store.setActive(row)
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
          {store.active && (
            <ul>
              <li>Last Update: {store.active.last_upd_date}</li>
              <li>Machine Address: {store.active.ibm_machine_address}</li>
            </ul>
          )}
        </div>
      </Grid>
    </Grid>
    </>
  );
};
export default observer(SearchResults);
