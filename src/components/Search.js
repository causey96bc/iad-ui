import React, { useState } from "react";
import { searchKeys } from "./metaconfig";
import { messageStore } from "./Messages";
import store from "../stores/SearchStore";

import {
  TextField,
  Button,
  FormControl,
  NativeSelect,
  makeStyles,
} from "@material-ui/core";

const Search = ({ config }) => {
  const [searchKey, setSearchKey] = useState("ivans_account");
  const [searchStr, setSearchStr] = useState("");

  const searchData = async (event) => {
    event.preventDefault();
    try {
      store.setHasSearched(true);
      const url = `${config.api_url}/agency-location?search-key=${searchKey}&search-str=${searchStr}`;
      const results = await fetch(url, {
        headers: {
          Authorization: "Bearer 1234",
        },
      });
      store.setFetching(true);
      const data = await results.json();
      setTimeout(() => {
        if (data && data.data.length > 0) {
          store.setMatches(data.data);
          messageStore.addMessage({
            type: "success",
            text: "Search completed",
          });
        } else {
          store.setMatches([]);
          messageStore.addMessage({
            type: "error",
            text: "Search returned no results.",
          });
        }
        store.setFetching(false);
      }, 500);
    } catch (error) {}
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
  }));

  const classes = useStyles();

  return (
    <form
      variant="contained"
      noValidate
      autoComplete="off"
      onSubmit={searchData}
    >
      <FormControl className={classes.formControl}>
        <NativeSelect
          onChange={(event) => {
            setSearchKey(event.target.value);
          }}
          labelId="label"
          id="select"
        >
          {searchKeys.map((searchKey, key) => {
            const [machine_name, human_name] = searchKey;
            return (
              <option value={machine_name} key={key}>
                {human_name}
              </option>
            );
          })}
        </NativeSelect>
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField value={searchStr} onChange={(e) => setSearchStr(e.target.value)} />
      </FormControl>
      <FormControl className={classes.formControl}>
        <Button variant="contained" color="primary" type="submit">
          Search
        </Button>
      </FormControl>
    </form>
  );
};

export default Search;
