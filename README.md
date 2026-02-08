# Basic js throttle/debounce module
This module exports a `CallTimer` class. The first argument should be a table of options.
```
{
  throttle = 0,
  debounce = 0,
  throttleLimit = 1
}
```
## Properties
* `throttle` Throttle time in ms.
* `debounce` Debounce time in ms.
* `throttleLimit` The # of calls allowed before future ones are throttled.
* `throttleCount` The property that keeps track of how many times `force()` was called, including internal calls.
* `queue` An array of calls to make in the future. Each item should be an object with properties `beforeDebounce` and `debounce`.
> [!NOTE]
> The `throttle` property does not take effect immediately. If a previous throttle timer was already started, changing this property will only take effect once it finishes. 
## Methods
* `limitReached(): Boolean` Returns whether the throttle limit has been reached.
* `do(beforeDebounce: Function = ()=>{}, debounce: Function = ()=>{}): Boolean` Returns `false` if the throttle limit has been reached. Otherwise returns `true` and calls `force(beforeDebounce, debounce)`.
* `force(beforeDebounce: Function = ()=>{}, debounce: Function = ()=>{})` Starts throttle timer if `throttleCount` is a falsy value, increments `throttleCount`, calls `beforeDebounce()`, and calls `registerDebounce(debounce)` if `debounce` is a truthy value.
* `registerDebounce(callback: Function = ()=>{})` Increments `#debounceCount` private field, assigns the updated value to a constant, and starts a debounce timer. Calls `callback()` when the timer finishes if the current value of `#debounceCount` is equal to the value of the constant.
* `schedule(priority: Boolean, beforeDebounce: Function = ()=>{}, debounce: Function = ()=>{})` If `limitReached()` is false, `do(beforeDebounce, debounce)` is called immediately. Else, an object containing the passed functions is created and added to the start of `queue` (when `priority` is truthy) or end of `queue` (when `priority` is falsy).
* `forceScheduled(count: Number = Infinity)` Slices out a portion of `queue` and iterates through it, calling `force(item.beforeDebounce, item.debounce)` for each item. Then, the other items of `queue` are sliced out into a new array, which is assigned to `queue`.

The demo page is hosted [here](https://basic-js-throttle-debounce.pages.dev/demo).
