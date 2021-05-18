import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
async function getConfig(){
  const response = await fetch("/config.json")
  const data = await response.json();
  return data
}

(async function() {
  const config = await getConfig();
  ReactDOM.render(
    <React.StrictMode>
      <App config={config}/>
    </React.StrictMode>,
    document.getElementById('root')
  );
  
  reportWebVitals();
})();

