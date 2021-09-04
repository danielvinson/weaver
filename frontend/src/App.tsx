import { DefaultLayout } from "./layouts/DefaultLayout";
import { Home } from "./screens/Home";
import { MatchDetail } from "./screens/MatchDetail";
import { MatchHistory } from "./screens/MatchHistory";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

export const ROUTES = [
  { key: "home", name: "Home", path: "/" },
  { key: "history", name: "History", path: "/matchHistory/:playerId" },
  { key: "detail", name: "Match", path: "/match/:matchId" },
];

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/match/:matchId">
          <DefaultLayout activeRoute="detail">
            <MatchDetail />
          </DefaultLayout>
        </Route>
        <Route path="/matchHistory/:playerId">
          <DefaultLayout activeRoute="history">
            <MatchHistory />
          </DefaultLayout>
        </Route>
        <Route path="/">
          <DefaultLayout activeRoute="home">
            <Home />
          </DefaultLayout>
        </Route>
      </Switch>
    </Router>
  );
}
