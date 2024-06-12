import bcrypt from 'bcrypt';
import TokenService from './Token.js';
import {
  NotFound,
  Forbidden,
  Conflict,
  Unauthorized,
  BadRequest,
} from '../utils/errorsHandler.js';
import { ACCESS_TOKEN_EXPIRATION } from '../config.js';
import userEntity from '../database/userEntity.js';
// import refreshTokenEntity from '../database/refreshTokenEntity.js';
import UserDTO from '../DTO/userDTO.js';

class AuthService {
  static async signIn({ email, password }) {
    const userData = await userEntity.findOne({ email: email }).exec();
    if (!userData) {
      throw new NotFound('User is not exist');
    }

    const isPasswordValid = bcrypt.compareSync(password, userData.password);

    if (!isPasswordValid) {
      throw new Forbidden('Invalid email or password');
    }

    const accessToken = await TokenService.generateAccessToken(
      userData._id,
      email
    );
    const refreshToken = await TokenService.generateRefreshToken(
      userData._id,
      email
    );

    // await refreshTokenEntity.create({ token: refreshToken });

    // await RefreshSessionRepository.createRefreshSession({
    //   id: userData.id,
    //   refreshToken,
    //   fingerprint,
    // });
    const user = new UserDTO(userData);
    return {
      accessToken,
      refreshToken,
      user,
      // accessTokenExpiration: ACCESS_TOKEN_EXPIRATION,
    };
  }

  static async signUp({ firstName, lastName, email, password }) {
    if (!firstName || !lastName || !email || !password) {
      throw new BadRequest();
    }

    const userData = await userEntity.findOne({ email: email }).exec();
    if (userData) {
      throw new Conflict(
        'A user with this email address is already registered'
      );
    }

    const hashedPassword = bcrypt.hashSync(password, 8);
    const user = await userEntity.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const accessToken = await TokenService.generateAccessToken(user._id, email);
    const refreshToken = await TokenService.generateRefreshToken(
      user._id,
      email
    );

    // await refreshTokenEntity.create({ token: refreshToken });

    return {
      accessToken,
      refreshToken,
      // accessTokenExpiration: ACCESS_TOKEN_EXPIRATION,
    };
  }

  static async refresh({ currentRefreshToken }) {
    if (!currentRefreshToken) {
      throw new Unauthorized();
    }

    // const token = await refreshTokenEntity
    //   .findOne({
    //     token: currentRefreshToken,
    //   })
    //   .exec();

    // if (!token) {
    //   throw new Unauthorized();
    // }

    // if (refreshSession.finger_print !== fingerprint.hash) {
    //   console.log('Попытка несанкционированного обновления токенов');
    //   throw new Forbidden();
    // }

    // await refreshTokenEntity.deleteOne({ token: token });

    let payload;
    try {
      payload = await TokenService.verifyRefreshToken(currentRefreshToken);
    } catch (error) {
      throw new Unauthorized();
    }
    const { id, email } = await userEntity
      .findOne({ email: payload.email })
      .exec();

    const actualPayload = { id, email };

    const accessToken = await TokenService.generateAccessToken(actualPayload);
    const refreshToken = await TokenService.generateRefreshToken(actualPayload);

    // await refreshTokenEntity.create({ token: refreshToken });

    return {
      accessToken,
      refreshToken,
    };
  }
}

export default AuthService;
