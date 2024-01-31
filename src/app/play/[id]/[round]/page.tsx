

import FetchPlayersAction from '@/actions/fetch-players'
import FetchScoreAction from '@/actions/fetch-score'
import { PageProps } from '@/app/page'
import TrackScoreForm from '@/components/TrackScoreForm'

const Page = async (props: PageProps) => {
  const id = props.params.id as string
  const round = Number(props.params.round as string || '')
  const score = await FetchScoreAction({ yatzy: id, round: round })
  const players = await FetchPlayersAction({ take: 1000, skip: 0 })
  
  console.log(score.data)
  return (
    <TrackScoreForm score={score.data!} players={players.data!} />
  )
}

export default Page