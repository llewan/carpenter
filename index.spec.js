const expect = require('chai').expect;
const assert = require('chai').assert;
const { Builder, BuilderType } = require('./index');

describe('Builder', () => {
  it('should properly chain methods - same data type', () => {
    const template = {
      name: BuilderType.string,
      surname: BuilderType.string,
    };

    const built = Builder(template)
      .name('Leo')
      .surname('Lewan')
      .build();

    const expected = {
      name: 'Leo',
      surname: 'Lewan',
    };

    expect(built).to.deep.equals(expected);
  });

  it('should properly chain methods - different data types', () => {
    const template = {
      name: BuilderType.string,
      surname: BuilderType.string,
      address: BuilderType.object,
      age: BuilderType.number,
      start_school_at: BuilderType.number,
    };

    const built = Builder(template)
      .name('Leo')
      .surname('Lewan')
      .address({})
      .age(30)
      .startSchoolAt(5)
      .build();

    const expected = {
      name: 'Leo',
      surname: 'Lewan',
      address: {},
      age: 30,
      start_school_at: 5
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

    assert.throws(built, 'surname expects a string data type and array is being received')
  });

  it('should throw an error when calling a function with the wrong primitive data type - case 2', () => {
    const template = {
      name: BuilderType.string,
      surname: BuilderType.string,
      address: BuilderType.array,
    };
    const built = () => Builder(template)
      .name('Leo')
      .surname('Lewan')
      .address('qqq')
      .build();

    assert.throws(built, 'address expects a array data type and string is being receive')
  });

  it('should throw an error when calling a function with the wrong primitive data type - case 3', () => {
    const template = {
      name: BuilderType.string,
      surname: BuilderType.string,
      address: BuilderType.object,
    };
    const built = () => Builder(template)
    .name('Leo')
    .surname('Lewan')
    .address([])
    .build();

    assert.throws(built, 'address expects a object data type and array is being received')
  });
});