import Jett from "../assets/jett.png";
import Sova from "../assets/sova.png";
import Sage from "../assets/sage.png";
import Brimstone from "../assets/brimstone.png";
import Astra from "../assets/astra.png";
import Reyna from "../assets/reyna.png";
import Yoru from "../assets/yoru.png";
import Raze from "../assets/raze.png";
import Cypher from "../assets/cypher.png";
import Skye from "../assets/skye.png";
import Omen from "../assets/omen.png";
import Phoenix from "../assets/phoenix.png";
import Viper from "../assets/viper.png";
import Killjoy from "../assets/killjoy.png";
import Breach from "../assets/breach.png";
import Kay0 from "../assets/kay0.png";

export const agents = {
  "320b2a48-4d9b-a075-30f1-1f93a9b638fa": Sova,
  "569fdd95-4d10-43ab-ca70-79becc718b46": Sage,
  "9f0d8ba9-4140-b941-57d3-a7ad57c6b417": Brimstone,
  "a3bfb853-43b2-7238-a4f1-ad90e9e46bcc": Reyna,
  "7f94d92c-4234-0a36-9646-3a87eb8b5c89": Yoru,
  "41fb69c1-4189-7b37-f117-bcaf1e96f1bf": Astra,
  "f94c3b30-42be-e959-889c-5aa313dba261": Raze,
  "117ed9e3-49f3-6512-3ccf-0cada7e3823b": Cypher,
  "6f2a04ca-43e0-be17-7f36-b3908627744d": Skye,
  "add6443a-41bd-e414-f6ad-e58d267f4e95": Jett,
  "8e253930-4c05-31dd-1b6c-968525494517": Omen,
  "eb93336a-449b-9c1b-0a54-a891f7921d69": Phoenix,
  "707eab51-4836-f488-046a-cda6bf494859": Viper,
  "1e58de9c-4950-5125-93e9-a0aee9f98746": Killjoy,
  "5f8d3a7f-467b-97f3-062c-13acf203c006": Breach,
  "601dbbe7-43ce-be57-2a40-4abd24953621": Kay0,
};

export type AgentId = keyof typeof agents;

interface Props {
  readonly agentId: AgentId;
  readonly width?: number;
  readonly height?: number;
}

export const AgentIcon = ({ agentId, width = 35, height = 35 }: Props) => {
  if (!(agentId in agents)) {
    console.log("missing agentId " + agentId);
    return <div />;
  }
  return (
    <div
      style={{
        background:
          "radial-gradient(rgba(231, 215, 193, 0.5), rgba(231, 215, 193, 0.3), rgba(0,0,0,0)), rgba(32,14,2,1)",
        borderRadius: "60px / 10px",
        boxShadow: "inset 2px 2px rgba(0,0,0,0.3)",
        overflow: "hidden",
        border: `1px solid rgba(231, 215, 193, 0.5)`,

        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
      }}
    >
      <img src={agents[agentId]} width={width} height={height} alt={`${agents[agentId]}`} />
    </div>
  );
};
