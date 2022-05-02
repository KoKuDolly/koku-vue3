import { variable } from "../global/index.js"
import { reactive } from "./reactive.js"
// let { activeEffect, bucket } = variable
// let activeEffect = variable.activeEffect
// let bucket = variable.bucket

export const track = (target, key) => {
  if (!variable.activeEffect) return
  let depsMap = variable.bucket.get(target)
  if (!depsMap) {
    variable.bucket.set(target, (depsMap = new Map()))
  }
  let deps = depsMap.get(key)
  if (!deps) {
    depsMap.set(key, (deps = new Set()))
  }
  deps.add(variable.activeEffect)

  variable.activeEffect.deps.push(deps)
}

export const trigger = (target, key, type) => {
  const depsMap = variable.bucket.get(target)
  if (!depsMap) return

  const effects = depsMap.get(key)
  const effectToRun = new Set()
  effects &&
    effects.forEach((effectFn) => {
      if (effectFn !== variable.activeEffect) {
        effectToRun.add(effectFn)
      }
    })
  if (
    type === variable.TriggerType.ADD ||
    type === variable.TriggerType.DELETE
  ) {
    // 取出 ITERATE_KEY 相关的副作用函数
    const iterateEffects = depsMap.get(variable.ITERATE_KEY)
    // 将与 ITERATE_KEY 相关的副作用函数也添加到 effectToRun
    iterateEffects &&
      iterateEffects.forEach((effectFn) => {
        if (effectFn !== variable.activeEffect) {
          effectToRun.add(effectFn)
        }
      })
  }

  effectToRun &&
    effectToRun.forEach((effectFn) => {
      if (effectFn.options.scheduler) {
        effectFn.options.scheduler(effectFn)
      } else {
        effectFn()
      }
    })
}

export const ref = (data, isShallow) => {
  return new Proxy(data, {
    get(target, key, receiver) {
      if (key === "raw") {
        return target
      }
      track(target, key)
      const res = Reflect.get(target, key, receiver)

      if (isShallow) {
        return res
      }

      if (typeof res === "object" && res !== null) {
        return reactive(res)
      }

      return res
    },
    set(target, key, newVal, receiver) {
      const oldVal = target[key]
      const type = Object.prototype.hasOwnProperty.call(target, key)
        ? variable.TriggerType.SET
        : variable.TriggerType.ADD
      const res = Reflect.set(target, key, newVal, receiver)
      // if (
      //   (oldVal !== newVal || (oldVal === 0 && 1 / oldVal !== 1 / newVal)) &&
      //   (oldVal === oldVal || newVal === newVal)
      // ) {
      // if (
      //   !(
      //     (oldVal === newVal && (oldVal !== 0 || 1 / oldVal === 1 / newVal)) ||
      //     (oldVal !== oldVal && newVal !== newVal)
      //   )
      // ) {
      // 解决了 NaN 和  +0 -0 问题
      if (target === receiver.raw) {
        // 屏蔽由于原型引起的更新
        if (!Object.is(oldVal, newVal)) {
          trigger(target, key, type)
        }
      }
      return res
    },
    deleteProperty(target, key) {
      const hadKey = Object.prototype.hasOwnProperty.call(target, key)
      const res = Reflect.deleteProperty(target, key)
      if (res && hadKey) {
        trigger(target, key, variable.TriggerType.DELETE)
      }
      return res
    },
    has(target, key) {
      track(target, key)
      return Reflect.has(target, key)
    },
    ownKeys(target) {
      track(target, variable.ITERATE_KEY)
      return Reflect.ownKeys(target)
    },
  })
}
