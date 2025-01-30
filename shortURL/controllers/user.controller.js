import { Users } from '../models/user.models.js';
import { setUser, getUser } from '../service/auth.js';

async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body;
  await Users.create({
    name,
    email,
    password,
  });
  return res.render('home');
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await Users.findOne({ email, password });
  if (!user)
    return res.render('login', {
      error: 'Inavalid username or password',
    });

  const token = setUser(user);
  res.cookie('token', token);
  return res.redirect('/');
}

export { handleUserSignUp, handleUserLogin };
