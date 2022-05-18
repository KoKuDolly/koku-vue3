import { reactive, effect } from "../../reactive/index.js"

// const arr = reactive(["foo"])

// effect(() => {
//   console.log(arr.length)
// })

// // arr[1] = "bar"
// arr.length = 0


// const obj = {}
// const arr = reactive([obj])
// console.log(arr.includes(arr[0]))
// console.log(arr.includes(obj))
// console.log(arr.indexOf(obj))
// console.log(arr.indexOf(arr[0]))
// console.log(arr.lastIndexOf(arr[0]))
// console.log(arr.lastIndexOf(arr[0]))

const arr = reactive([])
effect(() => {
    arr.push(1)
})

effect(() => {
    arr.push(1)
})

console.log(arr)