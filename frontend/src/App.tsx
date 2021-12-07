import { DefaultLayout } from "./layouts/DefaultLayout";
import { Home } from "./screens/Home";
import { MatchDetail } from "./screens/MatchDetail";
import { MatchHistory } from "./screens/MatchHistory";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { StatChart } from "./components/MatchStatChart/StatChart";

export const ROUTES = {
  detail: { key: "detail", name: "Match", path: "/match/:actId/:matchId" },
  history: {
    key: "history",
    name: "History",
    path: "/matchHistory/:playerName/:playerTag",
  },
  home: { key: "home", name: "Home", path: "/" },
  statChart: { key: "statChart", name: "Stat Chart", path: "/statChart" },
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path={ROUTES.statChart.path}>
          <DefaultLayout activeRoute="starChart">
            <StatChart />
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
