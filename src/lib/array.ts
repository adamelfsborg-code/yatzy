import { Score } from "@prisma/client";

export const uniqueFilter = <T>(value: T, index: number, self: T[]) => {
  return self.indexOf(value) === index;
}

export const sortPlacement = (game: Score[]) => {
  game.sort((a, b) => b.total - a.total);

  let currentPlacement = 1;
  let previousTotal: number | null = null;

  for (const player of game) {
    if (previousTotal !== null && Number(player.total) < previousTotal) {
      currentPlacement += 1;
    }

    player.placement = currentPlacement;
    previousTotal = player.total;
  }

  return game
}
