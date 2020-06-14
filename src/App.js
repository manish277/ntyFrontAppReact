import React from 'react';
import './App.css';
import { Home } from './components/Home'
import { Department } from './components/Department'
import { Navigation } from './components/Navigation'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h3 className="m-3 d-flex justify-content-center">
          MERN Stack CRUD Application
      </h3>
        <h5 className="m-3 d-flex justify-content-center">
          Employee Managment System
      </h5>
        <Navigation />
        <Switch>
          <Route path="/ntyFrontAppReact" component={Home}  />
          <Route path="/employee" component={Department} />
        </Switch>
      </div>
    </BrowserRouter>

  );
}

export default App;
