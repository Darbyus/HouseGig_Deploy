import * as authService from '../services/authService.js';

export const register = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    const result = await authService.registerService(email, password, username);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginService(email, password);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
