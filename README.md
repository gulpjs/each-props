<p align="center">
  <a href="https://gulpjs.com">
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

## Usage

Apply a function to all (non plain object) properties.

```js
const eachProps = require('each-props');

var obj = { a: 1, b: { c: 'CCC', d: { e: 'EEE' } } };

eachProps(obj, function (value, keyChain, nodeInfo) {
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

### eachProps(obj, fn [, opts]) : void

Executes the _fn_ function for all properties.

#### Parameters:

| Parameter |   Type   | Description                                    |
| :-------- | :------: | :--------------------------------------------- |
| _obj_     |  object  | A plain object to be treated.                  |
| _fn_      | function | A function to operate each properties.         |
| _opts_    |  object  | An object to pass any data to each properties. |

- **API of _fn_ function**

  #### fn(value, keyChain, nodeInfo) : boolean

  This function is applied to all properties in an object.

  ##### Parameters:

  | Parameter  |  Type  | Description                                                         |
  | :--------- | :----: | :------------------------------------------------------------------ |
  | _value_    |  any   | A property value.                                                   |
  | _keyChain_ | string | A string concatenating the hierarchical keys with dots.             |
  | _nodeInfo_ | object | An object which contains node informations (See [below][nodeinfo]). |

  ##### Returns:

  True, if stops digging child properties.

  **Type:** boolean

- ##### **Properties of _nodeInfo_**

  | Properties |   Type   | Description                                                                                                 |
  | :--------- | :------: | :---------------------------------------------------------------------------------------------------------- |
  | _name_     |  string  | The property name of this node.                                                                             |
  | _index_    |  number  | The index of the property among the sibling properties.                                                     |
  | _count_    |  number  | The count of the sibling properties.                                                                        |
  | _depth_    |  number  | The depth of the property.                                                                                  |
  | _parent_   |  object  | The parent node of the property.                                                                            |
  | _sort_     | function | A sort function which orders the child properties. This function is inherited from _opts_, if be specified. |

  ... and any properties inherited from _opts_.

- ##### **Properties of _opts_**

  | Properties |   Type   | Description                                                        |
  | :--------- | :------: | :----------------------------------------------------------------- |
  | _sort_     | function | A sort function which orders the same level properties. (Optional) |

  ... and any properties you want to pass to each node.

## Strict No LLM / No AI Policy

No LLMs for issues.

No LLMs for patches / pull requests.

No LLMs for comments on the bug tracker, including translation.

English is encouraged, but not required. You are welcome to post in your native language and rely on others to have their own translation tools of choice to interpret your words.

## License

MIT

<!-- prettier-ignore-start -->
[downloads-image]: https://img.shields.io/npm/dm/each-props.svg?style=flat-square
[npm-url]: https://www.npmjs.org/package/each-props
[npm-image]: https://img.shields.io/npm/v/each-props.svg?style=flat-square

[ci-url]: https://github.com/gulpjs/each-props/actions/workflows/dev.yml
[ci-image]: https://img.shields.io/github/actions/workflow/status/gulpjs/each-props/dev.yml?style=flat-square

[coveralls-url]: https://coveralls.io/r/gulpjs/each-props
[coveralls-image]: https://img.shields.io/coveralls/gulpjs/each-props/main.svg?style=flat-square
<!-- prettier-ignore-end -->
