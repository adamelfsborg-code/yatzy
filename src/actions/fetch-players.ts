"use server"

import getErrorMessage from "@/lib/error";
import prisma from "@/lib/prisma";

type FetchPlayersActionProps = {
  take: number
  skip: number
  search?: string
}

const FetchPlayersAction = async (props: FetchPlayersActionProps) => {
  try {
    const players = await prisma.player.findMany({
      skip: props.skip,
      take: props.take,
      where: {
        name: {
          contains: props.search,
          mode: 'insensitive'
        }
      }
    });
  
    const total = await prisma.player.count({
      where: {
        name: {
          contains: props.search,
          mode: 'insensitive'
        }
      }
    })
  
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

export default FetchPlayersAction;