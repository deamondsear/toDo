import jwt from 'jsonwebtoken';
import { Forbidden, Unauthorized } from '../utils/errorsHandler.js';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../config.js';

class TokenService {
  static async generateAccessToken(id, email) {
    const payload = { id, email };
    return await jwt.sign(payload, ACCESS_TOKEN_SECRET, {
      expiresIn: '1d',
    });
  }

  static async generateRefreshToken(id, email) {
    const payload = { id, email };
    return await jwt.sign(payload, REFRESH_TOKEN_SECRET, {
      expiresIn: '15d',
    });
  }

  static async verifyAccessToken(accessToken) {
    return await jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
  }

  static async verifyRefreshToken(refreshToken) {
    return await jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
  }

  static async checkAccess(req, _, next) {
    /*  В приложении примера на фронте используется interceptors.request.use (хуйня которая задает заголовки запросу до его отправки на сервер)
    внутри колбека получает значение токена из кастомного метода, записывает его в заголовок запроса authorization в формате = `Bearer ${accessToken}`
    */
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')?.[1];
    if (!token) {
      return next(new Unauthorized());
    }

    try {
      req.user = await TokenService.verifyAccessToken(token);
    } catch (error) {
      return next(new Unauthorized());
    }

    next();
  }
}

export default TokenService;
