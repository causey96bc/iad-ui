import React from "react";
import {
  CircularProgress,
  Container,
} from "@material-ui/core";
import { observer } from "mobx-react-lite";

import { messageStore } from "./Messages";
import store from "../stores/SearchStore";
import Search from "./Search"
import SearchResults from "./SearchResults"
import Selections from "./Selections";

const SearchPage = ({ config }) => {
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

  return (
    <Container container>
      <Search config={config} />
      <form id="download-selection" onSubmit={save} onReset={reset}>
        {store.fetching ? (
          <CircularProgress color="secondary" />
        ) : store.matches.length > 0 ? (
          <div>
            <SearchResults config={config} />
          </div>
        ) : store.hasSearched ? (
          <p>No matches found</p>
        ) : (
          <></>
        )}
        {store.hasActive && <Selections />}
      </form>
    </Container>
  );
};

export default observer(SearchPage);
