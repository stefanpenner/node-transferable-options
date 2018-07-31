'use strict';

const { fixtureFullPath } = require('./utils');

// new _parallel API
module.exports.resolveModuleSource = resolveModuleSource;
function resolveModuleSource() { }
resolveModuleSource._parallel = {
  requireFile: fixtureFullPath('amd-name-resolver-parallel'),
  useMethod: 'moduleResolve',
};

module.exports.getModuleId = getModuleId;
function getModuleId() { }

getModuleId._parallel = {
  requireFile: fixtureFullPath('get-module-id-parallel'),
  buildUsing: 'build',
  params: { name: 'testModule' },
};

module.exports.shouldPrintComment = shouldPrintComment;
function shouldPrintComment() { }

shouldPrintComment._parallel = {
  requireFile: fixtureFullPath('print-comment-parallel'),
  buildUsing: 'buildMe',
  params: { contents: 'comment 1' },
};




// old compat layer for _babelParalell
module.exports.babelResolveModuleSource = babelResolveModuleSource;
function babelResolveModuleSource() { }
babelResolveModuleSource._parallelBabel = {
  requireFile: fixtureFullPath('amd-name-resolver-parallel'),
  useMethod: 'moduleResolve',
};

module.exports.babelGetModuleId = babelGetModuleId;

function babelGetModuleId() { }
babelGetModuleId._parallelBabel = {
  requireFile: fixtureFullPath('get-module-id-parallel'),
  buildUsing: 'build',
  params: { name: 'testModule' },
};

module.exports.babelShouldPrintComment = babelShouldPrintComment;
function babelShouldPrintComment() { }

babelShouldPrintComment._parallelBabel = {
  requireFile: fixtureFullPath('print-comment-parallel'),
  buildUsing: 'buildMe',
  params: { contents: 'comment 1' },
};
