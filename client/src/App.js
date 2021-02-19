
import React, { Component } from 'react';
import './App.css';
import {HashRouter, Route} from 'react-router-dom';
import Home from './components/Home';
import Search from './components/Search'
import Register from './components/Register';
import Login from './components/Login';
class App extends Component {
  render(){
    return(
      <HashRouter>
        <Route path="/" component={Home} exact={true}/>
        <Route path="/search" component={Search} exact={true}/>
        <Route path="/login" component={Login} exact={true}/>
        <Route path="/register" component={Register} exact={true}/>
      </HashRouter>
    )
  }
}

export default App;
