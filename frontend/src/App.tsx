import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MatchHistory } from "./screens/MatchHistory";
import { MatchDetail } from "./screens/MatchDetail";
import { Home } from "./screens/Home";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/match/:matchId">
          <MatchDetail />
        </Route>
        <Route path="/matchHistory/:playerId">
          <MatchHistory />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
