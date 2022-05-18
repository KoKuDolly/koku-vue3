import { reactive, effect } from "../../reactive/index.js"

const arr = reactive(["foo"])

effect(() => {
  console.log(arr.length)
})

// arr[1] = "bar"
arr.length = 0
