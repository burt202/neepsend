import {Goal, ChevronDown, ChevronLeft} from "lucide-react"
import * as React from "react"
import {ChangeEvent} from "react"

import {Team} from "../types"
import RoundRow from "./RoundRow"

interface TeamEntryProps {
  team: Team
  selected?: string
  onSelectedToggle: () => void
  onExpandCollapse: () => void
  onUpdate: (team: Team) => void
  expanded: boolean
}

export default function TeamEntry({
  team,
  selected,
  onSelectedToggle,
  onExpandCollapse,
  onUpdate,
  expanded,
}: TeamEntryProps) {
  const {name, round1Scores, round2Scores, round3Scores} = team

  const showAsSelected = selected === team.name

  return (
    <div className="my-2 pb-2 border-solid border-0 border-b-2 border-gray-300">
      <div className="flex justify-between">
        <div className="flex">
          <div
            className="text-white cursor-pointer h-[30px] mr-2"
            title="Toggle Highlight"
            onClick={onSelectedToggle}
          >
            <Goal size={30} />
          </div>
          <input
            placeholder="Team name"
            value={name}
            style={{
              background: showAsSelected ? "#49aef3" : "white",
              border: "1px solid",
            }}
            className="p-1 w-[450px] h-[30px]"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              onUpdate({...team, name: e.target.value})
            }}
          />
        </div>
        <div
          className="text-white h-[30px] cursor-pointer"
          title="Expand/Collapse"
          onClick={onExpandCollapse}
        >
          {expanded ? <ChevronDown size={30} /> : <ChevronLeft size={30} />}
        </div>
      </div>
      {expanded && (
        <div>
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
      )}
    </div>
  )
}
