import './App.css';
import  React, {useState}  from "react";
import User from './components/User';
import  SearchPage  from "./SearchPage";
function App({config}) {
  const [user, setUser] = useState({})
  return (
    <div className="App">
      <main className="container">
      <div className= "row"> 
      <User user={user}/>
      <SearchPage config={config}/>
      </div>
      </main>
    </div>
  );
}

export default App;
