import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from "react-redux"
import { store } from './redux/store';
import {createGlobalStyle, ThemeProvider} from 'styled-components';


const GlobalStyle = createGlobalStyle`
  body{
      margin:0;
      color: rgb(255, 255, 255);
    }
  #root{
    background-color: #131313;
    font-family: 'Roboto', sans-serif;
    height: 100vh;
  }
  html {
  overflow: scroll;
  overflow-x: hidden;
  }
  ::-webkit-scrollbar {
    width: 0; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
  }
`


export const theme = {
  pc: "#282828",
  sc: "#B0B0B0",
  tc: "#181818",
  qc: "#535353",
  w: "#FFFFFF",
  ts: "#A9A9A9",
  NavIconSize: "1.8rem",
  buttonFollow:"#61787F",
  buttonFcolor: '#E5E8EA',
  spotifyC: "#1ed760",
};

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Router>
      <GlobalStyle />
        <App />
      </Router>
    </Provider>
    </ThemeProvider>,
  document.getElementById('root')
)