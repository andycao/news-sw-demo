import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";

import Nav from "./Nav";
import Content from "./Content";
import Index from "./page/index";
import List from "./page/news";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <Content>
          <Switch>
            <Route path="/index">
              <Index />
            </Route>
            <Route path="/list">
              <List />
            </Route>
          </Switch>
        </Content>
      </div>
    </BrowserRouter>
  );
}

export default App;
