"use server"

import { sortPlacement } from "@/lib/array";
import getErrorMessage from "@/lib/error";
import prisma from "@/lib/prisma";
import { Score } from "@prisma/client";
import { revalidatePath } from "next/cache";

type SaveRoundActionProps = Score[]

const SaveRoundAction = async (props: SaveRoundActionProps) => {
  sortPlacement(props)
  try {
    props.map(async (score, index) => {
      let move = Number(score.move || 0)
      await prisma.score.create({
        data: {
          yatzy_id: score.yatzy_id,
          round: score.round,
          player_id: score.player_id,
          move: move +=1,
          one: Number(score.one),
          two: Number(score.two),
          three: Number(score.three),
          four: Number(score.four),
          five: Number(score.five),
          six: Number(score.six),
          sum: Number(score.sum),
          bonus: Number(score.bonus),
          pair: Number(score.pair),
          two_pair: Number(score.two_pair),
          trips: Number(score.trips),
          quads: Number(score.quads),
          little_straight: Number(score.little_straight),
          straight: Number(score.straight),
          full_house: Number(score.full_house),
          chance: Number(score.chance),
          yatzy: Number(score.yatzy),
          total: Number(score.total),
          placement: score.placement,
          pair_dice: Number(score.pair_dice),
          two_pair_dice_1: Number(score.two_pair_dice_1),
          two_pair_dice_2: Number(score.two_pair_dice_2),
          trips_dice: Number(score.trips_dice),
          quads_dice: Number(score.quads_dice),
          full_house_dice_3: Number(score.full_house_dice_3),
          full_house_dice_2: Number(score.full_house_dice_2),
          chance_dice_1: Number(score.chance_dice_1),
          chance_dice_2: Number(score.chance_dice_2),
          chance_dice_3: Number(score.chance_dice_3),
          chance_dice_4: Number(score.chance_dice_4),
          chance_dice_5: Number(score.chance_dice_5),
          yatzy_dice: Number(score.yatzy_dice),
        }
      })
    })

    revalidatePath(`/play/${props[0].yatzy_id}/${props[0].round}`, 'page')
    
    return {
      data: 'Round saved'
    }
  } catch (e) {
    return {
      error: getErrorMessage(e)
    }
  }

}

export default SaveRoundAction;