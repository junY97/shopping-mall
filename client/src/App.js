
import React, { Component } from 'react';
import './App.css';
import {Route, BrowserRouter} from 'react-router-dom';
import Home from './components/Home';
import Search from './components/Search'
import Register from './components/Register';
import Login from './components/Login';
class App extends Component {
  render(){
    return(
      <BrowserRouter>
        <Route path="/" component={Home} exact={true}/>
        <Route path="/item/search" component={Search}/>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register}/>
      </BrowserRouter>
    )
  }
}

export default App;
