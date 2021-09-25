<p align="center">
  <a href="http://gulpjs.com">
    <img height="257" width="114" src="https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png">
  </a>
</p>

# each-props

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][ci-image]][ci-url] [![Coveralls Status][coveralls-image]][coveralls-url]

Processes each properties of an object deeply.

## Install

To install from npm:

```sh
$ npm i each-props --save
```

## Load this module

For Node.js:

```js
const eachProps = require('each-props');
```

For Web browser:

```html
<script src="each-props.min.js"></script>
```

## Usage

Apply a function to all (non plain object) properties.

```js
var obj = { a: 1, b: { c: 'CCC', d: { e: 'EEE' } } };

eachProps(obj, function(value, keyChain, nodeInfo) {
  if (keyChain === 'a') {
    nodeInfo.parent['a'] = value * 2;
  } else if (keyChain === 'b.c') {
    nodeInfo.parent['c'] = value.toLowerCase();
  } else if (keyChain === 'b.d') {
    return true; // stop to dig
  } else if (keyChain === 'b.d.e') {
    nodeInfo.parent['e'] = value.toLowerCase();
  }
});

console.log(obj);
// => { a: 2, b: { c: 'ccc', d: { e: 'EEE' } } };
```

## API

### <u>eachProps(obj, fn [, opts]) : void</u>

Executes the *fn* function for all properties.

#### Parameters:

| Parameter   |  Type  | Description                                    |
|:------------|:------:|:-----------------------------------------------|
| *obj*       | object | A plain object to be treated.                  |
| *fn*        |function| A function to operate each properties.         |
| *opts*      | object | An object to pass any data to each properties. |

* **API of *fn* function**

    #### <u>fn(value, keyChain, nodeInfo) : boolean</u>

    This function is applied to all properties in an object.

    ##### Parameters:

    | Parameter   |  Type  | Description                                    |
    |:------------|:------:|:-----------------------------------------------|
    | *value*     | any    | A property value.                              |
    | *keyChain*  | string | A string concatenating the hierarchical keys with dots. |
    | *nodeInfo*  | object | An object which contains node informations (See [below](#nodeinfo)). |

    ##### Returns:

    True, if stops digging child properties.

    **Type:** boolean

<a name="nodeinfo"></a>

* **Properties of <i>nodeInfo</i>**

    | Properties   |  Type  | Description                              |
    |:-------------|:------:|:-----------------------------------------|
    | *name*       | string | The property name of this node.          |
    | *index*      | number | The index of the property among the sibling properties. |
    | *count*      | number | The count of the sibling properties.     |
    | *depth*      | number | The depth of the property.               |
    | *parent*     | object | The parent node of the property.         |
    | *sort*       |function| A sort function which orders the child properties. This function is inherited from *opts*, if be specified. |

    ... and any properties inherited from *opts*.

* **Properties of <i>opts</i>**

    | Properties   |  Type  | Description                              |
    |:-------------|:------:|:-----------------------------------------|
    | *sort*       |function| A sort function which orders the same level properties. (Optional) |

    ... and any properties you want to pass to each node.

## License

Copyright (C) 2016-2021 Gulp Team.

This program is free software under [MIT][mit-url] License.
See the file LICENSE in this distribution for more details.


<!-- prettier-ignore-start -->
[downloads-image]: https://img.shields.io/npm/dm/each-props.svg?style=flat-square
[npm-url]: https://www.npmjs.org/package/each-props
[npm-image]: https://img.shields.io/npm/v/each-props.svg?style=flat-square

[ci-url]: https://github.com/gulpjs/each-props/actions?query=workflow:dev
[ci-image]: https://img.shields.io/github/workflow/status/gulpjs/each-props/dev?style=flat-square

[coveralls-url]: https://coveralls.io/r/gulpjs/each-props
[coveralls-image]: https://img.shields.io/coveralls/gulpjs/each-props/master.svg
<!-- prettier-ignore-end -->

<!-- prettier-ignore-start -->
[mit-url]: https://opensource.org/licenses/MIT
<!-- prettier-ignore-end -->
