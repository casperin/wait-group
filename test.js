var tape = require('tape')
var waitGroup = require('.')

tape('Basic', function (t) {
  t.plan(1)
  var wg = waitGroup()
  wg.wait(t.pass)
  wg.add(1)
  wg.done()
})

tape('Async', function (t) {
  t.plan(1)
  var wg = waitGroup()
  wg.wait(t.pass)
  wg.add(1)
  setTimeout(wg.done, 100)
})

tape('Call done before add', function (t) {
  var wg = waitGroup()
  t.throws(wg.done)
  t.end()
})

tape('Multiple waits', function (t) {
  t.plan(2)
  var wg = waitGroup()
  wg.wait(t.pass)
  wg.wait(t.pass)
  wg.add(1)
  wg.done()
})

tape('Handling results', function (t) {
  t.plan(4)
  var results = {}
  var wg = waitGroup()

  wg.wait(function () {
    t.equal(results.a, 'alice')
    t.equal(results.b, 'bob')
    t.equal(results.c, 'carol')
    t.equal(results.d, 'darwin')
  })

  // first
  wg.add(1)
  setTimeout(function () {
    results.a = 'alice'
    wg.done()
  }, 200)

  // second
  wg.add(1)
  setTimeout(function () {
    results.b = 'bob'
    results.c = 'carol'
    wg.done()
  }, 30)

  // third
  wg.add(1)
  setTimeout(function () {
    results.d = 'darwin'
    wg.done()
  })
})
