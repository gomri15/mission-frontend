import React from "react";
import "./App.css";
import Register from "./components/Register"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import LoginFrom from "./components/LoginFrom";
import { MyHeader } from "./componentsStyle/MyHeader"


function App() {
  return (
    <Router>
      <div className="App">
        <MyHeader>
          <h1>The Game</h1>
        </MyHeader>
        <Switch>
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={LoginFrom} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
