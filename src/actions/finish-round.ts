"use server"

import { redirect } from "next/navigation";
import { Score } from "@prisma/client";
import GenerateRoundAction from "./generate-round";
import SaveRoundAction from "./save-round-action";
import RoundDoneAction from "./round-done";
import { revalidatePath } from "next/cache";

type FinishRoundActionProps = Score[]

const FinishRoundAction = async (props: FinishRoundActionProps) => {
  await SaveRoundAction(props)
  await RoundDoneAction(props)

  revalidatePath(`/play/${props[0].yatzy_id}`, 'page')
}

export default FinishRoundAction;