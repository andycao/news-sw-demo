import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";

import Nav from "./Nav";
import Content from "./Content";
import Index from "./page/index";
import List from "./page/list";
import News from "./page/news";

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
            <Route exact path="/news">
              <List />
            </Route>
            <Route path="/news/:id">
              <News />
            </Route>
            <Route>
                <Redirect to="/index" />
            </Route>
          </Switch>
        </Content>
      </div>
    </BrowserRouter>
  );
}

export default App;
