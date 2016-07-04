const GENERIC_ERROR = 'Woops, something went wrong';

export const handleResponse = (res) =>
  !res.ok
    ? res
      .json()
      .then(({ errors }) => {
        throw errors && errors.length
          ? errors
          : [GENERIC_ERROR]
      })
    : res.json()
