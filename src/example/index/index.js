import { ref, effect } from "../../reactive/index.js"

const data = { text: 1 }
const obj = ref(data)

// 调度器
const jobQueue = new Set()
const p = Promise.resolve()
let isFlushing = false
function flushJob() {
  if (isFlushing) return
  isFlushing = true
  p.then(() => {
    jobQueue.forEach((job) => job())
  }).finally(() => {
    isFlushing = false
  })
}

effect(
  () => {
    console.log(obj.text)
  },
  {
    scheduler(fn) {
      // setTimeout(fn)
      jobQueue.add(fn)
      flushJob()
    },
  }
)

obj.text++
obj.text++

console.log("结束了")
