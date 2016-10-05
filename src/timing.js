export function timing (modules, time = console.time, timeEnd = console.timeEnd) {
  const newModules = { }
  for (const key in modules) {
    const val = modules[key]
    if (typeof val === 'function') {
      const funcToWrapped = val
      newModules[key] = async function () {
        const argsArray = Object.keys(arguments).map(key => arguments[key])        
        time(`${key} use`)
        const result = await funcToWrapped.apply(null, argsArray)
        timeEnd(`${key} use`)
        return result
      }
    }
    else {
      newModules[key] = val
    }
  }
  return newModules
}