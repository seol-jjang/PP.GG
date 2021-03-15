import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainPage from "./components/views/MainPage/MainPage";
import SummonerPage from "./components/views/SummonerPage/SummonerPage";
import "./styles/styles.scss";

const App = () => {
  return (
    <div className="contents">
      <Router>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/summoner/:nickname" component={SummonerPage} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
