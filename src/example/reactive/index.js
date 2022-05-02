import { effect, reactive, shallowReactive } from "../../reactive/index.js"

// const obj = {}
// const proto = { bar: 1 }
// const child = reactive(obj)
// const parent = reactive(proto)

// Object.setPrototypeOf(child, parent)

// effect(() => {
//   console.log(child.bar)
// })

// child.bar = 2

const obj = shallowReactive({ foo: { bar: 1 } })
effect(() => {
  console.log(obj.foo.bar)
})

obj.foo = { bar: 2 }
