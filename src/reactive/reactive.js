import { createProxy } from "./createProxy.js"

const reactiveMap = new Map()

function createReactive(source, isShallow = false, isReadonly = false) {
  return createProxy(source, isShallow, isReadonly)
}

export const reactive = (source) => {
  const existionProxy = reactiveMap.get(source)
  if (existionProxy) return existionProxy

  const proxy = createReactive(source)
  reactiveMap.set(source, proxy)
  return proxy
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
