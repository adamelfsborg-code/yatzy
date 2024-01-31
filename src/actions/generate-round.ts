"use server"

import getErrorMessage from "@/lib/error";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";


type GenerateRoundActionProps = {
  yatzy: string
  players: string[]
  round: number
}

const GenerateRoundAction = async (props: GenerateRoundActionProps) => {
  try {
    props.players.map(async (player) => {
      const res = await prisma.score.createMany({
        data: { 
          yatzy_id: props.yatzy,
          player_id: player,
          round: props.round
        }
      });
    })

    revalidatePath(`/play/${props.yatzy}/${props.round}`, 'page')

    return {
      data: props
    }
  } catch (err) {
    return {
      error: getErrorMessage(err)
    }
  }
  

}

export default GenerateRoundAction;