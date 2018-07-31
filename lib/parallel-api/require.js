'use strict';

module.exports = function requireFromParallelAPI(parallelApiInfo) {
  let requiredStuff = require(parallelApiInfo.requireFile);

  if (parallelApiInfo.useMethod) {
    if (requiredStuff[parallelApiInfo.useMethod] === undefined) {
      throw new Error("method '" + parallelApiInfo.useMethod + "' does not exist in file " + parallelApiInfo.requireFile);
    }
    return requiredStuff[parallelApiInfo.useMethod];
  }

  if (parallelApiInfo.buildUsing) {
    if (typeof requiredStuff[parallelApiInfo.buildUsing] !== 'function') {
      throw new Error("'" + parallelApiInfo.buildUsing + "' is not a function in file " + parallelApiInfo.requireFile);
    }
    return requiredStuff[parallelApiInfo.buildUsing](parallelApiInfo.params);
  }

  return requiredStuff;
};
