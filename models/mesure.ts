import { ResultSetHeader } from 'mysql2';
import connection from '../db-config';
import IMesure from '../interfaces/IMesure';

// GET all mesures
const getAllMesures = async (): Promise<IMesure[]> => {
  const results = await connection
    .promise()
    .query<IMesure[]>(`SELECT * FROM mesures`);
  return results[0];
};

// GET mesure by ID
const getMesureById = async (idMesure: number): Promise<IMesure> => {
  const [results] = await connection
    .promise()
    .query<IMesure[]>('SELECT * FROM mesures WHERE id = ?', [idMesure]);
  return results[0];
};

// POST mesures
const addMesure = async (mesure: IMesure): Promise<number> => {
  const results = await connection
    .promise()
    .query<ResultSetHeader>(
      'INSERT INTO mesures (name, description) VALUES (?, ?)',
      [mesure.name, mesure.description]
    );
  return results[0].insertId;
};

// UPDATE mesure
const updateMesure = async (
  idMesure: number,
  mesure: IMesure
): Promise<boolean> => {
  let sql = 'UPDATE mesures SET ';
  const sqlValues: Array<string | number | boolean> = [];
  let oneValue = false;

  if (mesure.name) {
    sql += oneValue ? ', name = ? ' : ' name = ? ';
    sqlValues.push(mesure.name);
    oneValue = true;
  }
  if (mesure.description) {
    sql += oneValue ? ', description = ? ' : ' description = ? ';
    sqlValues.push(mesure.description);
    oneValue = true;
  }
  sql += ' WHERE id = ?';
  sqlValues.push(idMesure);

  const results = await connection
    .promise()
    .query<ResultSetHeader>(sql, sqlValues);
  return results[0].affectedRows === 1;
};

//DELETE mesure
const deleteMesure = async (idMesure: number): Promise<boolean> => {
  const results = await connection
    .promise()
    .query<ResultSetHeader>('DELETE FROM mesures WHERE id = ?', [idMesure]);
  return results[0].affectedRows === 1;
};

export default {
  getAllMesures,
  addMesure,
  deleteMesure,
  getMesureById,
  updateMesure,
};
