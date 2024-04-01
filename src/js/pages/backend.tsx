import {adjust} from "ramda"
import * as React from "react"
import {useState} from "react"

import TeamEntry from "../components/TeamEntry"
import {Team} from "../types"
import {validateData} from "../utils"

export const LOCAL_STORAGE_KEY = "data"

const EMPTY_STATE: Team = {
  name: "",
  round1Scores: {total: undefined, darts: []},
  round2Scores: {total: undefined, darts: []},
  round3Scores: {total: undefined, darts: []},
}

export default function Backend() {
  const dataString = localStorage.getItem(LOCAL_STORAGE_KEY) ?? ""
  const data = validateData(dataString)

  const [teams, setTeams] = useState<Array<Team>>(
    data ? data.teams : [EMPTY_STATE],
  )
  const [selected, setSelected] = useState<string | undefined>(
    data ? data.selected : undefined,
  )

  const [expanded, setExpanded] = useState<Array<number>>([])

  const teamNames = teams.map((t) => t.name)
  const unique = [...new Set(teamNames)]
  const duplicateNamesPresent = teamNames.length !== unique.length

  return (
    <>
      <div className="page w-full min-[1280px]:w-[1250px]">
        {teams.map((t, i) => {
          return (
            <TeamEntry
              key={i}
              team={t}
              selected={selected}
              onSelectedToggle={() => {
                if (t.name.length === 0) return

                const newValue = selected === t.name ? undefined : t.name
                setSelected(newValue)

                localStorage.setItem(
                  LOCAL_STORAGE_KEY,
                  JSON.stringify({teams, selected: newValue}),
                )

                setExpanded([i])
              }}
              onUpdate={(team) => {
                const updated = adjust(i, () => team, teams)
                setTeams(updated)

                localStorage.setItem(
                  LOCAL_STORAGE_KEY,
                  JSON.stringify({teams: updated, selected}),
                )
              }}
              onExpandCollapse={() => {
                if (expanded.includes(i)) {
                  setExpanded(
                    expanded.filter((j) => {
                      return j !== i
                    }),
                  )
                } else {
                  setExpanded([...expanded, i])
                }
              }}
              expanded={expanded.includes(i)}
            />
          )
        })}

        {duplicateNamesPresent && (
          <p className="font-bold text-red-400">
            Duplicate team names present!
          </p>
        )}

        <div className="mb-2">
          <button
            className="rounded-lg font-bold cursor-pointer px-4 py-2 text-lg border-0 text-[#DEAA16] bg-emerald-950 uppercase tracking-widest"
            onClick={() => {
              const teamsWithBlankName = teams.filter(
                (t) => t.name.length === 0,
              )

              if (teamsWithBlankName.length === 1) return
              if (duplicateNamesPresent) return

              setTeams([...teams, EMPTY_STATE])
            }}
          >
            Add Team
          </button>
        </div>

        <div className="fixed right-0 bottom-0 p-4 cursor-pointer text-[#DEAA16] uppercase font-bold tracking-widest">
          <a
            onClick={() => {
              if (confirm("Are you sure?") == true) {
                localStorage.setItem(
                  LOCAL_STORAGE_KEY,
                  JSON.stringify({teams: [EMPTY_STATE]}),
                )
                setTeams([EMPTY_STATE])
              }
            }}
          >
            Reset
          </a>
        </div>
      </div>
    </>
  )
}
