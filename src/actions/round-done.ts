"use server"

import { Score } from "@prisma/client";
import SaveRoundAction from "./save-round-action";
import prisma from "@/lib/prisma";

type RoundDoneActionProps = Score[]

const RoundDoneAction = async (props: RoundDoneActionProps) => {
  await SaveRoundAction(props)

  const winners = props.reduce((max: Score[], current: Score) => {
    if (!max.length || current.total > max[0].total) {
        return [current];
    } else if (current.total === max[0].total) {
        max.push(current);
    }
    return max;
  }, []);

  winners.map(async (winner) => {
    await prisma.score.updateMany({
      data: {
        winner: true
      },
      where: {
        player_id: winner.player_id,
        yatzy_id: winner.yatzy_id,
        round: winner.round
      }
    })
  })

  props.map(async (player) => {
    await prisma.score.updateMany({
      data: {
        active: false
      },
      where: {
        player_id: player.player_id,
        yatzy_id: player.yatzy_id,
        round: player.round
      }
    })
  })

}

export default RoundDoneAction;