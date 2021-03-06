const expect = require('chai').expect;
const assert = require('chai').assert;
const { describe, it } = require('mocha');
const { Builder, BuilderType } = require('./index');

describe('Builder', () => {
  describe('should properly chain methods', () => {
    it('same data type', () => {
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

    it('different data types', () => {
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

    it('should properly chain methods - regexp', () => {
      const template = {
        name: BuilderType.string,
        validate: BuilderType.regexp,
      };
      const built = Builder(template)
        .name('Leo')
        .validate(/^foo(bar)?$/)
        .build();

      const expected = {
        name: 'Leo',
        validate: /^foo(bar)?$/,
      };

      expect(built).to.deep.equals(expected);
    });

    it('should properly chain methods - boolean', () => {
      const template = {
        name: BuilderType.string,
        validate: BuilderType.regexp,
        isCool: BuilderType.boolean,
      };
      const built = Builder(template)
        .name('Leo')
        .validate(/^foo(bar)?$/)
        .isCool(true)
        .build();

      const expected = {
        name: 'Leo',
        validate: /^foo(bar)?$/,
        isCool: true
      };

      expect(built).to.deep.equals(expected);
    });
  });


  describe('should throw an error', () => {
    it('when calling a function that is not defined on the template', () => {
      const template = {
        name: BuilderType.string,
        surname: BuilderType.string,
      };
      const built = () => Builder(template).nickname('Leo');

      assert.throws(built, 'nickname is not a valid field')
    });

    it('when calling a function with the wrong primitive data type - case 1', () => {
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

    it('when calling a function with the wrong primitive data type - case 2', () => {
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

    it('when calling a function with the wrong primitive data type - case 3', () => {
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

    it('when calling a function with the wrong primitive data type - regexp', () => {
      const template = {
        name: BuilderType.string,
        address: BuilderType.object,
        validate: BuilderType.regexp,
      };
      const built = () => Builder(template)
        .name('Leo')
        .address({})
        .validate({})
        .build();

      assert.throws(built, 'Invalid error `validate` of type `object` supplied to Builder, expected `regexp`.')
    });

    it('when calling a function with the wrong primitive data type - boolean', () => {
      const template = {
        name: BuilderType.string,
        address: BuilderType.object,
        validate: BuilderType.regexp,
        isMale: BuilderType.boolean,
      };
      const built = () => Builder(template)
        .name('Leo')
        .address({})
        .validate(/^foo(bar)?$/)
        .isMale('true')
        .build();

      assert.throws(built, 'Invalid error `isMale` of type `string` supplied to Builder, expected `boolean`.')
    });
  });
});