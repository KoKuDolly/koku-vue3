import { createProxy } from "./createProxy.js"

function createReactive(source, isShallow = false, isReadonly = false) {
  return createProxy(source, isShallow, isReadonly)
}

export const reactive = (source) => {
  return createReactive(source)
}

export const shallowReactive = (source) => {
  return createReactive(source, true)
}

export const readonly = (source) => {
  return createReactive(source, false, true)
}

export const shallowReadonly = (source) => {
  return createReactive(source, true, true)
}
