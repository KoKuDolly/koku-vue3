import { ref } from "./ref.js"
export const reactive = (source) => {
  return ref(source)
}
