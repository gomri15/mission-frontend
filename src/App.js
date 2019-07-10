import React from "react";
import "./App.css";
import Register from "./components/Register"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import LoginFrom from "./components/LoginFrom";


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={LoginFrom} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
