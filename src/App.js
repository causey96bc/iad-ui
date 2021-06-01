import React from "react";
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
          <SearchPage config={config} />
        </div>
      </main>
    </div>
  );
}

export default App;
