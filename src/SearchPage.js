import React from "react";
import "./SearchPage.css";
import { lines, claimsSel, secondary } from "./metaconfig";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import CheckBoxes from "./components/Checkboxes";
import Search from "./components/Search";
import SearchResults from "./components/SearchResults.js";
import Messages from "./components/Messages";
import { Spinner } from "react-bootstrap";
import Button from "@material-ui/core/Button";

import {
  Container,
  FormControl,
  FormGroup,
  FormLabel,
  ButtonGroup,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const SearchPage = ({ config, store, messageStore }) => {
  async function updateAgency(row) {
    const url = `${config.api_url}/agency-location`;
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
  }
  async function save(e) {
    e.preventDefault();
    if (store.active) {
      await updateAgency(store.active);
    } else {
      store.active = null;
    }
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
      <form onSubmit={save}>
        {store.fetching ? (
          <Spinner animation="border" role="status"></Spinner>
        ) : store.matches.length > 0 ? (
          <div>
            <Messages messageStore={messageStore} />
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
            <FormControl component="fieldset"  className={classes.formControl}>
              {lines.map((claims, key) => (
                <CheckBoxes
                  store={store}
                  key={key}
                  data={claims}
                  indicators={toJS(store.active)["dl_selections"]}
                  //updateIndicators={(event) => updateInds(event)}
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
                    indicators={toJS(store.active)["dl_selections"]}
                    //updateIndicators={(event) => updateInds(event)}
                  />
                ))}
              {secondary.map((claims, key) => (
                <CheckBoxes
                  store={store}
                  key={key}
                  data={claims}
                  indicators={toJS(store.active)["dl_selections"]}
                  //updateIndicators={(event) => updateInds(event)}
                  type="radio"
                />
              ))}
              <ButtonGroup>
                <Button variant="contained" color="primary" type="submit">
                  Save
                </Button>
                <Button variant="contained" color="secondary">
                  Cancel
                </Button>
              </ButtonGroup>
            </FormControl>
            </Grid>
            </Grid>
        )}
      </form>
    </Container>
  );
};

export default observer(SearchPage);
