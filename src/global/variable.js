export const variable = {
  activeEffect: null,
  effectStack: [],
  bucket: new WeakMap(),
  ITERATE_KEY: Symbol(),
  TriggerType: {
    SET: "SET",
    ADD: "ADD",
    DELETE: "DELETE",
  },
}
