import React from "react";
import SearchStore from "./stores/SearchStore.js";
import User from "./components/User";
import SearchPage from "./components/SearchPage";
import MessageStore from "./stores/MessageStore";
import Messages from "./components/Messages";
function App({ config }) {
  const store = new SearchStore();
  const messageStore = new MessageStore();
  return (
    <div className="App">
      <main className="container">
        <div className="row">
          <User />
          <Messages messageStore={messageStore} />
          <SearchPage
            config={config}
            store={store}
            messageStore={messageStore}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
