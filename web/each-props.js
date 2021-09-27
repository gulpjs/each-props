(function (f) {
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = f();
  } else if (typeof define === 'function' && define.amd) {
    define([], f);
  } else {
    var g;
    if (typeof window !== 'undefined') {
      g = window;
    } else if (typeof global !== 'undefined') {
      g = global;
    } else if (typeof self !== 'undefined') {
      g = self;
    } else {
      g = this;
    }
    g.eachProps = f();
  }
})(function () {
  var define, module, exports;
  return (function () {
    function r(e, n, t) {
      function o(i, f) {
        if (!n[i]) {
          if (!e[i]) {
            var c = 'function' == typeof require && require;
            if (!f && c) return c(i, !0);
            if (u) return u(i, !0);
            var a = new Error("Cannot find module '" + i + "'");
            throw ((a.code = 'MODULE_NOT_FOUND'), a);
          }
          var p = (n[i] = { exports: {} });
          e[i][0].call(
            p.exports,
            function (r) {
              var n = e[i][1][r];
              return o(n || r);
            },
            p,
            p.exports,
            r,
            e,
            n,
            t
          );
        }
        return n[i].exports;
      }
      for (
        var u = 'function' == typeof require && require, i = 0;
        i < t.length;
        i++
      )
        o(t[i]);
      return o;
    }
    return r;
  })()(
    {
      1: [
        function (require, module, exports) {
          'use strict';

          var isPlainObject = require('is-plain-object').isPlainObject;
          var defaults = require('object.defaults/immutable');

          module.exports = function (obj, fn, opts) {
            if (!isObject(obj)) {
              return;
            }

            if (typeof fn !== 'function') {
              return;
            }

            if (!isPlainObject(opts)) {
              opts = {};
            }

            forEachChild(obj, '', fn, 0, opts);
          };

          function forEachChild(node, baseKey, fn, depth, opts) {
            var keys = Object.keys(node);
            if (typeof opts.sort === 'function') {
              var sortedKeys = opts.sort(keys);
              if (Array.isArray(sortedKeys)) {
                keys = sortedKeys;
              }
            }

            depth += 1;

            for (var i = 0, n = keys.length; i < n; i++) {
              var key = keys[i];
              var keyChain = baseKey + '.' + key;
              var value = node[key];

              var nodeInfo = defaults(opts);
              nodeInfo.name = key;
              nodeInfo.index = i;
              nodeInfo.count = n;
              nodeInfo.depth = depth;
              nodeInfo.parent = node;

              var notDigg = fn(value, keyChain.slice(1), nodeInfo);
              if (notDigg || !isPlainObject(value)) {
                continue;
              }

              forEachChild(value, keyChain, fn, depth, opts);
            }
          }

          function isObject(v) {
            return Object.prototype.toString.call(v) === '[object Object]';
          }
        },
        { 'is-plain-object': 6, 'object.defaults/immutable': 8 },
      ],
      2: [
        function (require, module, exports) {
          /*!
           * array-each <https://github.com/jonschlinkert/array-each>
           *
           * Copyright (c) 2015, 2017, Jon Schlinkert.
           * Released under the MIT License.
           */

          'use strict';

          /**
           * Loop over each item in an array and call the given function on every element.
           *
           * ```js
           * each(['a', 'b', 'c'], function(ele) {
           *   return ele + ele;
           * });
           * //=> ['aa', 'bb', 'cc']
           *
           * each(['a', 'b', 'c'], function(ele, i) {
           *   return i + ele;
           * });
           * //=> ['0a', '1b', '2c']
           * ```
           *
           * @name each
           * @alias forEach
           * @param {Array} `array`
           * @param {Function} `fn`
           * @param {Object} `thisArg` (optional) pass a `thisArg` to be used as the context in which to call the function.
           * @return {undefined}
           * @api public
           */

          module.exports = function each(arr, cb, thisArg) {
            if (arr == null) return;

            var len = arr.length;
            var idx = -1;

            while (++idx < len) {
              var ele = arr[idx];
              if (cb.call(thisArg, ele, idx, arr) === false) {
                break;
              }
            }
          };
        },
        {},
      ],
      3: [
        function (require, module, exports) {
          /*!
           * array-slice <https://github.com/jonschlinkert/array-slice>
           *
           * Copyright (c) 2014-2017, Jon Schlinkert.
           * Released under the MIT License.
           */

          'use strict';

          module.exports = function slice(arr, start, end) {
            var len = arr.length;
            var range = [];

            start = idx(len, start);
            end = idx(len, end, len);

            while (start < end) {
              range.push(arr[start++]);
            }
            return range;
          };

          function idx(len, pos, end) {
            if (pos == null) {
              pos = end || 0;
            } else if (pos < 0) {
              pos = Math.max(len + pos, 0);
            } else {
              pos = Math.min(pos, len);
            }

            return pos;
          }
        },
        {},
      ],
      4: [
        function (require, module, exports) {
          /*!
           * for-in <https://github.com/jonschlinkert/for-in>
           *
           * Copyright (c) 2014-2017, Jon Schlinkert.
           * Released under the MIT License.
           */

          'use strict';

          module.exports = function forIn(obj, fn, thisArg) {
            for (var key in obj) {
              if (fn.call(thisArg, obj[key], key, obj) === false) {
                break;
              }
            }
          };
        },
        {},
      ],
      5: [
        function (require, module, exports) {
          /*!
           * for-own <https://github.com/jonschlinkert/for-own>
           *
           * Copyright (c) 2014-2017, Jon Schlinkert.
           * Released under the MIT License.
           */

          'use strict';

          var forIn = require('for-in');
          var hasOwn = Object.prototype.hasOwnProperty;

          module.exports = function forOwn(obj, fn, thisArg) {
            forIn(obj, function (val, key) {
              if (hasOwn.call(obj, key)) {
                return fn.call(thisArg, obj[key], key, obj);
              }
            });
          };
        },
        { 'for-in': 4 },
      ],
      6: [
        function (require, module, exports) {
          'use strict';

          Object.defineProperty(exports, '__esModule', { value: true });

          /*!
           * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
           *
           * Copyright (c) 2014-2017, Jon Schlinkert.
           * Released under the MIT License.
           */

          function isObject(o) {
            return Object.prototype.toString.call(o) === '[object Object]';
          }

          function isPlainObject(o) {
            var ctor, prot;

            if (isObject(o) === false) return false;

            // If has modified constructor
            ctor = o.constructor;
            if (ctor === undefined) return true;

            // If has modified prototype
            prot = ctor.prototype;
            if (isObject(prot) === false) return false;

            // If constructor does not have an Object-specific method
            if (prot.hasOwnProperty('isPrototypeOf') === false) {
              return false;
            }

            // Most likely a plain Object
            return true;
          }

          exports.isPlainObject = isPlainObject;
        },
        {},
      ],
      7: [
        function (require, module, exports) {
          /*!
           * isobject <https://github.com/jonschlinkert/isobject>
           *
           * Copyright (c) 2014-2017, Jon Schlinkert.
           * Released under the MIT License.
           */

          'use strict';

          module.exports = function isObject(val) {
            return (
              val != null &&
              typeof val === 'object' &&
              Array.isArray(val) === false
            );
          };
        },
        {},
      ],
      8: [
        function (require, module, exports) {
          'use strict';

          var slice = require('array-slice');

          var defaults = require('./mutable');

          /**
           * Extends an empty object with properties of one or
           * more additional `objects`
           *
           * @name .defaults.immutable
           * @param  {Object} `objects`
           * @return {Object}
           * @api public
           */

          module.exports = function immutableDefaults() {
            var args = slice(arguments);
            return defaults.apply(null, [{}].concat(args));
          };
        },
        { './mutable': 9, 'array-slice': 3 },
      ],
      9: [
        function (require, module, exports) {
          'use strict';

          var each = require('array-each');
          var slice = require('array-slice');
          var forOwn = require('for-own');
          var isObject = require('isobject');

          /**
           * Extends the `target` object with properties of one or
           * more additional `objects`
           *
           * @name .defaults
           * @param  {Object} `target` The target object. Pass an empty object to shallow clone.
           * @param  {Object} `objects`
           * @return {Object}
           * @api public
           */

          module.exports = function defaults(target, objects) {
            if (target == null) {
              return {};
            }

            each(slice(arguments, 1), function (obj) {
              if (isObject(obj)) {
                forOwn(obj, function (val, key) {
                  if (target[key] == null) {
                    target[key] = val;
                  }
                });
              }
            });

            return target;
          };
        },
        { 'array-each': 2, 'array-slice': 3, 'for-own': 5, isobject: 7 },
      ],
    },
    {},
    [1]
  )(1);
});
