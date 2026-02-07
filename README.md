# Basic js throttle/debounce module
This module exports a class constructor (I like to call it the "Timer" class) that takes in a table of options.
```
{
  throttle = 0,
  throttleLimit = 1,
  debounce = 0
}
```
## Properties
* `throttle` Throttle time in ms.
* `throttleLimit` The # of calls allowed before future ones are throttled.
* `debounce` Debounce time in ms.
* `throttleCount` The property that keeps track of how many times a function was called.
> [!NOTE]
> The `throttle` property does not take effect immediatley. If a previous throttle timer was already started, changing this property will only take effect once it finishes.
## Methods
This class only has one method, the `call(callback, beforeDebounce)` method. The callback parameter is called with throttle on debounce, and the beforeDebounce parameter is only called with throttle. Neither parameter is required. This method returns `false` if the call was throttled, and `true` if the call wasn't throttled.

The demo page is hosted [here](https://basic-js-throttle-debounce.pages.dev/demo).
