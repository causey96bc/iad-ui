import React, { useState } from "react";
import { searchKeys } from "../metaconfig";

import {
  TextField,
  Button,
  FormControl,
  NativeSelect,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const Search = ({ config, store, messageStore }) => {
  const [searchKey, setSearchKey] = useState("ivans_account");
  const [searchStr, setSearchStr] = useState("");

  const searchData = async (event) => {
    event.preventDefault();
    store.setHasSearched(true)
    const url = `${config.api_url}/agency-location?search-key=${searchKey}&search-str=${searchStr}`;
    const results = await fetch(url, {
      headers: {
        Authorization: "Bearer 1234",
      },
    });
    store.setFetching(true);
    const data = await results.json();
    setTimeout(() => {
      if (data && data.data) {
        store.setMatches(data.data);
      } else {
        store.setMatches([]);
      }
      store.setFetching(false);
    }, 500);
    messageStore.addMessages("test message 1");
    messageStore.addMessages("test message 2");
    messageStore.addMessages("test message 3");
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
              <option  value={machine_name} key={key}>
                {human_name}
              </option>
            );
          })}
        </NativeSelect>
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField
          onChange={(e) => setSearchStr(e.target.value)}
        />
      </FormControl >
      <FormControl className={classes.formControl}>
        <Button variant="contained" color="primary" type="submit">
          Search
        </Button>
      </FormControl>
    </form>
  );
};

export default Search;
