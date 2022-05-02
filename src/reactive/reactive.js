import { ref } from "./ref.js"

function createReactive(source, isShallow = false) {
  return ref(source, isShallow)
}

export const reactive = (source) => {
  return createReactive(source)
}

export const shallowReactive = (source) => {
  return createReactive(source, true)
}