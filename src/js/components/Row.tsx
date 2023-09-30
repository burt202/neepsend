import * as React from "react"

interface RowProps {
  name: string
}

export default function Row({name}: RowProps) {
  return (
    <div>
      <input placeholder="Team name" value={name} />
    </div>
  )
}
