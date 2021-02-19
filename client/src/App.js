
import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './components/Home';
import Search from './components/Search'
import Register from './components/Register';
import Login from './components/Login';
class App extends Component {
  render(){
    return(
      <BrowserRouter>
        <Route path="/" component={Home} exact={true}/>
        <Route path="/search" component={Search} exact={true}/>
        <Route path="/login" component={Login} exact={true}/>
        <Route path="/register" component={Register} exact={true}/>
      </BrowserRouter>
    )
  }
}

export default App;
