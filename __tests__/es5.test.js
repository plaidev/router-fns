test('should require reduceHandler', () => {
  const { reduceHandlers } = require('../lib/es5');
  const called = [];
  const a = (req, res, next) => {
    called.push(1);
    next();
  };
  const b = (req, res, next) => {
    called.push(2);
    next();
  };
  const handler = reduceHandlers(a, b);
  handler({}, {}, e => {
    if (e) throw e;
  });
  expect(called).toStrictEqual([1, 2]);
});
