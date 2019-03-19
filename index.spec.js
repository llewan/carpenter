const expect = require('chai').expect;
const assert = require('chai').assert;
const { Builder, BuilderType } = require('./index');

describe('Builder', () => {
  it('should properly chain methods - same data type', () => {
    const template = {
      first_name: BuilderType.string,
      email: BuilderType.string,
    };

    const built = Builder(template)
      .firstName('Leo')
      .email('leolewan@gmail.com')
      .build();

    const expected = {
      first_name: 'Leo',
      email: 'leolewan@gmail.com',
    };

    expect(built).to.deep.equals(expected);
  });

  it('should properly chain methods - different data types', () => {
    const template = {
      name: BuilderType.string,
      address: BuilderType.object,
      age: BuilderType.number,
    };

    const built = Builder(template)
      .name('Leo')
      .address({})
      .age(30)
      .build();

    const expected = {
      name: 'Leo',
      address: {},
      age: 30,
    };

    expect(built).to.deep.equals(expected);
  });

  it('should throw an error when calling a function that is not defined on the template', () => {
    const template = {
      name: BuilderType.string,
      surname: BuilderType.string,
    };
    const built = () => Builder(template).nickname('Leo');

    assert.throws(built, 'nickname is not a valid field')
  });

  it('should throw an error when calling a function with the wrong primitive data type - case 1', () => {
    const template = {
      name: BuilderType.string,
      surname: BuilderType.string,
    };
    const built = () => Builder(template)
      .name('Leo')
      .surname([])
      .build();

    assert.throws(built, 'Invalid error `surname` of type `array` supplied to Builder, expected `string`.')
  });

  it('should throw an error when calling a function with the wrong primitive data type - case 2', () => {
    const template = {
      name: BuilderType.string,
      address: BuilderType.array,
    };
    const built = () => Builder(template)
      .name('Leo')
      .address('aaa')
      .build();

    assert.throws(built, 'Invalid error `address` of type `string` supplied to Builder, expected `array`.')
  });

  it('should throw an error when calling a function with the wrong primitive data type - case 3', () => {
    const template = {
      name: BuilderType.string,
      address: BuilderType.object,
    };
    const built = () => Builder(template)
    .name('Leo')
    .address([])
    .build();

    assert.throws(built, 'Invalid error `address` of type `array` supplied to Builder, expected `object`.')
  });
});