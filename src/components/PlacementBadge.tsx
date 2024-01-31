import { Chip } from '@nextui-org/react'
import { Player, Yatzy, type Score } from '@prisma/client'
import React from 'react'

type PlacementBadge = {
  player: Score & { player_ref: Player} & { yatzy_ref: Yatzy }
}

const PlacementBadge = (props: PlacementBadge) => {
  if (props.player.placement === 1) {
    return (
      <Chip
        variant={'bordered'}
        color={'warning'}
      >
        (1) {props.player.player_ref.name} {props.player.total}
      </Chip>
    )
  }

  if (props.player.placement === 2) {
    return (
      <Chip
        variant={'bordered'}
        color={'secondary'}
      >
        (2) {props.player.player_ref.name} {props.player.total}
      </Chip>
    )
  }

  if (props.player.placement === 3) {
    return (
      <Chip
        variant={'bordered'}
        color={'primary'}
      >
        (3) {props.player.player_ref.name} {props.player.total}
      </Chip>
    )
  }

  return (
    <Chip
      key={props.player.id}
      variant={'bordered'}
      color={'default'}
    >
      ({props.player.placement}) {props.player.player_ref.name} {props.player.total}
    </Chip>
  )
}

export default PlacementBadge