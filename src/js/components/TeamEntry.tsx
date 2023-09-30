import * as React from "react"
import {ChangeEvent} from "react"

import {Team} from "../types"
import RoundRow from "./RoundRow"

interface TeamEntryProps {
  team: Team
  onUpdate: (team: Team) => void
}

export default function TeamEntry({team, onUpdate}: TeamEntryProps) {
  const {name, round1Scores, round2Scores, round3Scores} = team

  return (
    <div className="mb-4 pb-4 border-solid border-0 border-b-2 border-gray-300">
      <input
        placeholder="Team name"
        value={name}
        className="p-2 w-[450px]"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          onUpdate({...team, name: e.target.value})
        }}
      />
      <RoundRow
        text="R1"
        total={round1Scores.total}
        onUpdate={({total}) => {
          onUpdate({
            ...team,
            round1Scores: {total, darts: []},
          })
        }}
      />
      <RoundRow
        text="R2"
        total={round2Scores.total}
        onUpdate={({total}) => {
          onUpdate({
            ...team,
            round2Scores: {total, darts: []},
          })
        }}
      />
      <RoundRow
        text="R3"
        total={round3Scores.total}
        onUpdate={({total}) => {
          onUpdate({
            ...team,
            round3Scores: {total, darts: []},
          })
        }}
      />
    </div>
  )
}