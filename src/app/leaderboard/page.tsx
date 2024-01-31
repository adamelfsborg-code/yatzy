
import React from 'react'
import { PageProps } from '../page'
import PlayYatzyForm from '@/components/PlayYatzyForm'
import FetchPlayersAction from '@/actions/fetch-players'
import { toast } from 'react-hot-toast'
import FetchYatzysAction from '@/actions/fetch-yatzys'
import YatzyCard from '@/components/YatzyCard'
import LeaderboardTable from '@/components/LeaderboardTable'
import FetchLeaderboardAction from '@/actions/fetch-leaderboard'

const Page = async (props: PageProps) => {
  const take = 1000;
  const skip = 0;

  const players = await FetchLeaderboardAction({ take, skip })

  return (
    <div>
      <LeaderboardTable players={players.data!} />
    </div>
  
  )
}

export default Page