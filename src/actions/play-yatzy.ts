"use server"

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import GenerateRoundAction from "./generate-round";

type PlayYatzyActionProps = {
  name: string
  players: string[]
  round: number
}

const PlayYatzyAction = async (props: PlayYatzyActionProps) => {
  const yatzy = await prisma.yatzy.create({
    data: { 
      name: props.name,
    }
  });

  await GenerateRoundAction({
    yatzy: yatzy.id,
    players: props.players,
    round: props.round
  })

  redirect(`/play/${yatzy.id}/${props.round}`)

}

export default PlayYatzyAction;