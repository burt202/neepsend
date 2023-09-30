import {sortBy, sum} from "ramda"
import * as React from "react"

interface Team {
  name: string
  round1Scores?: Array<number>
  round2Scores?: Array<number>
  round3Scores?: Array<number>
}

export interface ScoreboardProps {
  selected?: string
  teams: Array<Team>
}

function orderTeams(teams: Array<Team>) {
  return sortBy(
    (t) => t.total,
    teams.map((t) => {
      const r1 = sum(t.round1Scores ?? [])
      const r2 = sum(t.round2Scores ?? [])
      const r3 = sum(t.round3Scores ?? [])

      return {
        name: t.name,
        total: r1 + r2 + r3,
      }
    }),
  ).reverse()
}

export default function Scoreboard({selected, teams}: ScoreboardProps) {
  const ordered = orderTeams(teams)
  console.log("selected", selected)

  const firstPlaceTotal = ordered[0].total
  const thirdPlaceTotal = ordered[2].total

  return (
    <table>
      <thead>
        <tr>
          <td>Team</td>
          <td>Total</td>
          <td>To go 1st</td>
          <td>To go 3rd</td>
        </tr>
      </thead>
      <tbody>
        {ordered.map((t, i) => {
          return (
            <tr key={t.name}>
              <td>{t.name}</td>
              <td>{t.total}</td>
              <td>{i > 0 ? firstPlaceTotal - t.total : ""}</td>
              <td>{i > 2 ? thirdPlaceTotal - t.total : ""}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
