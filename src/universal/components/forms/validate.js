import validate from 'validate.js';

export default (values, constraints) => {
  const errors = validate(values, constraints);
  if (!errors)
    return;

  // For field validation we only want one error per field
  for (let field in errors) {
    errors[field] = errors[field][0];
  }
  return errors;
}
