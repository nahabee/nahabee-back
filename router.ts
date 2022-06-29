import usersController from './controllers/users';
import { Express } from 'express';

const setupRoutes = (server: Express) => {
  // put users, checking if user exists and updates it
  server.post(
    '/api/users',
    usersController.emailIsFree,
    usersController.addUser
  );
  // delete user by id
  server.delete(
    '/api/users/:idUser',
    usersController.userExists,
    usersController.deleteUser
  );
};

export default setupRoutes;
