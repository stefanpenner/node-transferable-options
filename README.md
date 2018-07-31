# node-transferable-options
[![Build Status](https://travis-ci.org/stefanpenner/node-transferable-options.svg?branch=master)](https://travis-ci.org/stefanpenner/node-transferable-options)

A serialization and deserialization scheme to transfer complex objects
(typically options for babel or htmlbar transforms, or the transforms
themselves) between multiple node processes.

Although POJO's which restrict themselves to pure JSON can easily be
serializable, both Babel and HTMLBars, allow passing of functions. Functions
cannot be easily transfered, one such reason is that they contain lexically
scoped state, which cannot be serialized.

To work around this, this project respects a protocol, which instructs how to
"resurrect" a given function or class.


For example, given the following AST Transform (which respects the protocol)
```js
module.exports = MyASTTransform;

class MyASTTransform {
  /* ... */
}

// the protocol is simply the `_parallel` property
MyASTTransform._parallel = {
  requireFile: __filename
};
```

And the following API, can easily continue to operate even if the options must
be transferred to another process.

```js
const MyASTTransform = require('MyASTTransform');
registry.register('ast-htmlbars-transform', {
  name: 'my-ast-transform',
  plugin: MyASTTransform
});
```

*note: this does not facilitate state sharing between options and the environment which configured them*

A very basic round trip example would be:

```js
const transferable = require('transferable-options');

transferable.isSerializable({}) // => true;
transferable.isSerializable({ just: { a: "POJO" }}) // => true;
transferable.isSerializable({ callback() { } }) // => false

function TransferableCallback() {

}

TransferableCallback._parallel = {
  requireFile: '/path/to/file/which/when/required/exports/this/function/as/a/default/export'
};

transferable.isSerializable({ TransferableCallback() { } }) // => true

let serialized = transferable.serialize({ TransferableCallback() { } }); // => something safe to JSON.stringify
let deserialized = transferable.deserialize(serialized);
let deserialize.TransferableCallback === require('/path/to/file/which/when/required/exports/this/function/as/a/default/export') === true;
```

## Api:

* `isSerializable(options)` boolean, true/false based on if the options are serializable or not
* `serialize(options)` serialized options or thrown exception if not serializable
* `deserialize(serializedOptions)` the deserialized options or thrown exception if not deserializable
