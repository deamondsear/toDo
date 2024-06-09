import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const userEntity = mongoose.model('userEntity', userSchema);

export default userEntity;

// interface IUser {
//     id: number; // unique
//     firstName: string;
//     lastName: string;
//     email: string; // unique
//     password: string;
//     createdAt: Date;
//     updatedAt: Date;
//   }
