export function timing (modules, time = console.time, timeEnd = console.timeEnd) {
  const newModules = { }
  for (const key in modules) {
    const val = modules[key]
    if (typeof val === 'function') {
      const funcToWrapped = val
      newModules[key] = async function () {
        time(`${key} use`)
        await funcToWrapped.apply(funcToWrapped, arguments)
        timeEnd(`${key} use`)
      }
    }
    else {
      newModules[key] = val
    }
  }
  return newModules
}