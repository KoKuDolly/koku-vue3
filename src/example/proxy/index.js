import { effect, ref } from "../../reactive/index.js"

const obj = {
  foo: 1,
  get bar() {
    return this.foo
  },
  set bar(value) {
    console.log(value)
    return value
  },
}

const p = ref(obj)

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

effect(() => {
  for (const key in p) {
    console.log(key)
  }
})
p.bar = 2
