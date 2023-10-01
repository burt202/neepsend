import {adjust} from "ramda"
import * as React from "react"
import {useState} from "react"

import TeamEntry from "../components/TeamEntry"
import {Team} from "../types"

export const LOCAL_STORAGE_KEY = "data"

const EMPTY_STATE: Team = {
  name: "",
  round1Scores: {total: undefined, darts: []},
  round2Scores: {total: undefined, darts: []},
  round3Scores: {total: undefined, darts: []},
}

// TODO
// prepopulate from local storage
// delete team (or filter when name is empty)

export default function Backend() {
  const [teams, setTeams] = useState<Array<Team>>([EMPTY_STATE])
  const [selected, setSelected] = useState<string | undefined>(undefined)

  return (
    <>
      <div className="py-4">
        {teams.map((t, i) => {
          return (
            <TeamEntry
              key={i}
              team={t}
              selected={selected}
              onSelectedToggle={() => {
                const newValue = selected === t.name ? undefined : t.name
                setSelected(newValue)

                localStorage.setItem(
                  LOCAL_STORAGE_KEY,
                  JSON.stringify({teams, selected: newValue}),
                )
              }}
              onUpdate={(team) => {
                const updated = adjust(i, () => team, teams)
                setTeams(updated)

                localStorage.setItem(
                  LOCAL_STORAGE_KEY,
                  JSON.stringify({teams: updated, selected}),
                )
              }}
            />
          )
        })}

        <div className="py-4">
          <button
            className="rounded-lg font-bold cursor-pointer px-8 py-2 text-lg border-0"
            style={{
              background: "#0C5039",
              color: "#DEAA16",
            }}
            onClick={() => {
              setTeams([...teams, EMPTY_STATE])
            }}
          >
            Add
          </button>
        </div>

        <div className="absolute right-0 bottom-0 p-4 cursor-pointer text-blue-500">
          <a
            onClick={() => {
              if (confirm("Are you sure?") == true) {
                localStorage.setItem(LOCAL_STORAGE_KEY, "")
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
