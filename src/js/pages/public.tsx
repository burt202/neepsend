import * as React from "react"
import {useState, useEffect} from "react"

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

  return (
    <div>
      <table>
        {foo.map((t) => {
          return (
            <tr key={t.name}>
              <td>{t.name}</td>
              <td>{t.total}</td>
            </tr>
          )
        })}
      </table>
    </div>
  )
}
