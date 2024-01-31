"use server"

import getErrorMessage from "@/lib/error";
import prisma from "@/lib/prisma";

type FetchRoundsActionProps = {
  yatzy: string
  round?: number
}

const FetchRoundsAction = async (props: FetchRoundsActionProps) => {
  try {
    const score = await prisma.score.findMany({
      where: {
        yatzy_id: props.yatzy,
        round: props.round || undefined,
      },
      include: {
        player_ref: true,
        yatzy_ref: true
      }
    });
  
    return {
      data: score,
    }
  } catch (err) {
    return {
      error: getErrorMessage(err)
    }
  }

}

export default FetchRoundsAction;