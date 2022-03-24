import { BoomerSeason3Stats } from "./screens/BoomerSeason3Champs";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { Home } from "./screens/Home";
import { MatchDetail } from "./screens/MatchDetail";
import { MatchHistory } from "./screens/MatchHistory";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

export const ROUTES = {
  boomerSeason3: {
    key: "boomerSeason3",
    name: "BoomerSeason3",
    path: "/boomerSeason3",
  },
  detail: { key: "detail", name: "Match", path: "/match/:actId/:matchId" },
  history: {
    key: "history",
    name: "History",
    path: "/matchHistory/:playerName/:playerTag",
  },
  home: { key: "home", name: "Home", path: "/" },
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path={ROUTES.boomerSeason3.path}>
          <DefaultLayout activeRoute="boomerSeason3">
            <BoomerSeason3Stats />
          </DefaultLayout>
        </Route>
        <Route path={ROUTES.detail.path}>
          <DefaultLayout activeRoute="detail">
            <MatchDetail />
          </DefaultLayout>
        </Route>
        <Route path={ROUTES.history.path}>
          <DefaultLayout activeRoute="history">
            <MatchHistory />
          </DefaultLayout>
        </Route>
        <Route path={ROUTES.home.path}>
          <DefaultLayout activeRoute="home">
            <Home />
          </DefaultLayout>
        </Route>
      </Switch>
    </Router>
  );
}
