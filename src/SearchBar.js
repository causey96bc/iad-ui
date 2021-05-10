import React, { useState } from "react";
import "./SearchBar.css";

import { searchKeys, lines, claimsSel, secondary } from "./metaconfig";
import CheckBoxes from "./Checkboxes";

const SearchBar = (event) => {
  const [filter, setFilter] = useState("agency_name");
  const [searchStr, setSearchStr] = useState("");
  const [matches, setMatches] = useState([]);
  let indicators = {};
  let searchString = "";
  let results = [
    {
      agency_code: "021048",
      agency_name: "PCF INS SVS DBA CAPITAL WEST  ",
      ivans_account: "YD6X2",
    },
    {
      agency_code: "021048005",
      agency_name: "PCF INS SVS DBA CAPITAL WEST  ",
      ivans_account: "YD6X2",
    },
    {
      agency_code: "021048010",
      agency_name: "PCF INS SVS DBA CAPITAL WEST  ",
      ivans_account: "        ",
    },
    {
      agency_code: "021048013",
      agency_name: "PCF INS SVS DBA CAPITAL WEST  ",
      ivans_account: "YD6X2",
    },
    {
      agency_code: "100338",
      agency_name: "PCF INSURANCE SVS OF THE WEST ",
      ivans_account: "YD6X2",
    },
    {
      agency_code: "100338002",
      agency_name: "PCF INSURANCE SVS OF THE WEST ",
      ivans_account: "YD6X2",
    },
    {
      agency_code: "100338003",
      agency_name: "PCF INSURANCE SVS OF THE WEST ",
      ivans_account: "YD6X2",
    },
    {
      agency_code: "100338005",
      agency_name: "PCF INSURANCE SVS OF THE WEST ",
      ivans_account: "YD6X2",
    },
    {
      agency_code: "100338013",
      agency_name: "PCF INSURANCE SVS OF THE WEST ",
      ivans_account: "YD6X2",
    },
  ];

  const search = (event) => {
    event.preventDefault();
    // let finding = results.find(result => (result[filter] === searchStr))
    const matches = results.filter((result) => {
      result.checked = false;
      return result[filter].includes(searchStr);
    });
    console.log(matches, "matches");
    setMatches(matches);
  };

  const searchHandler = (event, searchStr) => {
    let input = event.target.value;
    searchStr = input;
    setSearchStr(searchStr);
  };
  const updateInds = (event) => {
    if (event.target.type === "checkbox") {
      indicators[event.target.name] =
        event.target.checked  ? true : false;
    } else indicators[event.target.name] = event.target.value;
        console.log("ind", indicators);
  };
  const save = (e) => {
    e.preventDefault()  
    // indic
    // indicators = {}
    // result = []
    console.log("you saved your selections", indicators);
  }

  return (
    <main className="container searchBar">
      <div className="d-flex">
        <form className="form-group" onSubmit={search}>
        <div class="row results">
         <div class="locations col row">
          <div className="input-group">
            <div className="input-group-text">Search By</div>
            <select
              className="input-group-text"
              onChange={(event) => {
                setFilter(event.target.value);
              }}
            >
              {searchKeys.map((searchKey, key) => {
                const [machine_name, human_name] = searchKey;
                return (
                  <option value={machine_name} key={key}>
                    {human_name}
                  </option>
                );
              })}
            </select>
            <input
              className="form-control"
              onChange={searchHandler}
              placeholder="type part of the search key and press ENTER"
            />
            <button className="btn btn-primary" type="submit">
              Search
            </button>
          </div>
          </div>
          </div>
        </form>
      </div>
      <form onSubmit={save}>
      <div class="row results">
        <div class="locations col row">
          <span>
            <h4>Agencies</h4>
          </span>
          <table class="table table-sm table-hover table-borderless">
            <thead>
              <th>
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="locations-sel-all"
                  title="select all"
                />
              </th>
              <th>
                <label for="locations-sel-all" class="form-check-label">
                  code
                </label>
              </th>
              <th>
                <label for="locations-sel-all" class="form-check-label">
                  account
                </label>
              </th>
              <th>
                <label for="locations-sel-all" class="form-check-label">
                  name
                </label>
              </th>
            </thead>
            <tbody>
              {/* {#each result.result as [code, name, account], index (index)} */}
              {matches.map((result) => {
                return (
                  <tr>
                    <td>
                      <input type="checkbox" class="form-check-input" />
                    </td>

                    {Object.keys(result).map((item) => {
                      return <td>{result[item]}</td>;
                    })}
                  </tr>
                );
              })}
              <tr>
                <td>
                  <input type="checkbox" class="form-check-input" />
                </td>
                <td>
                  <label class="form-check-label"></label>
                </td>
                <td>
                  <label class="form-check-label"></label>
                </td>
                <td>
                  <label class="form-check-label"></label>
                </td>
              </tr>
              <tr>
                <td colspan="4">Search for something.</td>
              </tr>
            </tbody>
          </table>
          </div>
          <div class="col details">
          <h4>Agency Details</h4>
          <div class="details">Some details ... from IVANS/PMACS/AIDB</div>
          </div>
          <div className="row selections">
              <div className="services col">
              {lines.map((claims) => (
                <CheckBoxes
                  data={claims}
                  indicators={indicators}
                  updateIndicators={(event) => updateInds(event)}
                />
              ))}
            <div className="secondary col">
            {claimsSel.map((claims) => (
            <CheckBoxes
              data={claims}
              indicators={indicators}
              updateIndicators={(event) => updateInds(event)}
            />
          ))}
          </div>
          
          {secondary.map((claims) => (
            <CheckBoxes
              data={claims}
              indicators={indicators}
              updateIndicators={(event) => updateInds(event)}
              type="radio"
            />
          ))}
          </div>
        </div>
      
      <button onClick={save}>Save!</button>
      </div>
      </form>
    </main>
  );
};

export default SearchBar;
