import React from "react";

import Main from "@pages/Main";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/repos" component={Main} />
          <Redirect to="/repos" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
