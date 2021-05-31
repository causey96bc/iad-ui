import React from "react";
import { lines, claimsSel, secondary } from "./metaconfig";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import CheckBoxes from "./components/Checkboxes";
import Search from "./components/Search";
import SearchResults from "./components/SearchResults.js";
import Messages from "./components/Messages";

import {
  Button,
  CircularProgress,
  Container,
  FormControl,
  makeStyles,
  ButtonGroup,
  Grid,
} from "@material-ui/core";

const SearchPage = ({ config, store, messageStore }) => {
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
      messageStore.handleMessage({
        type: "error",
        text: "There was an error when processing your selections. Please start over and try again.",
      });
    }
  }
  async function save(e) {
    e.preventDefault();
    if (store.active) {
      await updateAgency(store.active);
    } else {
      store.active = null;
    }
    if (messageStore.messageCount !== 0) {
      messageStore.messages.shift();
      messageStore.handleMessage({
        type: "success",
        text: "You have saved your download selections successfuly!",
      });
      setTimeout(() => {
        window.location.reload(true);
      }, 2500);
    }
  }
  function cancel() {
    window.location.reload(true);
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
    },
  }));
  const classes = useStyles();

  return (
    <Container container>
      <Search messageStore={messageStore} config={config} store={store} />
      <form id="download-selection" onSubmit={save}>
        <Messages messageStore={messageStore} />
        {store.fetching ? (
          <CircularProgress color="secondary" />
        ) : store.matches.length > 0 ? (
          <div>
            <SearchResults store={store} config={config} />
          </div>
        ) : store.hasSearched ? (
          <p>no matches found</p>
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
                  onClick={cancel}
                  variant="contained"
                  color="secondary"
                  type="click"
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
