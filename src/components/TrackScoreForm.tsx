'use client'

import React from "react";
import { type Player, type Score, type Yatzy } from "@prisma/client";
import { Button, Input } from '@nextui-org/react'
import ScoreBoard from "./ScoreBoard";
import SaveRoundAction from "@/actions/save-round-action";
import NewRoundAction from "@/actions/new-round";
import { useRouter } from "next/navigation";
import FinishRoundAction from "@/actions/finish-round";
import AddPlayersForm from "./AddPlayersForm";
import { ZodError, number, z } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import ResetRoundAction from "@/actions/reset-round-action";

export type ValidColor = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';

type TrackScoreFormProps = {
  score: (Score & {
    player_ref: Player,
  } & { yatzy_ref: Yatzy })[]
  players: Player[]
};

const TrackScoreForm = (props: TrackScoreFormProps) => {
  console.log(props.score[0].move)
  const router = useRouter()

  const yatzy = props.score[0].yatzy_ref
  const round = props.score[0].round

  const keys: (keyof Score)[] = [
    'one', 'two', 'three', 'four', 'five', 'six', 
    'sum', 'bonus', 'pair', 'two_pair', 'trips', 'quads', 
    'little_straight', 'straight', 'full_house', 'chance', 
    'yatzy', 'total'
  ];

  const savingKeys: (keyof Score)[] = [...keys, 'pair_dice', 'two_pair_dice_1', 'two_pair_dice_2', 
    'trips_dice', 'quads_dice', 'full_house_dice_3', 'full_house_dice_2', 
    'chance_dice_1', 'chance_dice_2', 'chance_dice_3', 'chance_dice_4', 
    'chance_dice_5', 'yatzy_dice'
  ];

  const players: Player[] = props.score.map((row) => { return row.player_ref })

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const formData = new FormData(e.target.form as HTMLFormElement);
    handleSaveForm(formData);
  };


  const handleSaveForm = async (formData: FormData) => {
    try {
      const dtos: Score[] = players.map((player, index) => {
        const dto: any = {
          id: props.score[index].id,
          yatzy_id: yatzy.id,
          round: round,
          player_id: player.id,
          move: props.score[index].move
        }
        savingKeys.map((key) => {
          dto[key] = formData.get(`${player.id}-${key}`)
        })
  
        return dto
      })
      await SaveRoundAction(dtos),
      toast.success('Saved!')
    } catch (err: unknown) {
      const z = err as ZodError
      z.errors.map((err) => toast.error(err.message))
    }
  }

  const handleResetForm = async (formData: FormData) => {
    try {
      const dtos: Score[] = players.map((player, index) => {
        const dto: any = {
          id: props.score[index].id,
          yatzy_id: yatzy.id,
          round: round,
          player_id: player.id,
          move: props.score[index].move
        }
        savingKeys.map((key) => {
          dto[key] = '0'
        })
  
        return dto
      })
      await ResetRoundAction(dtos)
      toast.success('Reseted!')
    } catch (err: unknown) {
      const z = err as ZodError
      z.errors.map((err) => toast.error(err.message))
    }
  }

  const handleNewRoundForm = async (formData: FormData) => {
    try {
      const dtos: Score[] = players.map((player, index) => {
        const dto: any = {
          id: props.score[index].id,
          yatzy_id: yatzy.id,
          round: round,
          player_id: player.id,
          move: props.score[index].move
        }
        keys.map((key) => {
          dto[key] = formData.get(`${player.id}-${key}`)
        })
  
        return dto
      })
  
      await NewRoundAction(dtos)
    } catch (err: unknown) {
      const z = err as ZodError
      z.errors.map((err) => toast.error(err.message))
    }
  }

  const handleFinishRoundForm = async (formData: FormData) => {
    try {
      const dtos: Score[] = players.map((player, index) => {
        const dto: any = {
          id: props.score[index].id,
          yatzy_id: yatzy.id,
          round: round,
          player_id: player.id,
          move: props.score[index].move
        }
        keys.map((key) => {
          dto[key] = formData.get(`${player.id}-${key}`)
        })
  
        return dto
      })
  
      await FinishRoundAction(dtos)
      handleCancelForm()
    } catch (err: unknown) {
      const z = err as ZodError
      z.errors.map((err) => toast.error(err.message))
    }
  }

  const handleCancelForm = () => {
    router.push(`/play/${yatzy.id}`)
  }

  return (
    <div>
      <AddPlayersForm players={props.players} round={round} yatzy={yatzy.id} />
      <form>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-y-6 gap-x-2 mt-4">
          
          <div className="col-span-4">
            <div className="flex gap-x-6" >
              <div className="w-[15rem] border-zinc-800 bg-zinc-900 h-12 rounded-lg px-3 py-1 flex items-center" >
                <span className="font-bold text-grey-200" >{yatzy.name} #{round}</span>   
              </div>
              {props.score.map((player) => (
                <div key={player.player_ref.id} className={`w-1/4 bg-${player.player_ref.color}-50 text-${player.player_ref.color} h-12 rounded-lg px-3 py-1 flex items-center`} >
                  <span>{player.player_ref.name}</span>   
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-4">
            <div className="flex gap-x-6" style={{ alignItems: 'stretch' }}>
              <div className="w-[15rem] flex flex-col gap-y-2">
                {keys.map((key) => (
                  <div key={key} className="border-medium border-dashed border-default-200 h-12 rounded-lg px-3 py-1 flex items-center" >
                    <span>{key}</span>   
                  </div>
                ))}
              </div>
              {props.score.map((player) => (
                <ScoreBoard key={player.player_ref.id} player={player} change={handleInputChange} />
              ))}
            </div>
          </div>
          
          <div className="col-span-4">
            <div className="flex gap-x-2" >
              <Button type="submit" color="default" variant="ghost" formAction={handleCancelForm} >Cancel</Button>
              {props.score[0].active && (
                <>
                  <Button type="submit" color="default" variant="ghost" formAction={handleSaveForm} >Save</Button>
                  <Button type="submit" color="default" variant="ghost" formAction={handleResetForm} >Reset</Button>
                  <Button type="submit" color="default" variant="ghost" formAction={handleFinishRoundForm} >Finish Round</Button>
                  <Button type="submit" color="primary" variant="flat" formAction={handleNewRoundForm} >New Round</Button>
                </>
              )}
            </div>
          </div>

        </div>
      </form>
    </div>
  );
};



export default TrackScoreForm;
