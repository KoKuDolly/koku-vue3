import { watch, createProxy } from "../../reactive/index.js"

const data = { foo: 1 }
const obj = createProxy(data)

function getData(params) {
  if (params === 1) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(1)
      }, 100)
    })
  } else if (params === 2) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(2)
      }, 2000)
    })
  } else {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(3)
      }, 200)
    })
  }
}

let finalData
watch(
  obj,
  async (newValue, oldValue, onInvalidate) => {
    console.log(newValue, oldValue, "???")
    let expired = false
    onInvalidate(() => {
      expired = true
    })

    const res = await getData(newValue.foo)
    if (!expired) {
      finalData = res
    }
    console.log(finalData, res, expired)
  },
  {
    immediate: true,
    flush: "post",
  }
)

obj.foo++
setTimeout(() => {
  obj.foo++
}, 200)
