import { ref, effect } from "./reactive/index.js"

const data = { text: "hello world" }
const obj = ref(data)

effect(() => {
  console.log(obj.text)
})

setTimeout(() => {
  obj.text = "hello vue"
}, 3000)
