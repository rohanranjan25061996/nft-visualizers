import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './polyfill'
import {MoralisProvider} from "react-moralis"

const AppId = process.env.REACT_APP_MORALIS_AAP_ID;
const ServerURL = process.env.REACT_APP_MORALIS_SERVER_URL;

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider appId = {AppId} serverUrl = {ServerURL}>
    <App />
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById('root')
);