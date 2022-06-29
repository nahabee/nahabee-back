import { Express } from 'express';
import projectsController from './controllers/projects';

const setupRoutes = (server: Express) => {

server.get('/api/coucou', (req, res) => {
    res.send('hibou');
});

// PROJECTS //
//GET all projects
server.get('/api/projects', projectsController.getAllProjects);
//POST project
server.post('/api/projects', projectsController.addProject);
//DELETE project
server.delete('/api/projects/:idProject', projectsController.deleteProject);

};

export default setupRoutes;
