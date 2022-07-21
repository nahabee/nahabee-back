import { ResultSetHeader } from 'mysql2';
import connection from '../db-config';
import IPage from '../interfaces/IPage';

// GET all pages
const getAllPages = async (): Promise<IPage[]> => {
  const results = await connection
    .promise()
    .query<IPage[]>(`SELECT * FROM pages`);
  return results[0];
};

// GET pages by ID
const getPageById = async (idPage: number): Promise<IPage> => {
  const [results] = await connection
    .promise()
    .query<IPage[]>('SELECT * FROM pages WHERE id = ?', [idPage]);
  return results[0];
};

// POST pages
const addPage = async (page: IPage): Promise<number> => {
  const results = await connection
    .promise()
    .query<ResultSetHeader>(
      'INSERT INTO pages (title, description) VALUES (?, ?)',
      [page.title, page.description]
    );
  return results[0].insertId;
};

// UPDATE page
const updatePage = async (idPage: number, page: IPage): Promise<boolean> => {
  let sql = 'UPDATE pages SET ';
  const sqlValues: Array<string | number | boolean> = [];
  let oneValue = false;

  if (page.idPage) {
    sql += oneValue ? ', idPage = ? ' : ' idPage = ? ';
    sqlValues.push(page.idPage);
    oneValue = true;
  }
  if (page.title) {
    sql += oneValue ? ', title = ? ' : ' title = ? ';
    sqlValues.push(page.title);
    oneValue = true;
  }
  if (page.description) {
    sql += oneValue ? ', description = ? ' : ' description = ? ';
    sqlValues.push(page.description);
    oneValue = true;
  }
  sql += ' WHERE id = ?';
  sqlValues.push(idPage);

  const results = await connection
    .promise()
    .query<ResultSetHeader>(sql, sqlValues);
  return results[0].affectedRows === 1;
};

//DELETE page
const deletePage = async (idPage: number): Promise<boolean> => {
  const results = await connection
    .promise()
    .query<ResultSetHeader>('DELETE FROM pages WHERE id = ?', [idPage]);
  return results[0].affectedRows === 1;
};

export default {
  getAllPages,
  addPage,
  deletePage,
  getPageById,
  updatePage,
};
