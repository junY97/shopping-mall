
import React, { Component } from 'react';

import {Route, BrowserRouter} from 'react-router-dom';
import Home from './components/Home';
import Search from './components/Search'
import Register from './components/Register';
import Login from './components/Login';
import UpdateCustomer from './components/UpdateCustomer';

class App extends Component {
  render(){
    return(
      <BrowserRouter>
        <Route path="/" component={Home} exact={true}/>
        <Route path="/item/search" component={Search}/>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register}/>
        <Route path="/Account" component={UpdateCustomer}/>
      
      </BrowserRouter>
    )
  }
}

export default App;
