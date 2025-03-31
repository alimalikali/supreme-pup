exports.setTokenCookie = (res, token) => {
  res.cookie('token', token, {
    sameSite: process.env.PRODUCTION === 'true' ? 'None' : 'Lax',
    maxAge: new Date(Date.now() + parseInt(process.env.COOKIE_EXPIRATION_DAYS * 24 * 60 * 60 * 1000)),
    httpOnly: true,
    secure: process.env.PRODUCTION === 'true' ? true : false,
  });
};
