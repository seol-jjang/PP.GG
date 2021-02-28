import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainPage from "./components/views/MainPage";
import SummonerPage from "./components/views/SummonerPage";
import "./styles/styles.scss";

function App() {
  return (
    <div className="main">
      <Router>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/summoner/:nickname" component={SummonerPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
