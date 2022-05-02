import { effect, createProxy } from "../../reactive/index.js"

const obj = {
  foo: +0,
  get bar() {
    return this.foo
  },
  set bar(value) {
    // console.log(value)
    return value
  },
}

const p = createProxy(obj)

// effect(() => {
//   console.log(p.bar)
// })
// p.foo++

// console.log(p.foo)
// delete p.foo
// console.log(p.foo)

// effect(() => {
//   console.log("foo" in p)
// })

// effect(() => {
//   for (const key in p) {
//     console.log(key)
//   }
// })
// p.bar = 2

effect(() => {
  console.log(p.foo)
})
p.foo = -0
