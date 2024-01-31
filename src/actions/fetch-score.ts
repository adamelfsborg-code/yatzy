"use server"

import getErrorMessage from "@/lib/error";
import prisma from "@/lib/prisma";

type FetchScoreActionProps = {
  yatzy: string
  round?: number
}

const FetchScoreAction = async (props: FetchScoreActionProps) => {
  try {
    const maxMove = await prisma.score.findFirst({
      where: {
        yatzy_id: props.yatzy,
        round: props.round || undefined,
      },
      orderBy: {
        move: 'desc',
      },
      select: {
        move: true,
      },
    });
    const score = await prisma.score.findMany({
      where: {
        yatzy_id: props.yatzy,
        round: props.round || undefined,
        move: maxMove?.move
      },
      include: {
        player_ref: true,
        yatzy_ref: true
      },
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

export default FetchScoreAction;