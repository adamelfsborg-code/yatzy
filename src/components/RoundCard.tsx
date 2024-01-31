"use client"

import { Card, CardBody, CardFooter, Chip } from '@nextui-org/react'
import { type Score, type Player, type Yatzy } from '@prisma/client'
import { useRouter } from 'next/navigation'
import React from 'react'
import PlacementBadge from './PlacementBadge'

type RoundCardProps = {
  score: (Score & {
    player_ref: Player,
  } & { yatzy_ref: Yatzy })[]
  round: number
}

const RoundCard = (props: RoundCardProps) => {
  const router = useRouter()
  const data = props.score.filter((row) => row.round === props.round)
  const winner = data.find((player) => player.winner)


  const maxMove = data.reduce((max, curr) => {
    return curr.move > max.move ? curr : max;
  }, { move: -Infinity });
  

  const lastMoves = data.filter(obj => obj.move === maxMove.move);


  return (
    <Card  shadow="sm" isPressable onPress={() => router.push(`/play/${props.score[0].yatzy_id}/${props.round}`)} >
      <CardBody className="overflow-visible">
        <h4>#{props.round}</h4>
      </CardBody>
      <CardFooter className="text-small flex-wrap gap-2 ">
        {lastMoves.sort((a, b) => b.total - a.total).map((row, index) => (
          <PlacementBadge key={row.id} player={row} />
        ))}
        {data[0].active ? (
          <Chip
            variant={'solid'}
            color={'success'}
          >
            Ongoing
          </Chip>
        ) : (
          <Chip
            variant={'solid'}
            color={'danger'}
          >
            Done
          </Chip>
        )}
        {winner && (
          <Chip
            variant={'solid'}
            color={'secondary'}
          >
            <span className='font-semibold' >Winner:</span> {winner?.player_ref.name}
          </Chip>
        )}
      </CardFooter>
    </Card>
  )
}

export default RoundCard