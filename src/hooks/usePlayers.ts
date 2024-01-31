import FetchPlayersAction from "@/actions/fetch-players"
import { type Player } from "@prisma/client"
import { useEffect, useState } from "react"
import { toast } from 'react-hot-toast'

type usePlayersProps = {
  players: Player[],
  take: number
  skip: number
}

const usePlayers = (props: usePlayersProps) => {
  const [items, setItems] = useState(props.players);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const take = props.take;

  const loadPlayers = async (currentSkip: number) => {
    setIsLoading(true)
    
    if (skip > 0) {
      // Delay to simulate network latency
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    try {
      const players = await FetchPlayersAction({ take, skip: currentSkip })
      if (players.error) {
        throw new Error("Failed to fetch more Players");
      }

      setHasMore(players.metadata?.hasNextPage !== null);
      setItems((prev) => [...prev, ...players.data!] )
    } catch (error) {
      toast.error('Failed to fetch more Players')
    } finally {
      setIsLoading(false);
    }
  }

  const onLoadMore = () => {
    const newOffset = skip + take;

    setSkip(newOffset);
    loadPlayers(newOffset);
  };

  return {
    items,
    hasMore,
    isLoading,
    onLoadMore,
  };

}

export default usePlayers;