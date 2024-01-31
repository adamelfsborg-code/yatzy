"use client"

import PlayYatzyAction from '@/actions/play-yatzy'
import { Avatar, Button, Input, SelectItem } from '@nextui-org/react'
import { type Player } from '@prisma/client'
import SelectWithClip from './SelectWithClip'


type PlayYatzyFormProps = {
  players: Player[]
  round: string
}

const PlayYatzyForm = (props: PlayYatzyFormProps) => {

  const handleForm = async (formData: FormData) => {
    const name = formData.get('name') as string
    const players = formData.getAll('players') as string[]
    const round = formData.get('round') as string

    await PlayYatzyAction({
      name,
      players,
      round: Number(round)
    })

  }

  return (
    <form action={handleForm} className='space-y-2  py-10' >
      <Input size='sm' label="Yatzy" name='name' placeholder="Enter Yatzy Name" />
      <input type='hidden' name='round' value={props.round} />
      <SelectWithClip 
        name='players'
        label='Players'
        labelPlacement="inside"
        selectionMode="multiple"
        placeholder='Select players'
        items={props.players.map((player) => { return { id: player.id, name: player.name } })}  
      >
      {(item) => (
        <SelectItem key={item.id} textValue={item.name}>
          <div className="flex gap-2 items-center">
            <Avatar alt={item.name} className="flex-shrink-0" size="sm" src={''} />
            <div className="flex flex-col">
              <span className="text-small">{item.name}</span>
            </div>
          </div>
        </SelectItem>
      )}
      </SelectWithClip>
      <Button color='primary' variant='bordered'  type='submit'>Play</Button>
    </form>
  )
}

export default PlayYatzyForm