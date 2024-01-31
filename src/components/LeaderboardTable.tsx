"use client"

import { prettifyString } from "@/lib/string"
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, getKeyValue } from "@nextui-org/react"
import { Player } from "@prisma/client"

type LeaderboardTableProps = {
  players: Omit<Player, 'timestamp' | 'id'>[]
}

const LeaderboardTable = (props: LeaderboardTableProps) => {

  const columns = Object.entries(props.players[0]).map((item) => {return { key: item[0], label: prettifyString(item[0]) } })

  
  return (
    <Table isStriped aria-label="Leaderboard">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={props.players}>
        {(item) => (
          <TableRow key={item.name}>
            {(columnKey) => ( 
              <TableCell>
                {getKeyValue(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default LeaderboardTable