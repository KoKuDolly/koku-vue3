import { effect } from "./index.js"
import { cloneDeep } from "lodash-es"

function traverse(value, seen = new Set()) {
  if (typeof value !== "object" || value === null || seen.has(value)) return
  // 将数据添加到seen中，代表遍历地读取过了，避免循环引用引起的死循环
  seen.add(value)
  // 暂时不考虑数组等其他结构
  // 假设value就是一个对象，使用for...in读取对象的每一个值，并递归的调用traverse进行处理
  for (const k in value) {
    traverse(value[k], seen)
  }
  return value
}

export const watch = (source, cb, options = {}) => {
  let getter

  if (typeof source === "function") {
    getter = source
  } else {
    getter = () => traverse(source)
  }
  let oldValue, newValue
  let cleanup
  function onInvalidate(fn) {
    cleanup = fn
  }
  const job = () => {
    newValue = effectFn()
    if (cleanup) {
      cleanup()
    }
    cb(newValue, oldValue, onInvalidate)
    oldValue = cloneDeep(newValue)
  }
  const effectFn = effect(() => getter(), {
    lazy: true,
    scheduler: () => {
      if (options.flush === "post") {
        const p = Promise.resolve()
        p.then(job)
      } else {
        job()
      }
    },
  })
  if (options.immediate) {
    job()
  } else {
    oldValue = cloneDeep(effectFn())
  }
}
