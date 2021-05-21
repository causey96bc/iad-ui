import React, { useState } from "react";
import "./SearchPage.css";
import {lines, claimsSel, secondary } from "./metaconfig";
import { observer } from "mobx-react-lite";
import { toJS } from 'mobx'
import CheckBoxes from "./components/Checkboxes";
import Search from "./components/Search";
import SearchResults from "./components/SearchResults.js";


const SearchPage = ({config, store}) => {
  console.log("do i Render?");
  console.log("active", toJS(store.active));
  // const updateCheckboxes = (e) => {
  //   e.preventDefault(); 
  //   // indicators = {}
  //   // form reset
  //   // console.log("you saved your selections", indicators);
  // }

  return (
    <main className="container searchBar">
      <div className="d-flex">
        <Search config={config} store={store}/>
      </div>
      <form>
        {store.matches.length > 0 ? 
        <div>
         <SearchResults store={store} config={config}/> 
        </div>
        :<></>}
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
