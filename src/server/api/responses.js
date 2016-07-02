export const DEFAULT_ERROR = 'An error occurred';

export const errorResponse = (res, errors = [], code = 400) => {
  const errorsArray = Array.isArray(errors) ? errors : [errors];
  if (!errorsArray.length) errorsArray.push(DEFAULT_ERROR);
  return res.status(code).send({ errors: errorsArray });
}
export const successResponse = (res, data = {}, code = 200) =>
  res.status(code).send(data);
