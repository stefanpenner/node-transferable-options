'use strict';

const expect = require('chai').expect;
const index = require('../');

describe('index', function() {
  it('has the methods we expect to be exposed as public API', function() {
    expect(index).to.have.keys(['serialize', 'deserialize', 'isSerializable']);
    expect(index.serialize).to.be.a('function');
    expect(index.deserialize).to.be.a('function');
    expect(index.isSerializable).to.be.a('function');
  });
});
