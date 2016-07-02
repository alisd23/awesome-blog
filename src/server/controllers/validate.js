import validate from 'validate.js';

export default (values, constraints) =>
  validate(values, constraints, { format: 'flat' });
