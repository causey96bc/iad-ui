import React, { useState } from "react";
import { searchKeys } from "../metaconfig";
const Search = ({ config, store, messageStore }) => {
  const [searchKey, setSearchKey] = useState("ivans_account");
  const [searchStr, setSearchStr] = useState("");

  const searchData = async (event) => {
    event.preventDefault();
    const url = `${config.api_url}/agency-location?search-key=${searchKey}&search-str=${searchStr}`;
    const results = await fetch(url, {
      headers: {
        Authorization: "Bearer 1234",
      },
    });
    store.setSearching(true)
    const data = await results.json();
    setTimeout(() => {
      if (data && data.data) {
        store.setMatches(data.data);
      } else {
        store.setMatches([]);
      }
      store.setSearching(false)
    }, 1000);
    messageStore.addMessages("test message 1");
    messageStore.addMessages("test message 2");
    messageStore.addMessages("test message 3");
  };

  return (
    <form className="form-group" onSubmit={searchData}>
      <div className="row results">
        <div className="locations col row">
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
              onChange={(e) => setSearchStr(e.target.value)}
              placeholder="type part of the search key and press ENTER"
            />
            <button className="btn btn-primary" type="submit">
              Search
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Search;
