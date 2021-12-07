/* eslint-disable functional/no-let */
import { agentPerformanceTiers } from "../../data/agents/scoreBars";
import { content } from "../../api/content";
import type { Player } from "../../types/match";

/*
  Calculates ACS weighted by which agent the player is playing
*/

// Calculate ACS multiplier based on "average" ACS from data
export const calculateAdjustmentValues = () => {
  let res = {};
  const allAverages = Object.values(agentPerformanceTiers).map(
    (scores) => scores.average
  );
  const meanScore =
    allAverages.reduce((prev, cur) => prev + cur, 0) / allAverages.length;

  Object.entries(agentPerformanceTiers).map(([agentName, agent]) => {
    const multi = meanScore / agent.average;
    res = {
      ...res,
      [agentName]: multi,
    };
  });

  return res;
};

export const calculateAgentPerformance = (player: Player, acs: number) => {
  const adjustmentVals = calculateAdjustmentValues();

  const agent = content.agents.find(
    (a) => a.id.toLowerCase() === player.characterId
  );
  if (agent === undefined) {
    console.log(player.characterId);
    throw new Error("Agent not found - should not be possible");
  }

  return (
    acs *
    adjustmentVals[agent.name.toLowerCase() as keyof typeof adjustmentVals]
  );
};
