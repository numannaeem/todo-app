import React from 'react'
import Login from './components/LoginComponent';
import Main from './components/MainComponent';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import './App.css';

function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/items' component={Main} />
        <Redirect to='/login' />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
