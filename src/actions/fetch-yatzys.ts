"use server"

import getErrorMessage from "@/lib/error";
import prisma from "@/lib/prisma";

type FetchYatzysActionProps = {
  take: number
  skip: number
  search?: string
}

const FetchYatzysAction = async (props: FetchYatzysActionProps) => {
  try {
    const yatzys = await prisma.yatzy.findMany({
      skip: props.skip,
      take: props.take,
      where: {
        name: {
          contains: props.search,
          mode: 'insensitive'
        }
      }
    });
  
    const total = await prisma.yatzy.count({
      where: {
        name: {
          contains: props.search,
          mode: 'insensitive'
        }
      }
    })
  
    return {
      data: yatzys,
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

export default FetchYatzysAction;