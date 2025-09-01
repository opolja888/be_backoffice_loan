import { Router } from 'express';
import { UserController } from './user.controller.js';
// import { validate } from '../../middlewares/async-handler.js';
// import { createUserDto } from './user.validations.js';

const r = Router();
r.get('/', UserController.list);
// r.post('/', validate(createUserDto), UserController.create);

export default { basePath: '/users', router: r };