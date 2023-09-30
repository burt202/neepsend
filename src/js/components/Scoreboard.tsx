import {sortBy, sum} from "ramda"
import * as React from "react"

import {Data, Team} from "../types"

export type ScoreboardProps = Data

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

  const firstPlaceTotal = ordered[0]?.total ?? 0
  const thirdPlaceTotal = ordered[2]?.total ?? 0

  return (
    <table className="border-separate border-spacing-y-2 border-spacing-x-0">
      <thead>
        <tr>
          <td className="w-[510px] p-4 uppercase font-bold tracking-widest">
            Team
          </td>
          <td className="w-[130px] p-4 uppercase font-bold tracking-widest text-center">
            Total
          </td>
          <td className="w-[130px] p-4 uppercase font-bold tracking-widest text-center">
            To go 1st
          </td>
          <td className="w-[130px] p-4 uppercase font-bold tracking-widest text-center">
            To go 3rd
          </td>
        </tr>
      </thead>
      <tbody>
        {ordered.length ? (
          ordered.map((t, i) => {
            const bg = selected === t.name ? "bg-amber-300" : "bg-gray-300"
            const className = `${bg}`

            return (
              <tr key={t.name} className={className}>
                <td className="p-4">{t.name}</td>
                <td className="p-4 text-center">{t.total}</td>
                <td className="p-4 text-center">
                  {i > 0 ? firstPlaceTotal - t.total : ""}
                </td>
                <td className="p-4 text-center">
                  {i > 2 ? thirdPlaceTotal - t.total : ""}
                </td>
              </tr>
            )
          })
        ) : (
          <tr className="bg-gray-300">
            <td colSpan={4} className="p-4 text-center">
              No teams
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}
