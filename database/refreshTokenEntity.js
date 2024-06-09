import mongoose from 'mongoose';

const refreshTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: false, versionKey: false }
);

const refreshTokenEntity = mongoose.model('refreshToken', refreshTokenSchema);

export default refreshTokenEntity;
