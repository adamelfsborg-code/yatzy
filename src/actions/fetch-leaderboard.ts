"use server"

import getErrorMessage from "@/lib/error";
import prisma, { prismaExclude } from "@/lib/prisma";

type FetchLeaderboardActionProps = {
  take: number
  skip: number
}

const FetchLeaderboardAction = async (props: FetchLeaderboardActionProps) => {
  try {
    const players = await prisma.player.findMany({
      select: prismaExclude('Player', ['id', 'timestamp']),
      skip: props.skip,
      take: props.take,
      orderBy: {
        total_sum: 'desc'
      },
      
    });
  
    const total = await prisma.player.count()
  
    return {
      data: players,
      metadata: {
        hasNextPage: props.skip + props.take < total,
        totalPages: Math.ceil(total / props.take),
      }
    }
  } catch (err) {
    return {
      error: getErrorMessage(err)
    }
  }

}

export default FetchLeaderboardAction;