import {adjust, max} from "ramda"
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
    <div className="mt-1 flex">
      <span className="uppercase font-bold text-white tracking-widest w-[32px] inline-block h-[30px] leading-[30px]">
        {text}
      </span>
      <input
        value={total ?? ""}
        maxLength={3}
        className="p-1 w-[75px] h-[30px]"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const value = max(
            e.target.value === "" ? 0 : parseInt(e.target.value, 10),
            0,
          )

          onUpdate({
            total: value,
            darts: Array.from(Array(calculateNoOfDarts(value) ?? 0)).map(() => {
              return 0
            }),
          })
        }}
      />
      <span className="uppercase font-bold tracking-widest text-white w-[100px] inline-block text-center h-[30px] leading-[30px]">
        = {noOfDarts ?? "?"} darts
      </span>
      <div className="grid gap-1 grid-cols-9">
        {Array.from(Array(noOfDarts ?? 0)).map((_, i) => {
          return (
            <input
              key={i}
              value={darts[i]}
              maxLength={3}
              className="p-1 w-[75px] h-[30px]"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const value = max(
                  e.target.value === "" ? 0 : parseInt(e.target.value, 10),
                  0,
                )

                onUpdate({
                  total,
                  darts: adjust(i, () => value, darts),
                })
              }}
            />
          )
        })}
      </div>
    </div>
  )
}
