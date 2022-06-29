import { Express } from 'express';
import usersController from './controllers/users';

const setupRoutes = (server: Express) => {

    // USERS
  // get users

  server.get('/api/users', usersController.getAllUsers);

  // get one users

  server.get('/api/users/:idUser', usersController.getOneUser);


 //put user 

 server.put('/api/users/:idUser',  usersController.updateUser);



};
export default setupRoutes;
