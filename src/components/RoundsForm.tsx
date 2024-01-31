"use client"

import React from 'react'
import RoundCard from './RoundCard'
import { type Player, Score, Yatzy } from '@prisma/client'
import { Button } from '@nextui-org/react'
import router from 'next/router'
import { useRouter } from 'next/navigation'
import GenerateRoundAction from '@/actions/generate-round'
import NewRoundAction from '@/actions/new-round'

type RoundsFormProps = {
  score: (Score & {
    player_ref: Player,
  } & { yatzy_ref: Yatzy })[]
  rounds: number[]
}

const RoundsForm = (props: RoundsFormProps) => {
  const router = useRouter()
  
  const handleNewRound = async () => {
    await NewRoundAction(props.score.filter((round) => round.round === Math.max(...props.rounds)))
  }

  return (
    <div className='space-y-2' >
      <div className='grid grid-cols-1 gap-2 sm:grid-cols-2' >
        {props.rounds.map((round) => (
          <RoundCard key={round} score={props.score} round={round} />
        ))}
      </div>
      <div className='flex gap-x-2' >
        <Button color="default" variant="ghost" onPress={() => router.push('/play/')} >Cancel</Button>
        <Button color="primary" variant="flat" onPress={() => handleNewRound()} >New Round</Button>
      </div>
    </div>
  )
}

export default RoundsForm