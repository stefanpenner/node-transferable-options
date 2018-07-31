'use strict';

const implementsParallelAPI = require('./parallel-api/implements');
const requireFromParallelAPI = require('./parallel-api/require');

module.exports = function deserialize(data) {
  if (Array.isArray(data)) {
    const result = [];
    for (let i =0; i < data.length; i++) {
      let member = data[i];
      if (implementsParallelAPI(member)) {
        result[i] = requireFromParallelAPI(member._parallelBabel || member._parallel);
      } else {
        result[i] = member;
      }
    }

    return result;
  } else if (typeof data === 'object' && data !== null) {
    const result = {};

    Object.keys(data).forEach(key => {
      let value = data[key];

      if (value === undefined || value == null) {
        // do nothing
      } else if (implementsParallelAPI(value)) {
        value = requireFromParallelAPI(value._parallelBabel || value._parallel);
      } else if (typeof value === 'function') {
        throw new TypeError(`cannot deserialize function: '${value.name || value}'`)
      } else {
        value = deserialize(value);
      }

      result[key] = value;
    });

    return result;
  }  else {
    return data;
  }
};
