import React from 'react';
//import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/MainComponent';

export default class App extends React.Component {
  render(){
  return (
    <BrowserRouter>
      <div>
          <Main/>
      </div>
    </BrowserRouter>
  );
}
}
