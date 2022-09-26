import { BoomerSeason3Academy } from "./screens/BoomerSeason3Academy";
import { BoomerSeason3Challenger } from "./screens/BoomerSeason3Challenger";
import { BoomerSeason3Championship } from "./screens/BoomerSeason3Champs";
import { BoomerSeason4Academy } from "./screens/BoomerSeason4Academy";
import { BoomerSeason4Challenger } from "./screens/BoomerSeason4Challenger";
import { BoomerSeason4Championship } from "./screens/BoomerSeason4Champs";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { Home } from "./screens/Home";
import { MatchDetail } from "./screens/MatchDetail";
import { MatchHistory } from "./screens/MatchHistory";
import { RendezvousSeason1Academy } from "./screens/RendezvousSeason1Academy";
import { RendezvousSeason1Challenger } from "./screens/RendezvousSeason1Challenger";
import { RendezvousSeason1Championship } from "./screens/RendezvousSeason1Championship";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

export const ROUTES = {
  boomerSeason3academy: {
    key: "boomerSeason3academy",
    name: "BoomerSeason3Academy",
    path: "/boomerants/season3/academy",
  },
  boomerSeason3challenger: {
    key: "boomerSeason3challenger",
    name: "BoomerSeason3Challenger",
    path: "/boomerants/season3/challenger",
  },
  boomerSeason3champs: {
    key: "boomerSeason3champs",
    name: "BoomerSeason3Championship",
    path: "/boomerants/season3/championship",
  },
  boomerSeason4academy: {
    key: "boomerSeason4academy",
    name: "BoomerSeason4Academy",
    path: "/boomerants/season4/academy",
  },
  boomerSeason4challenger: {
    key: "boomerSeason4challenger",
    name: "BoomerSeason4Challenger",
    path: "/boomerants/season4/challenger",
  },
  boomerSeason4champs: {
    key: "boomerSeason4champs",
    name: "BoomerSeason4Championship",
    path: "/boomerants/season4/championship",
  },
  detail: { key: "detail", name: "Match", path: "/match/:actId/:matchId" },
  history: {
    key: "history",
    name: "History",
    path: "/matchHistory/:playerName/:playerTag",
  },
  home: { key: "home", name: "Home", path: "/" },
  rendezvousSeason1Academy: {
    key: "rendezvousSeason1Academy",
    name: "RendezvousSeason1Academy",
    path: "/rendezvous/season1/academy",
  },
  rendezvousSeason1Challenger: {
    key: "rendezvousSeason1Challenger",
    name: "RendezvousSeason1Challenger",
    path: "/rendezvous/season1/challenger",
  },
  rendezvousSeason1Championship: {
    key: "rendezvousSeason1Championship",
    name: "RendezvousSeason1Championship",
    path: "/rendezvous/season1/championship",
  },
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path={ROUTES.boomerSeason3champs.path}>
          <DefaultLayout activeRoute="boomerSeason3champs">
            <BoomerSeason3Championship />
          </DefaultLayout>
        </Route>
        <Route path={ROUTES.boomerSeason3challenger.path}>
          <DefaultLayout activeRoute="boomerSeason3challenger">
            <BoomerSeason3Challenger />
          </DefaultLayout>
        </Route>
        <Route path={ROUTES.boomerSeason3academy.path}>
          <DefaultLayout activeRoute="boomerSeason3academy">
            <BoomerSeason3Academy />
          </DefaultLayout>
        </Route>
        <Route path={ROUTES.boomerSeason4champs.path}>
          <DefaultLayout activeRoute="boomerSeason4champs">
            <BoomerSeason4Championship />
          </DefaultLayout>
        </Route>
        <Route path={ROUTES.boomerSeason4challenger.path}>
          <DefaultLayout activeRoute="boomerSeason4challenger">
            <BoomerSeason4Challenger />
          </DefaultLayout>
        </Route>
        <Route path={ROUTES.boomerSeason4academy.path}>
          <DefaultLayout activeRoute="boomerSeason4academy">
            <BoomerSeason4Academy />
          </DefaultLayout>
        </Route>

        <Route path={ROUTES.rendezvousSeason1Academy.path}>
          <DefaultLayout activeRoute="rendezvousSeason1academy">
            <RendezvousSeason1Academy />
          </DefaultLayout>
        </Route>
        <Route path={ROUTES.rendezvousSeason1Challenger.path}>
          <DefaultLayout activeRoute="rendezvousSeason1challenger">
            <RendezvousSeason1Challenger />
          </DefaultLayout>
        </Route>
        <Route path={ROUTES.rendezvousSeason1Championship.path}>
          <DefaultLayout activeRoute="rendezvousSeason1championship">
            <RendezvousSeason1Championship />
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
