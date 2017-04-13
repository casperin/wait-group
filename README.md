# Wait Group

[![CircleCI](https://circleci.com/gh/casperin/wait-group.svg?style=svg)](https://circleci.com/gh/casperin/wait-group)

Lose implementation of Golang's `WaitGroup`. It offers a different, very simple, way of working with async control flows.

Its strength is its simplicity. It offers no help dealing with errors or data as such (you have to use scope for that). In return you get a ridiculously simple interface.

## Install & import
```sh
npm install wait-group
```

```js
const waitGroup = require('wait-group')
```

## Usage

The module has a very simple interface. It only exposes one funcion, taking no arguments, that will give you an instance of a `waitGroup`. The `waitGroup`'s exposed functions are:

- `wg.add(n : Number)`: Call this when you start a process that the `waitGroup`
  has to wait for. `n` is usually just `1` and must be above `0`. If it is
  called without arguments, it is assumed that `n = 1`.
- `wg.done()`: Call this when an added function is done. For instance when a
  callback returns or a promise resolves (or rejects).
- `wg.wait(fn : function)`: Functions added with this will be called whenever
  all that were added are done. If the waitGroup instance is aleady completed,
  then it will be called immediately; much like you'd expect `.then()` on a
  promise to behave.

## Examples

```js
// Very simple, but it uses the entire interface
var wg = waitGroup()
wg.add(1)

wg.wait(function () {
  console.log('setTimeout is done')
})

setTimeout(wg.done, 200)
```

```js
// Here we run three requests in parallel, and handle the result.
var results = {}
var error = null
var wg = waitGroup()

wg.wait(function () {
  if (error) return console.log('Oh no!')
  console.log('We got:', results)
})

// first
wg.add(1)
someCallbackyRequest('/api/gimme-a', function (err, data) {
  wg.done()
  if (err) return error = err
  results.a = data
})

// first
wg.add(1)
someCallbackyRequest('/api/gimme-b', function (err, data) {
  wg.done()
  if (err) return error = err
  results.b = data
})

// third
wg.add(1)
someCallbackyRequest('/api/gimme-c', function (err, data) {
  wg.done()
  if (err) return error = err
  results.c = data
})
```

## License

It's less than 50 lines of code. Why are you reading this? Well, it's MIT of course.

