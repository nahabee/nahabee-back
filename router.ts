import { Express } from 'express';
import usersController from './controllers/users';
import projectsController from './controllers/projects';


const setupRoutes = (server: Express) => {

    
  // USERS //
  // get users

  server.get('/api/users', usersController.getAllUsers);

  // get one users

  server.get('/api/users/:idUser', usersController.getOneUser);


 //put user 

 server.put('/api/users/:idUser',  usersController.updateUser);


  // post users, checking if user exists and updates it
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
  
  // PROJECTS //
  //GET all projects
  server.get('/api/projects', projectsController.getAllProjects);
  //POST project
  server.post('/api/projects', projectsController.addProject);
  //DELETE project
  server.delete('/api/projects/:idProject', projectsController.deleteProject);

};

export default setupRoutes;
