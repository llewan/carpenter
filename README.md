# Carpenter [![npm version](https://img.shields.io/npm/v/carpenter.svg)](https://www.npmjs.com/package/carpenter) [![license type](https://img.shields.io/npm/l/carpenter.svg)](https://github.com/llewan/carpenter.git/blob/master/LICENSE) [![codecov](https://codecov.io/gh/llewan/carpenter/branch/develop/graph/badge.svg)](https://codecov.io/gh/llewan/carpenter)
Creates a builder pattern for NodeJS using ES6 proxy.

## Installation
```
npm install --save carpenter
```

And then import it:
```
// ES6 modules
import { Builder, BuilderType } from 'rex-react';

// commonjs
const Builder = require('carpenter').Builder;
const BuilderType = require('carpenter').BuilderType;
```

## Usage
Specify a template object which allows to define the API and the dataType for each field.
```
const template = {
  id: BuilderType.number,
  first_name: BuilderType.string,
  email: BuilderType.string,
};

const built = Builder(template)
      .id(1)
      .firstName('Leo')
      .email('leolewan@gmail.com')
      .build();
```

###Note
- It accepts the build function on camelCase as well


## Questions or suggestions?
Feel free to contact me on [Twitter](https://twitter.com/leolewan) or [open an issue](https://github.com/llewan/carpenter/issues/new).
