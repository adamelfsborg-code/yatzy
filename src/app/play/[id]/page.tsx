
import React from 'react'
import { PageProps } from '@/app/page'
import FetchScoreAction from '@/actions/fetch-score'
import RoundCard from '@/components/RoundCard'
import { Button } from '@nextui-org/button'
import RoundsForm from '@/components/RoundsForm'
import FetchRoundsAction from '@/actions/fetch-rounds'

const Page = async (props: PageProps) => {
  const score = await FetchRoundsAction({
    yatzy: props.params.id as string
  })
  const rounds = score?.data?.map(obj => obj.round);
  const uniqueRounds = [...new Set(rounds)].sort((a, b) => a - b);
  return (
    <RoundsForm score={score.data!} rounds={uniqueRounds} />
  )
}

export default Page