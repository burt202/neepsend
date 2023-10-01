import {adjust} from "ramda"
import * as React from "react"
import {ChangeEvent} from "react"

interface RoundRowProps {
  text: string
  scores: {total?: number; darts: Array<number>}
  onUpdate: ({total, darts}: {total?: number; darts: Array<number>}) => void
}

function calculateNoOfDarts(total?: number) {
  if (!total) return null
  return Math.floor(total / 10)
}

export default function RoundRow({text, scores, onUpdate}: RoundRowProps) {
  const {total, darts} = scores
  const noOfDarts = calculateNoOfDarts(total)

  return (
    <div className="mt-4 flex">
      <span className="uppercase font-bold tracking-widest w-[30px] inline-block h-[35px] leading-[35px]">
        {text}
      </span>
      <input
        value={total ?? ""}
        type="number"
        className="p-2 w-[75px] h-[35px]"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const total = parseInt(e.target.value, 10)

          onUpdate({
            total,
            darts: Array.from(Array(calculateNoOfDarts(total) ?? 0)).map(() => {
              return 0
            }),
          })
        }}
      />
      <span className="uppercase font-bold tracking-widest  w-[100px] inline-block text-center  h-[35px] leading-[35px]">
        = {noOfDarts ?? "?"} darts
      </span>
      <div className="grid gap-2 grid-cols-8">
        {Array.from(Array(noOfDarts ?? 0)).map((_, i) => {
          return (
            <input
              key={i}
              value={darts[i]}
              type="number"
              className="p-2 w-[75px]"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                onUpdate({
                  total,
                  darts: adjust(i, () => parseInt(e.target.value, 10), darts),
                })
              }}
            />
          )
        })}
      </div>
    </div>
  )
}
