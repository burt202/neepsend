import {z} from "zod"

export const teamSchema = z.object({
  name: z.string(),
  round1Scores: z.array(z.number()).optional(),
  round2Scores: z.array(z.number()).optional(),
  round3Scores: z.array(z.number()).optional(),
})

export const dataSchema = z.object({
  selected: z.string().optional(),
  teams: z.array(teamSchema),
})

export type Team = z.infer<typeof teamSchema>

export type Data = z.infer<typeof dataSchema>
