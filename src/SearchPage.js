import React, { useState } from "react";
import "./SearchPage.css";
import { lines, claimsSel, secondary } from "./metaconfig";
import { observer } from "mobx-react-lite";
import { toJS } from 'mobx'
import CheckBoxes from "./components/Checkboxes";
import Search from "./components/Search";
import SearchResults from "./components/SearchResults.js";
import Messages from "./components/Messages";
import { Spinner } from "react-bootstrap";


const SearchPage = ({ config, store, messageStore }) => {
  async function updateAgency(row) {
    const url = `${config.api_url}/agency-location?id=${store.active.agency_code}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 1234"
      },
      body: JSON.stringify(store.active),
    });
    const json = await response.json();
    return json;
  }
  async function save(e) {
    e.preventDefault()
    if (store.active) {
      await updateAgency(store.active)
    }
    else {
      store.active = null
    }
  }
  return (
    <main className="container searchBar">
      <div className="d-flex">
        <Search messageStore={messageStore} config={config} store={store} />
      </div>
      <form onSubmit={save}>
        {store.searching ?
         <Spinner animation="border" role="status"></Spinner> 
         : store.matches.length > 0 ?
          <div>
            <Messages messageStore={messageStore} />
            <SearchResults store={store} config={config} />
          </div>
          : <>
          </>}
        <div>
          {store.hasActive &&
            <>
              <div className="row selections">
                <div className="services col">
                  {lines.map((claims, key) => (
                    <CheckBoxes
                      store={store}
                      key={key}
                      data={claims}
                      indicators={toJS(store.active)["dl_selections"]}
                    //updateIndicators={(event) => updateInds(event)}
                    />
                  ))}
                  <div className="secondary col">
                    {claimsSel.map((claims, key) => (
                      <CheckBoxes
                        store={store}
                        key={key}
                        data={claims}
                        indicators={toJS(store.active)["dl_selections"]}
                      //updateIndicators={(event) => updateInds(event)}
                      />
                    ))}
                  </div>

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
                </div>
              </div>
              <button className="btn btn-primary" type="submit">
                Save
                </button>
            </>
          }
        </div>
      </form>
    </main>
  );
};

export default observer(SearchPage);
