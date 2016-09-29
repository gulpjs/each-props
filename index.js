'use strict';

var inspect = require('util').inspect;
var isPlainObject = require('lodash.isplainobject');

module.exports = function(obj, callback, opts) {
  if (!isPlainObject(obj)) {
    throw new TypeError('1st argument needs to be a plain object: ' +
      inspect(obj));
  }

  if (typeof callback !== 'function') {
    throw new TypeError('2nd argument needs to be a function: ' +
      inspect(callback));
  }

  if (opts == null) {
    opts = {};
  } else if (!isPlainObject(opts)) {
    throw new TypeError('3rd argument needs to be an object: ' +
      inspect(opts));
  }

  if (opts.sort != null && typeof opts.sort !== 'function') {
    throw new TypeError('The `sort` property in 3rd argument needs to be a ' +
      'function: ' + inspect(opts));
  }

  opts.depth = 0;

  foreachNode(obj, '', callback, opts);
};

function foreachNode(node, basekey, callback, info) {
  var keys = Object.keys(node);
  if (typeof info.sort === 'function') {
    keys = info.sort(keys);
  }

  for (var i = 0, n = keys.length; i < n; i++) {
    var key = keys[i];
    var keychain = basekey + '.' + key;
    var value = node[key];

    var childinfo = createChildInfo(info, node, i, n);

    if (callback(value, keychain.slice(1), childinfo)) {
      continue;
    }

    if (isPlainObject(value)) {
      foreachNode(value, keychain, callback, childinfo);
    }
  }
}

function createChildInfo(info, node, i, n) {
  var childinfo = {};

  var keys = Object.keys(info);
  for (var j = 0; j < keys.length; j++) {
    var key = keys[j];
    childinfo[key] = info[key];
  }

  childinfo.index = i;
  childinfo.count = n;
  childinfo.depth = info.depth + 1;
  childinfo.parent = node;

  return childinfo;
}
