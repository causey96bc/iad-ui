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
  Snackbar,
} from "@material-ui/core";

import MuiAlert from "@material-ui/lab/Alert";

const SearchPage = ({ config, store, messageStore }) => {
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

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
      <Snackbar autoHideDuration={4000}>
        <Alert onClose={handleClose} severity="success">
          <Messages messageStore={messageStore} />
        </Alert>
      </Snackbar>;

      const json = await response.json();
      return json;
    } catch (error) {}
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
          <CircularProgress color="secondary" />
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
