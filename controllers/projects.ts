import { NextFunction, Request, RequestHandler, Response } from 'express';
import { ErrorHandler } from '../helpers/errors';
import IProject from '../interfaces/IProject';
import Project from '../models/project';

// GET all projects
const getAllProjects = (async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projects = await Project.getAllProjects();
      return res.status(200).json(projects);
    } catch (err) {
      next(err);
    }
}) as RequestHandler;

// POST project
const addProject = (async (req: Request, res: Response, next: NextFunction) => {
    try {
      const project = req.body as IProject;
      project.id = await Project.addProject(project);
      res.status(201).json(project);
    } catch(err) {
      console.log(err)
      next(err);
    }
}) as RequestHandler;

//DELETE project
const deleteProject = (async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { idProject } = req.params;
      const projectDeleted = await Project.deleteProject(Number(idProject)); // boolean
      if(projectDeleted) {
        res.sendStatus(204);
      } else {
        throw new ErrorHandler(500, 'Article cannot be deleted');
      }
    } catch(err) {
      next(err);
    }
  }) as RequestHandler;

export default { getAllProjects, addProject, deleteProject };