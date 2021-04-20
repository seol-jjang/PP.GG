import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ToggleBtn from "./components/views/common/toggleBtn/ToggleBtn";
import MainPage from "./components/views/MainPage/MainPage";
import SummonerPage from "./components/views/SummonerPage/SummonerPage";
import { ThemeProvider } from "./context/theme";
import "./styles/styles.scss";

const App = () => {
  return (
    <ThemeProvider>
      <ToggleBtn />
      <Router>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/summoner/:nickname" component={SummonerPage} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
