
export function checkSession(req, res, next) {
  // check header or url parameters or post parameters for token
  const { session } = req;

  if (session.user) {
    next();
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
}

export default {
  checkSession
}
