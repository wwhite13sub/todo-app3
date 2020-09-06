import React, { Component } from 'react';
import NavBar from './Components/NavBar';

import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Todos from './Components/Todos';
import Home from './Components/Home';
import Contact from './Components/Contact';

class App extends Component {

    render() {
      return (
        <Router>
          <div className="container-fluid">
            <NavBar />
          
            <Route path='/' component={Home} exact/>
            <Route path='/Contact' component={Contact}/>
            <Route path='/Todos' component={Todos} />
          </div>
        </Router>
      );
    }
  }
  
  
  
  
  export default App;
  
  
