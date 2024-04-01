import {Settings} from "lucide-react"
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
    const interval = setInterval(() => {
      const dataString = localStorage.getItem(LOCAL_STORAGE_KEY) ?? ""
      const data = validateData(dataString)

      if (data) {
        setState(data)
      } else {
        setState(DEFAULT_STATE)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="px-4 w-full min-h-full min-[960px]:w-[930px] min-[960px]:p-0 min-[960px]:my-0 min-[960px]:mx-auto">
      <div className="text-center">
        <img src="logo-new.png" className="h-[110px]" />
      </div>

      <Scoreboard {...state} />

      <div className="absolute right-0 bottom-0 p-4">
        <Link to="/backend" target="_blank">
          <span className="text-white" title="Backend">
            <Settings size={32} />
          </span>
        </Link>
      </div>
    </div>
  )
}
