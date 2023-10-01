import * as React from "react"
import {ChangeEvent} from "react"

import {Team} from "../types"
import RoundRow from "./RoundRow"

interface TeamEntryProps {
  team: Team
  selected?: string
  onSelectedToggle: () => void
  onUpdate: (team: Team) => void
}

export default function TeamEntry({
  team,
  selected,
  onSelectedToggle,
  onUpdate,
}: TeamEntryProps) {
  const {name, round1Scores, round2Scores, round3Scores} = team

  const showAsSelected = selected === team.name

  return (
    <div className="mb-4 pb-4 border-solid border-0 border-b-2 border-gray-300">
      <div className="flex items-center">
        <img
          src="dartboard.svg"
          className="h-[24px] cursor-pointer mr-2"
          onClick={onSelectedToggle}
        />
        <input
          placeholder="Team name"
          value={name}
          style={{
            background: showAsSelected ? "#fcd34d" : "white",
            border: "1px solid",
          }}
          disabled={showAsSelected}
          className="p-2 w-[450px]"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            onUpdate({...team, name: e.target.value})
          }}
        />
      </div>
      <RoundRow
        text="R1"
        scores={round1Scores}
        onUpdate={({total, darts}) => {
          onUpdate({
            ...team,
            round1Scores: {total, darts},
          })
        }}
      />
      <RoundRow
        text="R2"
        scores={round2Scores}
        onUpdate={({total, darts}) => {
          onUpdate({
            ...team,
            round2Scores: {total, darts},
          })
        }}
      />
      <RoundRow
        text="R3"
        scores={round3Scores}
        onUpdate={({total, darts}) => {
          onUpdate({
            ...team,
            round3Scores: {total, darts},
          })
        }}
      />
    </div>
  )
}
