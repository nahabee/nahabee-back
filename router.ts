import usersController from './controllers/users';
import projectsController from './controllers/projects';
import { Express } from 'express';

const setupRoutes = (server: Express) => {

  // USERS //
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
