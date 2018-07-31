'use strict';

module.exports = function implementsParallelAPI(object) {
  const type = typeof object;
  const hasProperties = type === 'function' || type === 'object' || Array.isArray(object);

  if (!hasProperties) { return false; }

  // support both babel specific, and generic
  const maybeParallel = object._parallelBabel || object._parallel;

  return maybeParallel !== null &&
    typeof maybeParallel=== 'object' &&
    typeof maybeParallel.requireFile === 'string';
};
