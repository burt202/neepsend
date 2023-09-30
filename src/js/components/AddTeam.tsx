import * as React from "react"
import {useState, ChangeEvent} from "react"

interface AddTeamProps {
  onAdd: ({
    name,
    round1Total,
    round2Total,
    round3Total,
  }: {
    name: string
    round1Total: number
    round2Total: number
    round3Total: number
  }) => void
}

export default function AddTeam({onAdd}: AddTeamProps) {
  const [name, setName] = useState<string | null>(null)
  const [round1Total, setRound1Total] = useState<number | null>(null)
  const [round2Total, setRound2Total] = useState<number | null>(null)
  const [round3Total, setRound3Total] = useState<number | null>(null)

  return (
    <>
      <input
        value={name ?? ""}
        placeholder="Name"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
      />
      <input
        value={round1Total ?? ""}
        placeholder="R1"
        type="number"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setRound1Total(parseInt(e.target.value, 10))
        }
      />
      <input
        value={round2Total ?? ""}
        placeholder="R2"
        type="number"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setRound2Total(parseInt(e.target.value, 10))
        }
      />
      <input
        value={round3Total ?? ""}
        placeholder="R3"
        type="number"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setRound3Total(parseInt(e.target.value, 10))
        }
      />
      <button
        onClick={() => {
          onAdd({
            name: name ?? "",
            round1Total: round1Total ?? 0,
            round2Total: round2Total ?? 0,
            round3Total: round3Total ?? 0,
          })
        }}
      >
        Add
      </button>
    </>
  )
}
