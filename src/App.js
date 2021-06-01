import React from "react";
import SearchStore from "./stores/SearchStore.js";
import User from "./components/User";
import SearchPage from "./components/SearchPage";
import Messages from "./components/Messages";

function App({ config }) {
  return (
    <div className="App">
      <main className="container">
        <div className="row">
          <User />
          <Messages />
          <SearchPage
            config={config}
            store={new SearchStore()}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
