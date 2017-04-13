module.exports = function waitGroup () {
  var running = 0,
      started = false,
      waiters = []

  function finish () {
    for (var i = 0; i < waiters.length; i++) waiters[i]()
  }

  function isDone () {
    return started && !running
  }

  function add (n) {
    n = arguments.leng === 0 ? 1 : n
    if (n < 1) return
    if (isDone()) throw new Error('Wait group is done.')
    running = running + n
    started = true
  }

  function done () {
    if (!started) throw new Error("Dan't call .done() on a wait-group before you call .add(n)")
    running--
    if (isDone()) finish()
  }

  function wait (fn) {
    if (isDone()) fn()
    else waiters.push(fn)
  }

  return {
    isDone: isDone,
    add: add,
    done: done,
    wait: wait
  }
}
