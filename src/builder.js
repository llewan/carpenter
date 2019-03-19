function Builder(aTemplate) {
  const built = {};

  const builder = new Proxy({}, {
    get(target, propKey, receiver) {
      let prop = propKey;

      if (!aTemplate.hasOwnProperty(prop)) {
        prop = prop.split(/(?=[A-Z])/).join('_').toLowerCase();
      }

      if ('build' === prop) {
        return () => built;
      }

      return (value) => {
        if (!aTemplate.hasOwnProperty(prop)) {
          throw new Error(`${prop} is not a valid field`)
        }
        const preciseType = Array.isArray(value) ? 'array' : typeof value;

        if (aTemplate[prop] !== preciseType) {
          throw new Error(
            `Invalid error \`${prop}\` of type \`${preciseType}\` supplied to Builder, expected \`${aTemplate[prop]}\`.`
          );
        }

        built[prop] = value;
        return builder;
      };
    }
  });
  return builder;
}

module.exports = Builder;
