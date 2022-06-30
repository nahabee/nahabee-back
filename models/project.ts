import { ResultSetHeader } from "mysql2";
import connection from "../db-config";
import IProject from "../interfaces/IProject";

// GET all projects
const getAllProjects = async (): Promise<IProject[]> => {
    const results = await connection
    .promise()
    .query<IProject[]>(`SELECT * FROM projects`);
    return results[0];
};

// POST project
const addProject = async(project: IProject) : Promise<number> => {
    const results = await connection
    .promise()
    .query<ResultSetHeader>('INSERT INTO projects (nameProject, image, projectDesc, client, subsidiary,startDate, finalDate, progress, industryTag, color, projectManager) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
    [project.nameProject, project.image, project.projectDesc, project.client, project.subsidiary,project.startDate, project.finalDate, project.progress, project.industryTag, project.color, project.projectManager]);
    return results[0].insertId;
};

//DELETE project
const deleteProject = async (idProject : number) : Promise<boolean> => {
    const results = await connection
    .promise()
    .query<ResultSetHeader>('DELETE FROM projects WHERE id = ?', [idProject]);
    return results[0].affectedRows === 1;
  };

  export default { getAllProjects, addProject, deleteProject };