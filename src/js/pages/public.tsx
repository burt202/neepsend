import * as React from "react"
import {useState, useEffect} from "react"
import {Link} from "react-router-dom"

import Scoreboard from "../components/Scoreboard"
import {Data} from "../types"
import {validateData} from "../utils"
import {LOCAL_STORAGE_KEY} from "./backend"

const DEFAULT_STATE = {teams: []}

export default function Public() {
  const [state, setState] = useState<Data>(DEFAULT_STATE)

  useEffect(() => {
    setInterval(() => {
      const dataString = localStorage.getItem(LOCAL_STORAGE_KEY) ?? ""
      const data = validateData(dataString)

      if (data) {
        setState(data)
      } else {
        setState(DEFAULT_STATE)
      }
    }, 2500)
  })

  return (
    <div>
      <div className="text-center">
        <img src="logo.png" className="h-[150px]" />
      </div>

      <Scoreboard {...state} />

      <div className="absolute right-0 bottom-0 p-4">
        <Link to="/backend" target="_blank">
          <img src="settings.svg" className="h-[24px]" />
        </Link>
      </div>
    </div>
  )
}
