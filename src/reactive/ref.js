import { variable } from "../global/index.js"
// let { activeEffect, bucket } = variable
// let activeEffect = variable.activeEffect
// let bucket = variable.bucket

const track = (target, key) => {
  if (!variable.activeEffect) return
  let depsMap = variable.bucket.get(target)
  if (!depsMap) {
    variable.bucket.set(target, (depsMap = new Map()))
  }
  let deps = depsMap.get(key)
  if (!deps) {
    depsMap.set(key, (deps = new Set()))
  }
  deps.add(variable.activeEffect)

  variable.activeEffect.deps.push(deps)
}

const trigger = (target, key) => {
  const depsMap = variable.bucket.get(target)
  if (!depsMap) return
  const effects = depsMap.get(key)
  const effectToRun = new Set()
  effects &&
    effects.forEach((effectFn) => {
      if (effectFn !== variable.activeEffect) {
        effectToRun.add(effectFn)
      }
    })
  effectToRun &&
    effectToRun.forEach((effectFn) => {
      if (effectFn.options.scheduler) {
        effectFn.options.scheduler(effectFn)
      } else {
        effectFn()
      }
    })
}

export const ref = (data) => {
  return new Proxy(data, {
    get(target, key) {
      track(target, key)
      return target[key]
    },
    set(target, key, value) {
      target[key] = value
      trigger(target, key)
      return true
    },
  })
}
