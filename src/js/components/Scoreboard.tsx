import {sortBy, sum} from "ramda"
import * as React from "react"

import {Data, Team} from "../types"

export type ScoreboardProps = Data

function orderTeams(teams: Array<Team>) {
  return sortBy(
    (t) => t.total,
    teams.map((t) => {
      const r1 = sum(t.round1Scores.darts ?? [])
      const r2 = sum(t.round2Scores.darts ?? [])
      const r3 = sum(t.round3Scores.darts ?? [])

      return {
        name: t.name,
        total: r1 + r2 + r3,
      }
    }),
  ).reverse()
}

export default function Scoreboard({selected, teams}: ScoreboardProps) {
  const ordered = orderTeams(teams).filter((t) => t.name !== "")

  const firstPlaceTotal = ordered[0]?.total ?? 0
  const thirdPlaceTotal = ordered[2]?.total ?? 0

  return (
    <table className="border-separate border-spacing-y-2 border-spacing-x-0 w-full">
      <thead>
        <tr>
          <th className="w-[50px] p-4 uppercase font-bold tracking-widest text-center text-white">
            #
          </th>
          <th className="p-4 uppercase font-bold tracking-widest text-left text-white">
            Team
          </th>
          <th className="w-[125px] p-4 uppercase font-bold tracking-widest text-center text-white">
            Total
          </th>
          <th className="w-[125px] p-4 uppercase font-bold tracking-widest text-center text-white">
            To go 1st
          </th>
          <th className="w-[125px] p-4 uppercase font-bold tracking-widest text-center text-white">
            To go 3rd
          </th>
        </tr>
      </thead>
      <tbody>
        {ordered.length ? (
          ordered.map((t, i) => {
            const bg = selected === t.name ? "bg-amber-300" : "bg-gray-500"
            const textColor =
              selected === t.name ? "text-black" : "text-slate-100"
            const className = `${bg}`

            return (
              <tr key={t.name} className={className}>
                <td className={`p-4 text-center ${textColor}`}>{i + 1}</td>
                <td className={`p-4 ${textColor}`}>{t.name}</td>
                <td className={`p-4 text-center ${textColor}`}>{t.total}</td>
                <td className={`p-4 text-center ${textColor}`}>
                  {i > 0 ? firstPlaceTotal - t.total : ""}
                </td>
                <td className={`p-4 text-center ${textColor}`}>
                  {i > 2 ? thirdPlaceTotal - t.total : ""}
                </td>
              </tr>
            )
          })
        ) : (
          <tr className="bg-gray-500">
            <td colSpan={5} className="p-4 text-center text-slate-100">
              No teams
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}
