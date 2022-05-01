/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Astra from "../assets/images/astra.png";
import Breach from "../assets/images/breach.png";
import Brimstone from "../assets/images/brimstone.png";
import Chamber from "../assets/images/chamber.png";
import Cypher from "../assets/images/cypher.png";
import Fade from "../assets/images/fade.png";
import Jett from "../assets/images/jett.png";
import Kay0 from "../assets/images/kay0.png";
import Killjoy from "../assets/images/killjoy.png";
import Neon from "../assets/images/neon.png";
import Omen from "../assets/images/omen.png";
import Phoenix from "../assets/images/phoenix.png";
import Raze from "../assets/images/raze.png";
import Reyna from "../assets/images/reyna.png";
import Sage from "../assets/images/sage.png";
import Skye from "../assets/images/skye.png";
import Sova from "../assets/images/sova.png";
import Viper from "../assets/images/viper.png";
import Yoru from "../assets/images/yoru.png";

export const agents = {
  "1e58de9c-4950-5125-93e9-a0aee9f98746": Killjoy,
  "5f8d3a7f-467b-97f3-062c-13acf203c006": Breach,
  "6f2a04ca-43e0-be17-7f36-b3908627744d": Skye,
  "7f94d92c-4234-0a36-9646-3a87eb8b5c89": Yoru,
  "8e253930-4c05-31dd-1b6c-968525494517": Omen,
  "9f0d8ba9-4140-b941-57d3-a7ad57c6b417": Brimstone,
  "41fb69c1-4189-7b37-f117-bcaf1e96f1bf": Astra,
  "117ed9e3-49f3-6512-3ccf-0cada7e3823b": Cypher,
  "320b2a48-4d9b-a075-30f1-1f93a9b638fa": Sova,
  "569fdd95-4d10-43ab-ca70-79becc718b46": Sage,
  "601dbbe7-43ce-be57-2a40-4abd24953621": Kay0,
  "707eab51-4836-f488-046a-cda6bf494859": Viper,
  "22697a3d-45bf-8dd7-4fec-84a9e28c69d7": Chamber,
  "a3bfb853-43b2-7238-a4f1-ad90e9e46bcc": Reyna,
  "add6443a-41bd-e414-f6ad-e58d267f4e95": Jett,
  "bb2a4828-46eb-8cd1-e765-15848195d751": Neon,
  "dade69b4-4f5a-8528-247b-219e5a1facd6": Fade,
  "eb93336a-449b-9c1b-0a54-a891f7921d69": Phoenix,
  "f94c3b30-42be-e959-889c-5aa313dba261": Raze,
};

export type AgentId = keyof typeof agents;

interface Props {
  readonly agentId: AgentId;
  readonly width?: number;
  readonly height?: number;
}

export const AgentIcon = ({ agentId, height = 35, width = 35 }: Props) => {
  if (!(agentId in agents)) {
    console.log("missing agentId " + agentId);
    return <div />;
  }
  return (
    <div
      style={{
        alignItems: "flex-end",
        background:
          "radial-gradient(rgba(231, 215, 193, 0.5), rgba(231, 215, 193, 0.3), rgba(0,0,0,0)), rgba(32,14,2,1)",
        border: `1px solid rgba(231, 215, 193, 0.5)`,
        borderRadius: "60px / 10px",
        boxShadow: "inset 2px 2px rgba(0,0,0,0.3)",

        display: "flex",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <img
        src={agents[agentId]}
        width={width}
        height={height}
        alt={agents[agentId]}
      />
    </div>
  );
};
