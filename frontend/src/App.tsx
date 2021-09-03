import React from "react";
import { Match } from "./components/Match";

const testUUID = "8af8c964-4736-492f-b90d-daf7ef12a400";
const testUUID2 = "3598516c-c1a3-4dbb-93a3-af5943b0cefa";

function App() {
  const params = new URLSearchParams(document.location.search);
  const matchId = params.get("matchId");

  return <Match uuid={matchId || testUUID} />;
}

export default App;
