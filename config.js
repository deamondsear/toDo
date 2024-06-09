import dotenv from 'dotenv';

dotenv.config();

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
export const PORT = process.env.PORT || 3000;
export const MONGO_URI = process.env.MONGO_URI;
// export const COOKIE_SETTINGS = {
//   REFRESH_TOKEN: {
//     httpOnly: true,
//     maxAge: 1296e6,
//   },
// };

export const ACCESS_TOKEN_EXPIRATION = 9e5;
