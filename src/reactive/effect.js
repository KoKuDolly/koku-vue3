import { variable } from "../global/index.js"
// let { activeEffect, effectStack } = variable
// let activeEffect = variable.activeEffect
// let effectStack = variable.effectStack

const cleanup = (effectFn) => {
  for (let i = 0; i < effectFn.deps.length; i++) {
    const deps = effectFn.deps[i]
    deps.delete(effectFn)
  }
  effectFn.deps.length = 0
}

export const effect = (fn, options = {}) => {
  const effectFn = () => {
    cleanup(effectFn)
    variable.activeEffect = effectFn
    variable.effectStack.push(variable.activeEffect)
    const res = fn()
    variable.effectStack.pop()
    variable.activeEffect =
      variable.effectStack[variable.effectStack.length - 1]
    return res
  }
  effectFn.options = options
  effectFn.deps = []
  if (!options.lazy) {
    effectFn()
  }
  return effectFn
}
