import {z} from "zod"

export const teamSchema = z.object({
  name: z.string(),
  round1Scores: z.object({
    total: z.number().optional(),
    darts: z.array(z.number()),
  }),
  round2Scores: z.object({
    total: z.number().optional(),
    darts: z.array(z.number()),
  }),
  round3Scores: z.object({
    total: z.number().optional(),
    darts: z.array(z.number()),
  }),
})

export const dataSchema = z.object({
  selected: z.string().optional(),
  teams: z.array(teamSchema),
})

export type Team = z.infer<typeof teamSchema>

export type Data = z.infer<typeof dataSchema>
