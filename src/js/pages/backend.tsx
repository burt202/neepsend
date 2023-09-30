import * as React from "react"
import {useState} from "react"

import AddTeam from "../components/AddTeam"

export interface Team {
  name: string
  total: number
  round1Total: number
  round2Total: number
  round3Total: number
}

export default function Backend() {
  const [teams, setTeams] = useState<Array<Team>>([])

  return (
    <>
      <div>
        <table>
          {teams.map((t) => {
            return (
              <tr key={t.name}>
                <td>{t.name}</td>
                <td>
                  {t.round1Total} ({Math.floor(t.round1Total / 10)})
                </td>
                <td>
                  {t.round2Total} ({Math.floor(t.round2Total / 10)})
                </td>
                <td>
                  {t.round3Total} ({Math.floor(t.round3Total / 10)})
                </td>
              </tr>
            )
          })}
        </table>
        <AddTeam
          onAdd={(newTeam) => {
            const a = [
              ...teams,
              {
                name: newTeam.name,
                total:
                  newTeam.round1Total +
                  newTeam.round2Total +
                  newTeam.round3Total,
                round1Total: newTeam.round1Total,
                round2Total: newTeam.round2Total,
                round3Total: newTeam.round3Total,
              },
            ]
            setTeams(a)

            localStorage.setItem("teams", JSON.stringify(a))
          }}
        />
      </div>
    </>
  )
}
