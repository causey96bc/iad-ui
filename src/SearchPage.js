import React, { useState } from "react";
import "./SearchPage.css";
import  User  from "./components/User";
import {searchKeys,lines, claimsSel, secondary } from "./metaconfig";
import CheckBoxes from "./components/Checkboxes";


const SearchPage = ({event, user, config}) => {
  const [searchKey, setSearchKey] = useState("ivans_account")
  const [filter, setFilter] = useState("agency_name");
  const [searchStr, setSearchStr] = useState("");
  const [activeRow, setActiveRow] = useState(null);
  const [matches, setMatches] = useState([]);
  let indicators = {};
  const searchData = async (event) => {
    event.preventDefault()
    const url = `${config.api_url}/agency-location?search-key=${searchKey}&search-str=${searchStr}`;
    const results = await fetch(url);
    const data = await results.json();
    if(data && data.data){
      setMatches(data.data);
      setActiveRow(data.data);
    } else {
      setMatches([]);
      setActiveRow(null);
    }
    console.log("matches", [data.data]);
  }
  const updateInds = (event) => {
    if (event.target.type === "checkbox") {
      indicators[event.target.name] =
        event.target.checked  ? true : false;
    } else indicators[event.target.name] = event.target.value;
        console.log("ind", indicators);
  };
  const updateCheckboxes = (e) => {
    e.preventDefault(); 
    // indicators = {}
    // form reset
    // console.log("you saved your selections", indicators);
  }

  return (
    <main className="container searchBar">
      <div className="d-flex">
        <form className="form-group" onSubmit={searchData}>
          <div class="row results">
            <div class="locations col row">
              <div className="input-group">
                <div className="input-group-text">Search By</div>
                <select
                  className="input-group-text"
                  onChange={(event) => {
                    setSearchKey(event.target.value);
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
                  onChange={e => setSearchStr(e.target.value)}
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
      <form>
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
                {matches.map((row) => (
                  <tr onClick={() => setActiveRow(row)}>
                    <td>
                      <input type="checkbox" class="form-check-input" />
                    </td>
                    <td>{row.agency_code}</td>
                    <td>{row.ivans_account}</td>
                    <td>{row.agency_name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div class="col details">
            <h4>Agency Details</h4>
            <div class="details"><p>Some details ... from IVANS/PMACS/AIDB</p>
            {activeRow && 
              <ul>
                <li>Last Update: {activeRow.last_upd_date}</li>
                <li>Machine Address: {activeRow.ibm_machine_address}</li>
              </ul>
            }
            </div>
          </div>
          {activeRow &&
          <>
          <div className="row selections">
            <div className="services col">
              {lines.map((claims) => (
                <CheckBoxes
                  data={claims}
                  indicators={activeRow.dl_selections}
                  updateIndicators={(event) => updateInds(event)}
                />
              ))}
              <div className="secondary col">
                {claimsSel.map((claims) => (
                  <CheckBoxes
                    data={claims}
                    indicators={activeRow.dl_selections}
                    updateIndicators={(event) => updateInds(event)}
                  />
                ))}
              </div>

              {secondary.map((claims) => (
                <CheckBoxes
                  data={claims}
                  indicators={activeRow.dl_selections}
                  updateIndicators={(event) => updateInds(event)}
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

export default SearchPage;
