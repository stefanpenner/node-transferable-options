'use strict';

const expect = require('chai').expect;
const requireFromParallelAPI = require('../../lib/parallel-api/require');
const { fixtureFullPath } = require('../utils')

describe('requireFromParallelAPI()', function() {
  it('requireFile', function() {
    let filePath = fixtureFullPath('transform-strict-mode-parallel');
    let builtPlugin = requireFromParallelAPI({ requireFile: filePath });

    expect(builtPlugin).to.eql(require(filePath));
  });

  it('throws error if requireFile path does not exist', function() {
    let filePath = 'some/file/that/does/not/exist';
    try {
      requireFromParallelAPI({ requireFile: filePath });
      expect.fail('', '', 'should have thrown an error');
    }
    catch (err) {
      expect(err.message).to.eql("Cannot find module 'some/file/that/does/not/exist'");
    }
  });

  it('useMethod', function() {
    let filePath = fixtureFullPath('transform-es2015-block-scoping-parallel');
    let builtPlugin = requireFromParallelAPI({ requireFile: filePath, useMethod: 'pluginFunction' });
    expect(builtPlugin).to.eql(require('babel-plugin-transform-es2015-block-scoping'));
  });

  it('throws error if useMethod does not exist', function() {
    let filePath = fixtureFullPath('transform-es2015-block-scoping-parallel');
    try {
      requireFromParallelAPI({ requireFile: filePath, useMethod: 'doesNotExist' });
      expect.fail('', '', 'should have thrown an error');
    }
    catch (err) {
      expect(err.message).to.eql("method 'doesNotExist' does not exist in file " + filePath);
    }
  });

  it('buildUsing, no params', function() {
    let filePath = fixtureFullPath('transform-es2015-block-scoping-parallel');
    let builtPlugin = requireFromParallelAPI({ requireFile: filePath, buildUsing: 'build' });
    expect(builtPlugin).to.eql(require(filePath).build());
  });

  it('buildUsing, with params', function() {
    let filePath = fixtureFullPath('transform-es2015-block-scoping-parallel');
    let builtPlugin = requireFromParallelAPI({ requireFile: filePath, buildUsing: 'buildTwo', params: { text: 'OK' } });
    expect(builtPlugin).to.eql('for-testingOK');
  });

  it('throws error if buildUsing method does not exist', function() {
    let filePath = fixtureFullPath('transform-es2015-block-scoping-parallel');
    try {
      requireFromParallelAPI({ requireFile: filePath, buildUsing: 'doesNotExist' });
      expect.fail('', '', 'should have thrown an error');
    }
    catch (err) {
      expect(err.message).to.eql("'doesNotExist' is not a function in file " + filePath);
    }
  });

  it('useMethod and buildUsing', function() {
    let filePath = fixtureFullPath('transform-es2015-block-scoping-parallel');
    let builtPlugin = requireFromParallelAPI({ requireFile: filePath, useMethod: 'pluginFunction', buildUsing: 'buildTwo', params: { text: 'OK' } });
    expect(builtPlugin).to.eql(require('babel-plugin-transform-es2015-block-scoping'));
  });
});

