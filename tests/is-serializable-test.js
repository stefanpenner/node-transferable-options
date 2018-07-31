'use strict';

const expect = require('chai').expect;
const isSerializable = require('../lib/is-serializable');

describe('isSerializable()', function() {
  it('string - yes', function () {
    expect(isSerializable('transform-es2025')).to.eql(true);
  });

  it('function - no', function () {
    expect(isSerializable(function() {})).to.eql(false);
  });

  it('[] - yes', function () { expect(isSerializable([])).to.eql(true);
  });

  it('[null, "plugin-name", 12, {foo: "bar"}, ["one",2], true, false] - yes', function () {
    let plugin = [null, "plugin-name", 12, {foo: "bar"}, ["one",2], true, false];
    expect(isSerializable(plugin)).to.eql(true);
  });

  it('["plugin-name", x => x + 1] - no', function () {
    expect(isSerializable(['plugin-name', x => x + 1])).to.eql(false);
  });

  it('{ _parallelBabel: { requireFile: "a/file" } } - yes', function () {
    function Foo() {

    }

    Foo._parallelBabel = { requireFile: 'a/file' };
    expect(isSerializable([Foo])).to.eql(true);
  });

  it('[SerializeableFn, SerializeableFn]', function () {
    function Foo() {

    }

    Foo._parallelBabel = { requireFile: 'a/file' };
    expect(isSerializable([Foo, Foo])).to.eql(true);
  });

  it('[SerializeableFn, NonSerializeableFn]', function () {
    function Foo() {

    }

    Foo._parallelBabel = { requireFile: 'a/file' };
    expect(isSerializable([Foo, () => {}])).to.eql(false);
  });
});

