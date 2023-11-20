import {dataSchema} from "./types"

export function validateData(state: string) {
  if (state.length === 0) {
    return null
  }

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
