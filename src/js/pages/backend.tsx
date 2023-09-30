import * as React from "react"
import {useState} from "react"

import Row from "../components/Row"

export const LOCAL_STORAGE_KEY = "data"

export interface Team {
  name: string
  round1Total: {total?: number; darts: Array<number>}
  round2Total: {total?: number; darts: Array<number>}
  round3Total: {total?: number; darts: Array<number>}
}

const EMPTY_STATE = {
  name: "",
  round1Total: {total: undefined, darts: []},
  round2Total: {total: undefined, darts: []},
  round3Total: {total: undefined, darts: []},
}

// prepopulate from local storage
// delete team
// select team

export default function Backend() {
  const [teams, setTeams] = useState<Array<Team>>([EMPTY_STATE])

  return (
    <>
      <div className="py-4">
        {teams.map((t, i) => {
          return <Row key={i} name={t.name} />
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
