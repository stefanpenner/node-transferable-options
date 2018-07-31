'use strict';

const implementsParallelAPI = require('./parallel-api/implements');
const isSerializable = require('./is-serializable');

const visited = new WeakSet();
// replace callback functions with objects so they can be transferred to the worker processes
module.exports = function serialize(options) {
  let optionsType = typeof options;

  if (optionsType === 'object' ||
    optionsType === 'function' ||
    Array.isArray(options)) {

    if (visited.has(options)) {
      // a cycle, so simply reuse
      return options;
    } else {
      if (implementsParallelAPI(options)) {
        options = {
          _parallelBabel: options._parallelBabel
        };
      }
      visited.add(options);
    }

  } else {
    return options;
  }

  const serialized = Array.isArray(options) ? [] : {};

  Object.keys(options).forEach(key => {
    let value = options[key];

    if (value === options) {
      throw new TypeError('Babel Plugins contain a cycle');
    }

    if (isSerializable(value)) {
      value = serialize(value);
    } else {
      // leave as is
    }
    serialized[key] = value;
  });

  return serialized;
}
