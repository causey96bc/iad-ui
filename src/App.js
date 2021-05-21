import './App.css';
import  React from "react";
import SearchStore  from "./SearchStore.js";
import User from './components/User';
import  SearchPage  from "./SearchPage";
function App({config}) {
  const store = new SearchStore();
  // const [user, setUser] = useState({})
  return (
    <div className="App">
      <main className="container">
      <div className= "row"> 
      <User/>
      <SearchPage config={config} store={store}/>
      </div>
      </main>
    </div>
  );
}

export default App;
