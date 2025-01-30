import { getUser } from '../service/auth.js';

function checkForAuthantication(req, res, next) {
  const tokenCookie = req.cookies?.token;
  req.user = null;
  if (!tokenCookie) return next();
  const token = tokenCookie;
  const user = getUser(token);
  req.user = user;
  next();
}

function restrictTo(roles) {
  return function (req, res, next) {
    if (!req.user) return res.redirect('login');
    if (!roles.includes(req.user.role)) return res.end('UnAuthorization');
    return next();
  };
}

export { checkForAuthantication, restrictTo };
