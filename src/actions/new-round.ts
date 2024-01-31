"use server"

import { redirect } from "next/navigation";
import { Score } from "@prisma/client";
import GenerateRoundAction from "./generate-round";
import FinishRoundAction from "./finish-round";

type NewRoundActionProps = Score[]

const NewRoundAction = async (props: NewRoundActionProps) => {
  await FinishRoundAction(props)

  const players = props.map((player) => player.player_id)
  const round = (props[0].round) += 1
  const yatzy = props[0].yatzy_id


  await GenerateRoundAction({
    yatzy: yatzy,
    players: players,
    round: round
  })


  redirect(`/play/${yatzy}/${round}`)

}

export default NewRoundAction;