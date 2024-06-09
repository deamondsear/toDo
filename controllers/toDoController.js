import toDoEntity from '../database/toDoEntity.js';
import ErrorUtils, { BadRequest } from '../utils/Errors.js';
import ToDoService from '../services/todos.js';

class ToDo {
  static async create(req, res) {
    try {
      const userId = req.user.id;
      const fields = req.body;
      const data = await ToDoService.create({ userId, fields });
      return res.status(200).json(data);
    } catch (err) {
      return ErrorUtils.catchError(res, err);
    }
  }

  static async getAll(req, res) {
    try {
      const userId = req.user.id;
      const todos = await ToDoService.getAll(userId);
      return res.status(200).json(todos);
    } catch (err) {
      return ErrorUtils.catchError(res, err);
    }
  }

  static async getById(req, res) {
    try {
      const todoId = req.params.id;
      const data = await ToDoService.getById(todoId);
      return res.status(200).json(data);
    } catch (err) {
      return ErrorUtils.catchError(res, err);
    }
  }

  static async patchToDo(req, res) {
    try {
      const todoId = req.params.id;
      const data = await ToDoService.patchToDo(todoId, req.body);
      return res.status(200).json(data);
    } catch (err) {
      return ErrorUtils.catchError(res, err);
    }
  }

  static async deleteToDo(req, res) {
    try {
      const todoId = req.params.id;
      await ToDoService.deleteToDo(todoId);
      return res.status(200).send({});
    } catch (err) {
      return ErrorUtils.catchError(res, err);
    }
  }
}

export default ToDo;
