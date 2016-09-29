'use strict';

var testrun = require('testrun').mocha;

var eachProps = require('../');

function testfn(testcase) {
  var logs = [];
  if ('fn' in testcase) {
    eachProps(testcase.obj, testcase.fn, testcase.opts);
  } else {
    eachProps(testcase.obj, function(value, keychain, info) {
      var log = {};
      Object.keys(info).forEach(function(key) {
        log[key] = info[key];
      });
      log.keychain = keychain;
      delete log.parent;
      delete log.sort;
      logs.push(log);

      if ('ret' in testcase) {
        return testcase.ret(keychain);
      }
    }, testcase.opts);
  }
  return logs;
}

testrun('eachProps', testfn, [
  {
    name: 'When data types of arguments are illegal',
    cases: [
      {
        name: 'And obj is ${testcase.obj}',
        obj: null,
        error: TypeError,
      },
      {
        name: 'And obj is ${testcase.obj}',
        obj: 'abc',
        error: TypeError,
      },
      {
        name: 'And fn is ${testcase.fn}',
        obj: {},
        fn: null,
        error: TypeError,
      },
      {
        name: 'And fn is ${testcase.fn}',
        obj: {},
        fn: 'abc',
        error: TypeError,
      },
      {
        name: 'And fn is ${testcase.fn}',
        obj: {},
        fn: {},
        error: TypeError,
      },
      {
        name: 'And opts is ${testcase.opts}',
        obj: {},
        opts: 0,
        error: TypeError,
      },
      {
        name: 'And opts is ${testcase.opts}',
        obj: {},
        opts: 'abc',
        error: TypeError,
      },
      {
        name: 'And opts.sort is ${testcase.opts}',
        obj: {},
        opts: { sort: 0 },
        error: TypeError,
      },
      {
        name: 'And opts.sort is ${testcase.opts}',
        obj: {},
        opts: { sort: 'abc' },
        error: TypeError,
      },
    ],
  },
  {
    name: 'When obj is a plain object',
    cases: [
      {
        name: 'And obj is empty',
        obj: {},
        expected: [],
      },
      {
        name: 'And obj is single depth',
        obj: { a: 1, b: 2, c: 3 },
        expected: [
          { keychain: 'a', index: 0, count: 3, depth: 1 },
          { keychain: 'b', index: 1, count: 3, depth: 1 },
          { keychain: 'c', index: 2, count: 3, depth: 1 },
        ],
      },
      {
        name: 'And obj is multiple depth',
        obj: { a: 1, b: { c: 'C', d: 'D', e: { f: 'F' } } },
        expected: [
          { keychain: 'a', index: 0, count: 2, depth: 1 },
          { keychain: 'b', index: 1, count: 2, depth: 1 },
          { keychain: 'b.c', index: 0, count: 3, depth: 2 },
          { keychain: 'b.d', index: 1, count: 3, depth: 2 },
          { keychain: 'b.e', index: 2, count: 3, depth: 2 },
          { keychain: 'b.e.f', index: 0, count: 1, depth: 3 },
        ],
      },
      {
        name: 'And a sort function is specified',
        obj: { q: 1, w: 2, e: 3, r: 4, t: 5, y: 6 },
        opts: {
          sort: function(arr) {
            return arr.sort();
          }
        },
        expected: [
          { keychain: 'e', index: 0, count: 6, depth: 1 },
          { keychain: 'q', index: 1, count: 6, depth: 1 },
          { keychain: 'r', index: 2, count: 6, depth: 1 },
          { keychain: 't', index: 3, count: 6, depth: 1 },
          { keychain: 'w', index: 4, count: 6, depth: 1 },
          { keychain: 'y', index: 5, count: 6, depth: 1 },
        ],
      },
      {
        name: 'And obj is multiple depth and a sort function is specified',
        obj: { z: 1, x: { c: 'C', v: 'D', b: { n: 'F', m: 'G' } } },
        opts: {
          sort: function(arr) {
            return arr.sort();
          },
        },
        expected: [
          { keychain: 'x', index: 0, count: 2, depth: 1 },
          { keychain: 'x.b', index: 0, count: 3, depth: 2 },
          { keychain: 'x.b.m', index: 0, count: 2, depth: 3 },
          { keychain: 'x.b.n', index: 1, count: 2, depth: 3 },
          { keychain: 'x.c', index: 1, count: 3, depth: 2 },
          { keychain: 'x.v', index: 2, count: 3, depth: 2 },
          { keychain: 'z', index: 1, count: 2, depth: 1 },
        ],
      },
      {
        name: 'And stop digging when the return value is true',
        obj: { z: 1, x: { c: 'C', v: 'D', b: { n: 'F', m: 'G' }, a: 'H' } },
        ret: function(keychain) {
          return (keychain === 'x.b');
        },
        opts: {
          sort: function(arr) {
            return arr.sort();
          },
        },
        expected: [
          { keychain: 'x', index: 0, count: 2, depth: 1 },
          { keychain: 'x.a', index: 0, count: 4, depth: 2 },
          { keychain: 'x.b', index: 1, count: 4, depth: 2 },
          { keychain: 'x.c', index: 2, count: 4, depth: 2 },
          { keychain: 'x.v', index: 3, count: 4, depth: 2 },
          { keychain: 'z', index: 1, count: 2, depth: 1 },
        ],
      },
      {
        name: 'And obj is multiple depth and the each nodes are passed ' +
              ' values in opts',
        obj: { z: 1, x: { c: 'C', v: 'D', b: { n: 'F', m: 'G' } } },
        opts: {
          sort: function(arr) {
            return arr.sort();
          },
          m: 'ABC',
          n: 9,
        },
        expected: [
          { keychain: 'x', index: 0, count: 2, depth: 1, m: 'ABC', n: 9 },
          { keychain: 'x.b', index: 0, count: 3, depth: 2, m: 'ABC', n: 9 },
          { keychain: 'x.b.m', index: 0, count: 2, depth: 3, m: 'ABC', n: 9 },
          { keychain: 'x.b.n', index: 1, count: 2, depth: 3, m: 'ABC', n: 9 },
          { keychain: 'x.c', index: 1, count: 3, depth: 2, m: 'ABC', n: 9 },
          { keychain: 'x.v', index: 2, count: 3, depth: 2, m: 'ABC', n: 9 },
          { keychain: 'z', index: 1, count: 2, depth: 1, m: 'ABC', n: 9 },
        ],
      },
    ],
  },
]);
