import {
  createUser,
  loginUser,
  logoutUser,
  refreshSession,
} from '../services/auth.js';
import createHttpError from 'http-errors';
const setupSessionCookies = (res, session) => {
  res.cookie('sessionId', session.id, {
    httpOnly: true,
    expire: 7 * 24 * 60 * 60,
  });
  res.cookie('sessionToken', session.refreshToken, {
    httpOnly: true,
    expire: 7 * 24 * 60 * 60,
  });
};
export const registerUserController = async (req, res) => {
  const user = await createUser(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created user!',
    data: user,
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);
  setupSessionCookies(res, session);
  res.json({
    status: 200,
    message: 'User is logged in !',
    data: { accessToken: session.accessToken },
  });
};

export const logoutUserController = async (req, res) => {
  await logoutUser({
    sessionId: req.cookies.sessionId,
    sessionToken: req.cookies.sessionToken,
  });
  res.clearCookie('sessionId');
  res.clearCookie('sessionToken');
  res.status(204).send();
};
export const refreshTokenController = async (req, res) => {
  const { sessionId, sessionToken } = req.cookies;
  if (!sessionId || !sessionToken) {
    throw createHttpError(401, 'Session not found!');
  }
  const session = await refreshSession({ sessionId, sessionToken });
  setupSessionCookies(res, session);
  res.json({
    status: 200,
    message: 'Token refreshed successfully!',
    data: { accessToken: session.accessToken },
  });
};
