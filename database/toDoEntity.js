import mongoose from 'mongoose';

const toDoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['active', 'completed'],
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'userEntity',
    },
  },
  { timestamps: true, versionKey: false }
);

const toDoEntity = mongoose.model('toDoEntity', toDoSchema);

export default toDoEntity;

// interface ITodo {
//     id: number; // unique
//     title: string;
//     description: string;
//     status: 'active' | 'completed';
//     createdAt: Date;
//     updatedAt: Date;
//     user_id: number; // foreign key
//   }
