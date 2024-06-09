import userEntity from '../database/userEntity.js';
import toDoEntity from '../database/toDoEntity.js';
import { BadRequest, NotFound } from '../utils/Errors.js';

class ToDoService {
  static async create({ userId, fields }) {
    try {
      const todo = await toDoEntity.create({
        user_id: userId,
        ...fields,
      });
      return todo;
    } catch (err) {
      throw new BadRequest();
    }
  }

  static async getAll(userId) {
    try {
      const todos = await toDoEntity.find({ user_id: userId });
      return todos;
    } catch (err) {
      throw new NotFound();
    }
  }

  static async getById(todoId) {
    try {
      const data = await toDoEntity.findById({ _id: todoId });
      if (!data) {
        throw new NotFound();
      }
      return data;
    } catch (err) {
      throw new NotFound();
    }
  }

  static async patchToDo(todoId, newFields) {
    try {
      const data = await toDoEntity.findOneAndUpdate(
        { _id: todoId },
        newFields,
        { returnDocument: 'after' }
      );
      return data;
    } catch (err) {
      throw new BadRequest();
    }
  }

  static async deleteToDo(todoId) {
    const todo = await toDoEntity.findOneAndDelete({ _id: todoId });
    if (!todo) {
      throw new NotFound();
    }
  }
}

export default ToDoService;
