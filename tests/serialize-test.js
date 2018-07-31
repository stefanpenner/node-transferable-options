'use strict';

const expect = require('chai').expect;
const serialize = require('../lib/serialize');
const { fixtureFullPath } = require('./utils')
const {
  babelResolveModuleSource,
  babelGetModuleId,
  babelShouldPrintComment
} = require('./fixture-functions')

describe('serialize()', function() {
  it('empty options', function() {
    expect(serialize({})).to.eql({});
  });

  it('passes through non-function options', function() {
    let options = {
      inputSourceMap: false,
      plugins: [ 'some-plugin' ],
    };

    expect(serialize(options)).to.eql(options);
  });

  describe('compat old _parallelBabel', function() {
    it('transforms all functions', function() {
      let serialized = serialize({
        babelResolveModuleSource,
        babelGetModuleId,
        babelShouldPrintComment
      });

      expect(serialized).to.eql({
        babelResolveModuleSource: {
          _parallelBabel: {
            requireFile: fixtureFullPath('amd-name-resolver-parallel'),
            useMethod: 'moduleResolve'
          }
        },

        babelGetModuleId: {
          _parallelBabel: {
            requireFile: fixtureFullPath('get-module-id-parallel'),
            buildUsing: "build",
            params: {
              name: "testModule"
            }
          }
        },

        babelShouldPrintComment: {
          _parallelBabel: {
            requireFile: fixtureFullPath('print-comment-parallel'),
            buildUsing: "buildMe",
            params: {
              contents: "comment 1"
            },
          }
        }
      });
    });
  });

  describe('compat old _parallel', function() {
    it('transforms all functions', function() {
      let serialized = serialize({
        babelResolveModuleSource,
        babelGetModuleId,
        babelShouldPrintComment,
      });

      expect(serialized).to.eql({
        babelResolveModuleSource: {
          _parallelBabel: {
            requireFile: fixtureFullPath('amd-name-resolver-parallel'),
            useMethod: 'moduleResolve'
          }
        },

        babelGetModuleId: {
          _parallelBabel: {
            requireFile: fixtureFullPath('get-module-id-parallel'),
            buildUsing: "build",
            params: {
              name: "testModule"
            }
          }
        },

        babelShouldPrintComment: {
          _parallelBabel: {
            requireFile: fixtureFullPath('print-comment-parallel'),
            buildUsing: "buildMe",
            params: {
              contents: "comment 1"
            },
          }
        }
      });
    });
  });
});
