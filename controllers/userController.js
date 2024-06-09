import UserDTO from '../DTO/userDTO.js';
import userEntity from '../database/userEntity.js';
import AuthService from '../services/Auth.js';
import ErrorUtils, { Forbidden, NotFound } from '../utils/errorsHandler.js';
import bcrypt from 'bcrypt';

class User {
  static async signIn(req, res) {
    const { email, password } = req.body;

    try {
      const { accessToken, refreshToken, user } = await AuthService.signIn({
        email,
        password,
      });

      // res.cookie('refreshToken', refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN);
      return res.json({ accessToken, refreshToken, user });
    } catch (error) {
      return ErrorUtils.catchError(res, error);
    }
  }

  static async signUp(req, res) {
    const { firstName, lastName, email, password } = req.body;
    try {
      const { accessToken, refreshToken } = await AuthService.signUp({
        firstName,
        lastName,
        email,
        password,
      });

      // res.cookie('refreshToken', refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN);

      return res.json({ accessToken, refreshToken });
    } catch (error) {
      return ErrorUtils.catchError(res, error);
    }
  }

  static async refresh(req, res) {
    const currentRefreshToken = req.body.refreshToken;

    try {
      const { accessToken, refreshToken } = await AuthService.refresh({
        currentRefreshToken,
      });
      // res.cookie('refreshToken', refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN);

      return res.status(200).json({ accessToken, refreshToken });
    } catch (err) {
      return ErrorUtils.catchError(res, err);
    }
  }

  static async getUser(req, res) {
    const payload = req.user.email;
    try {
      const user = await userEntity.findOne({ email: payload }).exec();
      return res.status(200).json(new UserDTO(user));
    } catch (err) {
      return ErrorUtils.catchError(res, err);
    }
  }

  static async updatePassword(req, res) {
    const payload = req.user.email;
    const { password, newPassword } = req.body;

    try {
      const user = await userEntity.findOne({ email: payload }).exec();
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        throw new Forbidden('Invalid password');
      }
      user.password = bcrypt.hashSync(newPassword, 8);
      await user.save();
      res.status(200).json(new UserDTO(user));
    } catch (err) {
      return ErrorUtils.catchError(res, err);
    }
  }
}

export default User;
