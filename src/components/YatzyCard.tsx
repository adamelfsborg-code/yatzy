"use client"

import { Card, CardBody, CardFooter, Chip } from '@nextui-org/react'
import { type Yatzy } from '@prisma/client'
import { useRouter } from 'next/navigation'
import React from 'react'

type YatzyCardProps = {
  yatzy: Yatzy
}

const YatzyCard = (props: YatzyCardProps) => {
  const router = useRouter()
  return (
    <Card  shadow="sm" isPressable onPress={() => router.push(`/play/${props.yatzy.id}/`)} >
      <CardBody className="overflow-visible">
        <h4>#{props.yatzy.name}</h4>
      </CardBody>
      <CardFooter className="text-small flex-wrap gap-2 ">
        <Chip
            variant={'bordered'}
            color={'default'}
          >
            {props.yatzy.timestamp.toDateString()}
          </Chip>
      </CardFooter>
    </Card>
  )
}

export default YatzyCard