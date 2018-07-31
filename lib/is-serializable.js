'use strict';

const implementsParallelAPI = require('./parallel-api/implements');
const isSerializable = require('./is-serializable');

module.exports = function isSerializable(value) {
  if (value === null) {
    return true;
  } else if (implementsParallelAPI(value)) {
    return true;
  } else if (Array.isArray(value)) {
    return value.every(isSerializable);
  } else {
    switch (typeof value) {
      case 'string':
      case 'number':
      case 'boolean':  return true;
      case 'object':   return Object.keys(value).every(key => isSerializable(value[key]));
      default:         return false;
    }
  }
};
