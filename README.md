# TimingJs
Measure performance in each Node.JS function

# Purpose

When you have all db-called function in one module, like this
```
module.exports = {
  getTaskByName
  getMessageById
}
```

Sometimes, you need to measure which db-called is slowed. Is it `getTaskByName`? Is it `getMessageById`?

TimingJs will automatically wrapped every function in modules and return a new module, which will provide timing for each promise-based function automatically.

# How to use

```
const { timing } = require('timing-js')
const module = timing({
  getTaskByName
  getMessageById
})
```

Now, when you call `module.getTaskByName`, it will automatically log time use in the functions

