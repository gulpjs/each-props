'use strict';

var isPlainObject = require('is-plain-object');
var objectAssign = require('object-assign');

module.exports = function(obj, fn, opts) {
  if (!isPlainObject(obj)) {
    return;
  }

  if (typeof fn !== 'function') {
    return;
  }

  var nodeInfo = isPlainObject(opts) ? objectAssign({}, opts) : {};
  nodeInfo.depth = 0;

  forEachChild(obj, '', fn, nodeInfo);
};

function forEachChild(node, baseKey, fn, nodeInfo) {
  var keys = Object.keys(node);
  if (typeof nodeInfo.sort === 'function') {
    var sortedKeys = nodeInfo.sort(keys);
    if (Array.isArray(sortedKeys)) {
      keys = sortedKeys;
    }
  }

  for (var i = 0, n = keys.length; i < n; i++) {
    var key = keys[i];
    var keyChain = baseKey + '.' + key;
    var value = node[key];

    var childInfo = objectAssign({}, nodeInfo);
    childInfo.index = i;
    childInfo.count = n;
    childInfo.depth = nodeInfo.depth + 1;
    childInfo.parent = node;

    var notDigg = fn(value, keyChain.slice(1), childInfo);
    if (notDigg || !isPlainObject(value)) {
      continue;
    }

    forEachChild(value, keyChain, fn, childInfo);
  }
}
