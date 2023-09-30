import {dataSchema} from "./types"

export function validateData(state: string) {
  try {
    const res = dataSchema.safeParse(JSON.parse(state))
    if (res.success) {
      return res.data
    }

    console.log("Parse error:", res.error)

    return null
  } catch (e) {
    console.log("Unexpected error:", e)
    return null
  }
}
