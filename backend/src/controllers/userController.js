import * as userService from '../services/userService.js';

export const getUserProfile = async (req, res, next) => {
  try {
    const { username } = req.params;
    const profile = await userService.getUserProfileService(username);
    res.json(profile);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const user = await userService.updateUserProfileService(req.user.id, req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = await userService.getUserByIdService(req.user.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};
