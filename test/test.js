const expect = require('chai').expect;
const helloWorldTest = require('./helloWorldTest');

describe('HelloWorldTest', () => {
  it('HelloWorldTest sayHello says hello', () => {
    expect(helloWorldTest.sayHello()).to.equal("hello world");
  });
});
