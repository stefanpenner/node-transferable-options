'use strict';

const deserialize = require('../lib/deserialize');
const expect = require('chai').expect;
const { fixtureFullPath } = require('./utils')
const {
  resolveModuleSource,
  getModuleId,
  shouldPrintComment,
  babelResolveModuleSource,
  babelGetModuleId,
  babelShouldPrintComment
} = require('./fixture-functions');

describe('deserialize()', function() { it('passes other options through', function () { let options = {
      inputSourceMap: false,
      sourceMap: false,
      somethingElse: 'foo',
    };
    expect(deserialize(options)).to.eql({
      inputSourceMap: false,
      sourceMap: false,
      somethingElse: 'foo',
    });
  });

  it('builds plugins using the parallel API', function () {
    let options = {
      plugins: [
        {
          _parallelBabel: {
            requireFile: fixtureFullPath('transform-strict-mode-parallel'),
          }
        },
        'transform-es2015-block-scoping'
      ]
    };
    expect(deserialize(options)).to.eql({
      plugins: [
        'transform-strict-mode',
        'transform-es2015-block-scoping'
      ]
    });
  });

  it('throws if trying to deserialize something invalid', function () {
    let options = {
      resolveModuleSource() {}
    };

    expect(() => deserialize(options).resolveModuleSource).to.throw(/cannot deserialize function: 'resolveModuleSource'/);
  });

  it('builds resolveModuleSource using the parallel API', function () {
    let options = {
      resolveModuleSource,
      babelResolveModuleSource
    };

    expect(deserialize(options).resolveModuleSource).to.be.a('function');
    expect(deserialize(options).babelResolveModuleSource).to.be.a('function');
    expect(deserialize(options)).to.eql({
      resolveModuleSource: require(fixtureFullPath('amd-name-resolver-parallel')).moduleResolve,
      babelResolveModuleSource: require(fixtureFullPath('amd-name-resolver-parallel')).moduleResolve
    });
  });

  it('builds getModuleId using the parallel API', function () {
    let options = {
      getModuleId
    };
    expect(deserialize(options).getModuleId).to.be.a('function');
  });

  it('builds shouldPrintComment using the parallel API', function () {
    let options = {
      shouldPrintComment
    };
    expect(deserialize(options).shouldPrintComment).to.be.a('function');
  });
});

