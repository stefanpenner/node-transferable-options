'use strict';

const expect = require('chai').expect;
const implementsParallelAPI = require('../../lib/parallel-api/implements');

describe('implementsParallelAPI()', function() {
  it('string - no', function () {
    expect(implementsParallelAPI('transform-es2025')).to.eql(false);
  });

  it('function - no', function () {
    expect(implementsParallelAPI(function() {})).to.eql(false);
  });

  it('[] - no', function () {
    expect(implementsParallelAPI([])).to.eql(false);
  });

  it('["plugin-name", { options }] - no', function () {
    expect(implementsParallelAPI(['plugin-name', {foo: 'bar'}])).to.eql(false);
  });

  it('[{ object }, { options }] - no', function () {
    expect(implementsParallelAPI([{some: 'object'}, {foo: 'bar'}])).to.eql(false);
  });

  it('{ requireFile: "some/file" } - no', function () {
    expect(implementsParallelAPI({ requireFile: 'some/file' })).to.eql(false);
  });

  it('{ _parallelBabel: { some: "stuff" } } - no', function () {
    expect(implementsParallelAPI({ _parallelBabel: { some: 'stuff' } })).to.eql(false);
  });

  it('{ _parallelBabel: { requireFile: "a/file" } } - yes', function () {
    expect(implementsParallelAPI({ _parallelBabel: { requireFile: 'a/file' } })).to.eql(true);
  });
});
