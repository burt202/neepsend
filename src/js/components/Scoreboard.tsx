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
  const teamNames = teams.map((t) => t.name)
  const unique = [...new Set(teamNames)]
  const duplicateNamesPresent = teamNames.length !== unique.length

  const ordered = orderTeams(teams).filter((t) => t.name !== "")

  const firstPlaceTotal = ordered[0]?.total ?? 0
  const thirdPlaceTotal = ordered[2]?.total ?? 0

  return (
    <table className="border-separate border-spacing-y-2 border-spacing-x-0 w-full">
      <thead>
        <tr className="bg-[#771220]">
          <th className="w-[50px] p-2 uppercase font-bold tracking-widest text-center text-white">
            #
          </th>
          <th className="p-2 uppercase font-bold tracking-widest text-left text-white">
            Team
          </th>
          <th className="w-[100px] p-2 uppercase font-bold tracking-widest text-center text-white">
            Total
          </th>
          <th className="w-[100px] p-2 uppercase font-bold tracking-widest text-center text-white">
            To go 1st
          </th>
          <th className="w-[100px] p-2 uppercase font-bold tracking-widest text-center text-white">
            To go 3rd
          </th>
        </tr>
      </thead>
      <tbody>
        {duplicateNamesPresent ? (
          <tr className="bg-gray-500">
            <td colSpan={5} className="p-4 text-center text-slate-100">
              Duplicate team names present
            </td>
          </tr>
        ) : ordered.length ? (
          ordered.map((t, i) => {
            const isSelected = selected === t.name
            const rowBackground = isSelected ? "bg-[#49aef3]" : "bg-[#fefaee]"
            const className = `${rowBackground}`

            return (
              <tr key={t.name} className={className}>
                <td className={`p-1 text-center font-bold text-lg text-black`}>
                  {i + 1}
                </td>
                <td className={`p-1 font-bold text-lg text-black`}>{t.name}</td>
                <td className={`p-1 text-center font-bold text-lg text-black`}>
                  {t.total}
                </td>
                <td
                  className={`p-1 text-center font-bold text-lg text-black ${
                    isSelected ? "bg-[#49aef3]" : "bg-[#fef063]"
                  }`}
                >
                  {i > 0 ? firstPlaceTotal - t.total : ""}
                </td>
                <td
                  className={`p-1 text-center font-bold text-lg text-black ${
                    isSelected ? "bg-[#49aef3]" : "bg-[#fe6965]"
                  }`}
                >
                  {i > 2 ? thirdPlaceTotal - t.total : ""}
                </td>
              </tr>
            )
          })
        ) : (
          <tr className="bg-[#fefaee]">
            <td colSpan={5} className="p-1 text-center font-bold text-lg">
              No teams
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}
