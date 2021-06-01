import React from "react";
import { lines, claimsSel, secondary } from "./metaconfig";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import CheckBoxes from "./Checkboxes";
import Search from "./Search";
import SearchResults from "./SearchResults.js";
import { messageStore } from "./Messages";

import {
  Button,
  CircularProgress,
  Container,
  FormControl,
  makeStyles,
  Grid,
} from "@material-ui/core";

const SearchPage = ({ config, store }) => {
  async function updateAgency() {
    const url = `${config.api_url}/agency-location`;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer 1234",
        },
        body: JSON.stringify(store.active),
      });

      const json = await response.json();
      return json;
    } catch (error) {
      messageStore.addMessage({
        type: "error",
        text: "There was an error when processing your selections. Please start over and try again.",
      });
    }
  }
  async function save(e) {
    e.preventDefault();
    if (store.active) {
      await updateAgency(store.active);
      messageStore.addMessage({
        type: "success",
        text: "You have saved your download selections successfuly!",
      });
    }
    // reset form after saving
    reset(e);
  }

  function reset(e) {
    const form = e.target;
    form.reset();
    store.setActive({});
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
    },
  }));
  const classes = useStyles();

  return (
    <Container container>
      <Search config={config} store={store} />
      <form id="download-selection" onSubmit={save} onReset={reset}>
        {store.fetching ? (
          <CircularProgress color="secondary" />
        ) : store.matches.length > 0 ? (
          <div>
            <SearchResults store={store} config={config} />
          </div>
        ) : store.hasSearched ? (
          <p>No matches found</p>
        ) : (
          <></>
        )}
        {store.hasActive && (
          <Grid container spacing={2}>
            <Grid item md={6}>
              <FormControl component="fieldset" className={classes.formControl}>
                {lines.map((claims, key) => (
                  <CheckBoxes
                    store={store}
                    key={key}
                    data={claims}
                    indicators={toJS(store.active)["dl_selections"]}
                  />
                ))}
              </FormControl>
            </Grid>
            <Grid item md={6}>
              <FormControl component="fieldset" className={classes.formControl}>
                {claimsSel.map((claims, key) => (
                  <CheckBoxes
                    store={store}
                    key={key}
                    data={claims}
                    type="radio"
                    indicators={toJS(store.active)["dl_selections"]}
                  />
                ))}
                {secondary.map((claims, key) => (
                  <CheckBoxes
                    store={store}
                    key={key}
                    data={claims}
                    indicators={toJS(store.active)["dl_selections"]}
                  />
                ))}
                <Button variant="contained" color="primary" type="submit">
                  Save
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  type="reset"
                >
                  Cancel
                </Button>
              </FormControl>
            </Grid>
          </Grid>
        )}
      </form>
    </Container>
  );
};

export default observer(SearchPage);
