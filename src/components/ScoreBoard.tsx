import { Avatar, Input, Select, SelectItem } from '@nextui-org/react'
import { type Score, type Player, type Yatzy } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { ValidColor } from './TrackScoreForm'
import SelectWithClip from './SelectWithClip'
import ScoreInput from './ScoreInput'

type ScoreBoardProps = {
  player: (Score & { player_ref: Player } & { yatzy_ref: Yatzy })
  change: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const ScoreBoard = (props: ScoreBoardProps) => {
  const [one, setOne] = useState(props.player.one);
  const [two, setTwo] = useState(props.player.two);
  const [three, setThree] = useState(props.player.three);
  const [four, setFour] = useState(props.player.four);
  const [five, setFive] = useState(props.player.five);
  const [six, setSix] = useState(props.player.six);

  const [sum, setSum] = useState(props.player.sum);
  const [bonus, setBonus] = useState(props.player.bonus);

  const [pair, setPair] = useState(props.player.pair);
  
  const [pairDice, setPairDice] = useState(props.player.pair_dice);
  const [twoPairDice1, setTwoPairDice1] = useState(props.player.two_pair_dice_1);
  const [twoPairDice2, setTwoPairDice2] = useState(props.player.two_pair_dice_2);
  const [tripsDice, setTripsDice] = useState(props.player.trips_dice);
  const [quadsDice, setQuadsDice] = useState(props.player.quads_dice);
  const [fullHouseDice3, setFullHouseDice3] = useState(props.player.full_house_dice_3);
  const [fullHouseDice2, setFullHouseDice2] = useState(props.player.full_house_dice_2);
  const [chanceDice1, setChanceDice1] = useState(props.player.chance_dice_1);
  const [chanceDice2, setChanceDice2] = useState(props.player.chance_dice_2);
  const [chanceDice3, setChanceDice3] = useState(props.player.chance_dice_3);
  const [chanceDice4, setChanceDice4] = useState(props.player.chance_dice_4);
  const [chanceDice5, setChanceDice5] = useState(props.player.chance_dice_5);
  const [yatzyDice, setYatzyDice] = useState(props.player.yatzy_dice);

  const [twoPair, setTwoPair] = useState(props.player.two_pair);
  const [trips, setTrips] = useState(props.player.trips);
  const [quads, setQuads] = useState(props.player.quads);
  const [littleStraight, setLittleStraight] = useState(props.player.little_straight);
  const [straight, setStraight] = useState(props.player.straight);
  const [fullHouse, setFullHouse] = useState(props.player.full_house);
  const [chance, setChance] = useState(props.player.chance);
  const [yatzy, setYatzy] = useState(props.player.yatzy);
  const [total, setTotal] = useState(props.player.total);

  useEffect(() => {
    setPair(pairDice && pairDice * 2)
    setTwoPair(twoPairDice1 && twoPairDice2 ? (twoPairDice1 * 2) + (twoPairDice2 * 2) : 0)
    setTrips(tripsDice && tripsDice * 3)
    setQuads(quadsDice && quadsDice * 4)
    setFullHouse(fullHouseDice3 > 0 && fullHouseDice2 > 0 ? (fullHouseDice3 * 3) + (fullHouseDice2 * 2) : 0)
    setChance(chanceDice1 && chanceDice2 && chanceDice3 && chanceDice4 && chanceDice5 ? chanceDice1 + chanceDice2 + chanceDice3 + chanceDice4 + chanceDice5 : 0)
    setYatzy(yatzyDice > 0 ? 50 : 0)
  }, [pairDice, twoPairDice1, twoPairDice2, tripsDice, quadsDice, fullHouseDice3, fullHouseDice2, chanceDice1, chanceDice2, chanceDice3, chanceDice4, chanceDice5, yatzyDice])

  useEffect(() => {
    const newSum = Math.max(0, one) + Math.max(0, two) + Math.max(0, three) + Math.max(0, four) + Math.max(0, five) + Math.max(0, six);
    const newBonus = newSum >= 63 ? 50 : 0;
    const newTotal =
      Math.max(newSum, 0) +
      Math.max(newBonus, 0) +
      Math.max(pair, 0) +
      Math.max(twoPair, 0) +
      Math.max(trips, 0) +
      Math.max(quads, 0) +
      Math.max(littleStraight, 0) +
      Math.max(straight, 0) +
      Math.max(fullHouse, 0) +
      Math.max(chance, 0) +
      Math.max(yatzy, 0);
    setSum(newSum);
    setBonus(newBonus);
    setTotal(newTotal);
  }, [one, two, three, four, five, six, pair, twoPair, trips, quads, littleStraight, straight, fullHouse, chance, yatzy]);

  const dice = [ { id: '0', name: 'Unset' }, { id: '1', name: 'One' }, { id: '2', name: 'Two' }, { id: '3', name: 'Three' }, { id: '4', name: 'Four' }, { id: '5', name: 'Five' }, { id: '6', name: 'Six' }, { id: '7', name: 'Cross Out' } ] 
  const count = [ { id: '0', name: 'Unset' }, { id: '1', name: 'One' }, { id: '2', name: 'Two' }, { id: '3', name: 'Three' }, { id: '4', name: 'Four' }, { id: '5', name: 'Five'}, { id: '6', name: 'Cross Out' },  ] 
  
  return (
    <div className="w-1/4 flex flex-col gap-y-2 " >
      <input 
        type="hidden"
        value={String(one)}
        name={`${props.player.player_ref.id}-one`}
      /> 
      <input 
        type="hidden"
        value={String(two)}
        name={`${props.player.player_ref.id}-two`}
      /> 
      <input 
        type="hidden"
        value={String(three)}
        name={`${props.player.player_ref.id}-three`}
      /> 
      <input 
        type="hidden"
        value={String(four)}
        name={`${props.player.player_ref.id}-four`}
      /> 
      <input 
        type="hidden"
        value={String(five)}
        name={`${props.player.player_ref.id}-five`}
      /> 
      <input 
        type="hidden"
        value={String(six)}
        name={`${props.player.player_ref.id}-six`}
      /> 
      <input 
        type="hidden"
        value={String(sum)}
        name={`${props.player.player_ref.id}-sum`}
      /> 
      <input 
        type="hidden"
        value={String(bonus)}
        name={`${props.player.player_ref.id}-bonus`}
      /> 
      <input 
        type="hidden"
        value={String(total)}
        name={`${props.player.player_ref.id}-total`}
      /> 
      <input 
        type="hidden"
        value={String(pair)}
        name={`${props.player.player_ref.id}-pair`}
      /> 
      <input 
        type="hidden"
        value={String(twoPair)}
        name={`${props.player.player_ref.id}-two_pair`}
      /> 
      <input 
        type="hidden"
        value={String(trips)}
        name={`${props.player.player_ref.id}-trips`}
      /> 
      <input 
        type="hidden"
        value={String(quads)}
        name={`${props.player.player_ref.id}-quads`}
      /> 
      <input 
        type="hidden"
        value={String(littleStraight)}
        name={`${props.player.player_ref.id}-little_straight`}
      /> 
      <input 
        type="hidden"
        value={String(straight)}
        name={`${props.player.player_ref.id}-straight`}
      /> 
      <input 
        type="hidden"
        value={String(fullHouse)}
        name={`${props.player.player_ref.id}-full_house`}
      /> 
      <input 
        type="hidden"
        value={String(chance)}
        name={`${props.player.player_ref.id}-chance`}
      /> 
      <input 
        type="hidden"
        value={String(yatzy)}
        name={`${props.player.player_ref.id}-yatzy`}
      /> 
      <input 
        type="hidden"
        value={String(pairDice)}
        name={`${props.player.player_ref.id}-pair_dice`}
      /> 
      <input 
        type="hidden"
        value={String(twoPairDice1)}
        name={`${props.player.player_ref.id}-two_pair_dice_1`}
      /> 
      <input 
        type="hidden"
        value={String(twoPairDice2)}
        name={`${props.player.player_ref.id}-two_pair_dice_2`}
      /> 
      <input 
        type="hidden"
        value={String(tripsDice)}
        name={`${props.player.player_ref.id}-trips_dice`}
      /> 
      <input 
        type="hidden"
        value={String(quadsDice)}
        name={`${props.player.player_ref.id}-quads_dice`}
      /> 
      <input 
        type="hidden"
        value={String(fullHouseDice3)}
        name={`${props.player.player_ref.id}-full_house_dice_3`}
      /> 
      <input 
        type="hidden"
        value={String(fullHouseDice2)}
        name={`${props.player.player_ref.id}-full_house_dice_2`}
      />
      <input 
        type="hidden"
        value={String(chanceDice1)}
        name={`${props.player.player_ref.id}-chance_dice_1`}
      />
      <input 
        type="hidden"
        value={String(chanceDice2)}
        name={`${props.player.player_ref.id}-chance_dice_2`}
      />
      <input 
        type="hidden"
        value={String(chanceDice3)}
        name={`${props.player.player_ref.id}-chance_dice_3`}
      />
      <input 
        type="hidden"
        value={String(chanceDice4)}
        name={`${props.player.player_ref.id}-chance_dice_4`}
      />
      <input 
        type="hidden"
        value={String(chanceDice5)}
        name={`${props.player.player_ref.id}-chance_dice_5`}
      />
      <input 
        type="hidden"
        value={String(yatzyDice)}
        name={`${props.player.player_ref.id}-yatzy_dice`}
      />
      <ScoreInput 
        label="One"
        selectedKeys={String(one === -1 ? 6 : one)}
        name={`${props.player.player_ref.id}-one_dice`}
        onChange={(e) => setOne(Number(e.target.value === '6' ? '-1' : e.target.value))}
        items={count}
        formatValue={one === -1}
      />
      <ScoreInput 
        label="Two"
        selectedKeys={String(two === -1 ? 6 : two / 2)} 
        name={`${props.player.player_ref.id}-two_dice`} 
        onChange={(e) => setTwo(e.target.value === '6' ? -1 : Number(e.target.value) * 2)} 
        items={count}
        formatValue={two === -1}
      />
      <ScoreInput 
        label="Three"
        selectedKeys={String(three === -1 ? 6 : three / 3)} 
        name={`${props.player.player_ref.id}-three_dice`} 
        onChange={(e) => setThree(e.target.value === '6' ? -1 : Number(e.target.value) * 3)} 
        items={count}
        formatValue={three === -1}
      />
      <ScoreInput 
        label="Four"
        selectedKeys={String(four === -1 ? 6 : four / 4)} 
        name={`${props.player.player_ref.id}-four_dice`} 
        onChange={(e) => setFour(e.target.value === '6' ? -1 : Number(e.target.value) * 4)} 
        items={count}
        formatValue={four === -1}
      />
      <ScoreInput 
        label="Five"
        selectedKeys={String(five === -1 ? 6 : five / 5)} 
        name={`${props.player.player_ref.id}-five_dice`} 
        onChange={(e) => setFive(e.target.value === '6' ? -1 : Number(e.target.value) * 5)} 
        items={count}
        formatValue={five === -1}
      />
      <ScoreInput 
        label="Six"
        selectedKeys={String(six === -1 ? 6 : six / 6)} 
        name={`${props.player.player_ref.id}-six_dice`} 
        onChange={(e) => setSix(e.target.value === '6' ? -1 : Number(e.target.value) * 6)} 
        items={count}
        formatValue={six === -1}
      />
      <div className={`border border-default h-12 rounded-lg px-3 py-1 flex items-center`} >
        <span>{sum}</span>   
      </div>
      <div className={`border border-default h-12 rounded-lg px-3 py-1 flex items-center`} >
        <span>{bonus}</span>   
      </div>
      <ScoreInput 
        label="Pair"
        selectedKeys={String(pairDice)}
        name={`${props.player.player_ref.id}-pair_dice_score`} 
        onChange={(e) => setPairDice(Number(e.target.value === '7' ? '-1' : e.target.value))} 
        items={dice}
        formatValue={pairDice === -1}
      />
      <div className='flex gap-x-2' >
        <ScoreInput 
          label="Two Pair (1)"
          selectedKeys={String(twoPairDice1 === -1 ? 7 : twoPairDice1)}
          name={`${props.player.player_ref.id}-two_pair_dice_1_score`} 
          onChange={(e) => setTwoPairDice1(Number(e.target.value === '7' ? '-1' : e.target.value))} 
          items={dice}
          formatValue={twoPairDice1 === -1}
        />
        <ScoreInput 
          label="Two Pair (2)"
          selectedKeys={String(twoPairDice2  === -1 ? 7 : twoPairDice2)} 
          name={`${props.player.player_ref.id}-two_pair_dice_2_score`} 
          onChange={(e) => setTwoPairDice2(Number(e.target.value === '7' ? '-1' : e.target.value))} 
          items={dice}
          formatValue={twoPairDice2 === -1}
        />
      </div>
      <ScoreInput 
        label="Trips"
        selectedKeys={String(tripsDice === -1 ? 7 : tripsDice)} 
        name={`${props.player.player_ref.id}-trips_dice_score`} 
        onChange={(e) => setTripsDice(Number(e.target.value === '7' ? '-1' : e.target.value))} 
        items={dice}
        formatValue={tripsDice === -1}
      />
      <ScoreInput 
        label="Quads"
        selectedKeys={String(quadsDice === -1 ? 7 : quadsDice)} 
        name={`${props.player.player_ref.id}-quads_dice_score`} 
        onChange={(e) => setQuadsDice(Number(e.target.value === '7' ? '-1' : e.target.value))} 
        items={dice}
        formatValue={quadsDice === -1}
      />
      <ScoreInput 
        label="Little Straight"
        selectedKeys={String(littleStraight === -1 ? 2 : littleStraight === 15 ? 1 : 0)} 
        name={`${props.player.player_ref.id}-little_straight_dice_score`} 
        onChange={(e) => setLittleStraight(Number(e.target.value) === 1 ? 15 : Number(e.target.value) === 2 ? -1 : 0)} 
        items={[ { id: '0', name: 'No' }, { id: '1', name: 'Yes' }, { id: '2', name: 'Cross Out' } ]} 
        formatValue={littleStraight === -1}
      />
      <ScoreInput 
        label="Straight"
        selectedKeys={String(straight === -1 ? 2 : straight === 20 ? 1 : 0)} 
        name={`${props.player.player_ref.id}-straight_dice_score`} 
        onChange={(e) => setStraight(Number(e.target.value) === 1 ? 20 : Number(e.target.value) === 2 ? -1 : 0)} 
        items={[ { id: '0', name: 'No' }, { id: '1', name: 'Yes' }, { id: '2', name: 'Cross Out' } ]} 
        formatValue={straight === -1}
      />
      <div className='flex gap-x-2' >
        <ScoreInput 
          label="Full House (3)"
          selectedKeys={String(fullHouseDice3 === -1 ? 7 : fullHouseDice3)} 
          name={`${props.player.player_ref.id}-full_house_dice_3_score`} 
          onChange={(e) => setFullHouseDice3(Number(e.target.value === '7' ? '-1' : e.target.value))} 
          items={dice} 
          formatValue={fullHouseDice3 === -1}
        />
        <ScoreInput 
          label="Full House (2)"
          selectedKeys={String(fullHouseDice2 === -1 ? 7 : fullHouseDice2)} 
          name={`${props.player.player_ref.id}-full_house_dice_2_score`} 
          onChange={(e) => setFullHouseDice2(Number(e.target.value === '7' ? '-1' : e.target.value))} 
          items={dice} 
          formatValue={fullHouseDice2 === -1}
        />
      </div>
      <div className='flex gap-x-2' >
        <ScoreInput 
          label="Chance (1)"
          selectedKeys={String(chanceDice1 === -1 ? 7 : chanceDice1)} 
          name={`${props.player.player_ref.id}-chance_dice_1_score`} 
          onChange={(e) => setChanceDice1(Number(e.target.value === '7' ? '-1' : e.target.value))} 
          items={dice} 
          formatValue={chanceDice1 === -1}
        />
        <ScoreInput 
          label="Chance (2)"
          selectedKeys={String(chanceDice2 === -1 ? 7 : chanceDice2)} 
          name={`${props.player.player_ref.id}-chance_dice_2_score`} 
          onChange={(e) => setChanceDice2(Number(e.target.value === '7' ? '-1' : e.target.value))} 
          items={dice} 
          formatValue={chanceDice2 === -1}
        />
        <ScoreInput 
          label="Chance (3)"
          selectedKeys={String(chanceDice3 === -1 ? 7 : chanceDice3)} 
          name={`${props.player.player_ref.id}-chance_dice_3_score`} 
          onChange={(e) => setChanceDice3(Number(e.target.value === '7' ? '-1' : e.target.value))} 
          items={dice} 
          formatValue={chanceDice3 === -1}
        />
        <ScoreInput 
          label="Chance (4)"
          selectedKeys={String(chanceDice4 === -1 ? 7 : chanceDice4)} 
          name={`${props.player.player_ref.id}-chance_dice_4_score`} 
          onChange={(e) => setChanceDice4(Number(e.target.value === '7' ? '-1' : e.target.value))} 
          items={dice} 
          formatValue={chanceDice4 === -1}
        />
        <ScoreInput 
          label="Chance (5)"
          selectedKeys={String(chanceDice5 === -1 ? 7 : chanceDice5)} 
          name={`${props.player.player_ref.id}-chance_dice_5_score`} 
          onChange={(e) => setChanceDice5(Number(e.target.value === '7' ? '-1' : e.target.value))} 
          items={dice} 
          formatValue={chanceDice5 === -1}
        />
      </div>
        <ScoreInput 
          label="Yatzy"
          selectedKeys={String(yatzyDice === -1 ? 7 : yatzyDice)} 
          name={`${props.player.player_ref.id}-yatzy_dice_score_score`} 
          onChange={(e) => setYatzyDice(Number(e.target.value === '7' ? '-1' : e.target.value))} 
          items={dice} 
          formatValue={yatzyDice === -1}
        />
      <div className={`bg-${props.player.player_ref.color}-50 text-${props.player.player_ref.color} h-12 rounded-lg px-3 py-1 flex items-center`} >
        <span>{total}</span>   
      </div>
    </div>
  )
}

export default ScoreBoard