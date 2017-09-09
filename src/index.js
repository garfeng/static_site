import React, {
  Component
} from 'react';
import ReactDOM from 'react-dom';

import './lib';
import './style';
import Setup from './config';

import MainWindow from './components/main_window';

const ExecMainWindow = ()=>{
  const node = document.getElementById("root");
  ReactDOM.render(<MainWindow config={window.config}/>,node);
}

Setup(ExecMainWindow);

/*
const className = window.data.class.SmallName;

const setup = require(`./components/${className}`);

setup.default();
*/