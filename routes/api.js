import express from 'express';
import toDoController from '../controllers/toDoController.js';
import userController from '../controllers/userController.js';
import TokenService from '../services/Token.js';

const router = new express.Router();

router.post('/sign-in', userController.signIn);
router.post('/sign-up', userController.signUp);
router.post('/refresh', userController.refresh);
router.get('/me', TokenService.checkAccess, userController.getUser);
router.post(
  '/update-password',
  TokenService.checkAccess,
  userController.updatePassword
);

router.get('/todos', TokenService.checkAccess, toDoController.getAll);
router.get('/todo/:id', TokenService.checkAccess, toDoController.getById);
router.post('/todo', TokenService.checkAccess, toDoController.create);
router.patch('/todo/:id', TokenService.checkAccess, toDoController.patchToDo);
router.delete('/todo/:id', TokenService.checkAccess, toDoController.deleteToDo);

export default router;
