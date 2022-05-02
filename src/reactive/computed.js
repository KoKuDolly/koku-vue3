import { effect } from "./effect.js"
import { trigger, track } from "./ref.js"

export const computed = (getter) => {
  let value
  let dirty = true
  let effectFn = effect(getter, {
    lazy: true,
    scheduler() {
      dirty = true
      trigger(obj, "value")
    },
  })

  const obj = {
    get value() {
      if (dirty) {
        value = effectFn()
        dirty = false
      }
      track(obj, "value")
      return value
    },
  }

  return obj
}
