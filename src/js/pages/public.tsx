import * as React from "react"
import {useState, useEffect} from "react"

import Scoreboard from "../components/Scoreboard"
import {Team} from "./backend"

const getState = (state: string) => {
  try {
    return JSON.parse(state) as unknown as Array<Team>
  } catch {
    return []
  }
}

export default function Public() {
  const [state, setState] = useState("")

  useEffect(() => {
    setInterval(() => {
      const teams = localStorage.getItem("teams") ?? ""
      setState(teams)
    }, 5000)
  })

  const foo = getState(state)
  console.log("foo", foo)

  const data = [
    {name: "AAA", round1Scores: [12]},
    {name: "BBB", round1Scores: [4]},
    {name: "CCC", round1Scores: [6]},
    {name: "DDD", round1Scores: [6]},
  ]

  return (
    <div>
      <div className="text-center">
        <img src="/logo.png" className="h-[150px]" />
      </div>
      <Scoreboard teams={data} selected="BBB" />
    </div>
  )
}
