# each-props [![Build Status][travis-img]][travis-url] [![Build Status][appveyor-img]][appveyor-url]

Process object properties deeply.

[![NPM][npm-img]][npm-url]

[npm-img]: https://nodei.co/npm/each-props.png
[npm-url]: https://nodei.co/npm/each-props/
[travis-img]: https://travis-ci.org/sttk/each-props.svg?branch=master
[travis-url]: https://travis-ci.org/sttk/each-props
[appveyor-img]: https://ci.appveyor.com/api/projects/status/github/sttk/each-props?branch=master&svg=true
[appveyor-url]: https://ci.appveyor.com/project/sttk/each-props

Install
-------

```
$ npm i each-props --save
```

Usage
-----

* Load this module :

    ```js
    const eachProps = require('each-props');
    ```

* Apply a function to all (= non plain object) properties.

    ```js
    var obj = { a: 1, b: { c: 'CCC', d: { e: 'EEE' } } };

    eachProps(obj, function(value, keychain, nodeinfo) {
      if (keychain === 'a') {
        nodeinfo.parent['a'] = value * 2;
      } else if (keychain === 'b.c') {
        nodeinfo.parent['c'] = value.toLowerCase();
      } else if (keychain === 'b.d') {
        return true; // stop to dig
      } else if (keychain === 'b.d.e') {
        nodeinfo.parent['e'] = value.toLowerCase();
      }
    });
    console.log(obj);
    // => { a: 2, b: { c: 'ccc', d: { e: 'EEE' } } };
    ```

API
---

### eachProps(obj, callback [, opts]) => void

Executes the *callback* function for all properties.

##### **Arguments :** 

   * **obj** [object] : A plain object to be treated.
   * **callback** [function] : A function to treat the plain object.
   * **opts** [object] : An object to be able to has options.

##### **API of *callback* function**

* ***callback(value, key, info) => object***

    * **Arguments :**
        * **value** [any] : The property value.
        * **keychain** [string] : A string concatenated the hierarchical keys with dots.
        * **nodeinfo** [object] : An object which contains properties: `index`, `count`, `depth`, `parent`, `sort`, and can contains more properties by specifying in **eachProps**'s *opts*. 

    * **Returns :**
        * [boolean] : Stops digging child properties if `true`.

    ##### **Properties of *nodeinfo* :**

    * ***nodeinfo*** *[object]*
        * **index** [number] : The index of the property among the sibling properties.
        * **count** [number] : The count of the sibling properties.
        * **depth** [number] : The depth in the property hierarchy.
        * **parent** [object] : The parent property.
        * **sort** [function] : A sort function which orders the child properties. (Not sort If null.) 

##### **Properties of *opts* :**

* ***opts*** *[object]*
    * **sort** [function] : A sort function which orders the same level properties. (Not sort if null.)
    * ... and any properties you want to pass to each node.

License
-------

MIT
