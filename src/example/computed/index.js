import { ref, computed, effect } from "../../reactive/index.js"

const data = { foo: 1, bar: 2 }
const obj = ref(data)
const sumRes = computed(() => obj.foo + obj.bar)

effect(() => {
  console.log(sumRes.value)
})

obj.foo++
