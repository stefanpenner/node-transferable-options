# node-transferable-options
[![Build Status](https://travis-ci.org/stefanpenner/node-transferable-options.svg?branch=master)](https://travis-ci.org/stefanpenner/node-transferable-options)

A serialization and deserialization scheme to transfer complex objects
(typically function options) between multiple node processes. The specific
use-case, although more are possible, is to allow easy transfering of Babel or
HTMLBars configuration to sub-processes to utilize parallelization.

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


## Api:

* `isSerializable(options)` boolean, true/false based on if the options are serializable or not
* `serialize(options)` serialized options or thrown exception if not serializable
* `deserialize(serializedOptions)` the deserialized options or thrown exception if not deserializable
