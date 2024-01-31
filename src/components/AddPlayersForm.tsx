"use client"

import { Avatar, Button, SelectItem } from '@nextui-org/react'
import { type Player } from '@prisma/client'
import React from 'react'
import SelectWithClip from './SelectWithClip'
import GenerateRoundAction from '@/actions/generate-round'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

type AddPlayersFormProps = {
  players: Player[]
  round: number
  yatzy: string
}

const AddPlayersForm = (props: AddPlayersFormProps) => {
  const ScoreFormSchema = z.object({
    players: z.string().array()
  });
  type ScoreFormSchemaType = z.infer<typeof ScoreFormSchema>;

  const { handleSubmit, formState: { errors }, reset, register } = useForm<ScoreFormSchemaType>({ resolver: zodResolver(ScoreFormSchema) });

  const onSubmit: SubmitHandler<ScoreFormSchemaType> = async (data) => {
    await GenerateRoundAction({
      yatzy: props.yatzy,
      players: data.players,
      round: props.round
    })
    reset()
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-2  py-2' >
      <SelectWithClip 
        {...register('players')}
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
      <Button color='default' variant='bordered' type='submit'>Add Players</Button>
      {errors.players && <span>{errors.players.message}</span>}
    </form>
  )
}

export default AddPlayersForm