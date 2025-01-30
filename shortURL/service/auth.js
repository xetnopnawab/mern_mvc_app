import jwt from 'jsonwebtoken';
const secrate = 'nawab123';

function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    secrate
  );
}

function getUser(token) {
  try {
    return jwt.verify(token, secrate);
  } catch (error) {
    return null;
  }
}
export { setUser, getUser };
