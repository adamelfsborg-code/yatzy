
import React from 'react'
import { PageProps } from '../page'
import PlayYatzyForm from '@/components/PlayYatzyForm'
import FetchPlayersAction from '@/actions/fetch-players'
import { toast } from 'react-hot-toast'
import FetchYatzysAction from '@/actions/fetch-yatzys'
import YatzyCard from '@/components/YatzyCard'

const Page = async (props: PageProps) => {
  const take = 1000;
  const skip = 0;

  const players = await FetchPlayersAction({ take, skip })
  const yatzys = await FetchYatzysAction({ take, skip })

  if (players.error) {
    toast.error(players.error)
  }

  return (
    <div>
      <PlayYatzyForm players={players.data!} round='1' />

      <div className='grid grid-cols-1 gap-2 sm:grid-cols-2' >
        {yatzys.data?.map((yatzy) => (
          <YatzyCard key={yatzy.id} yatzy={yatzy} />
        ))}
      </div>
    </div>
  
  )
}

export default Page