"use server"

import getErrorMessage from "@/lib/error";
import prisma from "@/lib/prisma";
import { Score } from "@prisma/client";
import NewRoundAction from "./new-round";
import GenerateRoundAction from "./generate-round";

type ResetRoundActionProps = Score[]

const ResetRoundAction = async (props: ResetRoundActionProps) => {
  try {
    await prisma.score.deleteMany({
      where: {
        yatzy_id: props[0].yatzy_id,
        round: props[0].round
      }
    })

    await GenerateRoundAction({
      yatzy: props[0].yatzy_id,
      players: props.map((player) => player.player_id),
      round: 0
    })

    return {
      data: 'Round Restarted'
    }
  } catch (e) {
    return {
      error: getErrorMessage(e)
    }
  }

}

export default ResetRoundAction;