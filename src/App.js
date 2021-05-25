import './App.css';
import  React from "react";
import SearchStore  from "./SearchStore.js";
import User from './components/User';
import  SearchPage  from "./SearchPage";
import  MessageStore  from "./MessageStore";
function App({config}) {
  const store = new SearchStore();
  const messageStore = new MessageStore()
  // const [user, setUser] = useState({})
  return (
    <div className="App">
      <main className="container">
      <div className= "row"> 
      <User/>
      <SearchPage config={config} store={store} messageStore={messageStore}/>
      </div>
      </main>
    </div>
  );
}

export default App;
