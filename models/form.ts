import { ResultSetHeader } from 'mysql2';
import connection from '../db-config';
import IForm from '../interfaces/IForm';

// GET all forms
const getAllForms = async (): Promise<IForm[]> => {
  const results = await connection
    .promise()
    .query<IForm[]>(`SELECT * FROM form`);
  return results[0];
};

// form by id

const getFormById = async (idForm: number): Promise<IForm> => {
  const [results] = await connection
    .promise()
    .query<IForm[]>('SELECT * FROM form WHERE id = ?', [idForm]);
  return results[0];
};

// POST forms
const addForm = async (form: IForm): Promise<number> => {
  const results = await connection
    .promise()
    .query<ResultSetHeader>(
      'INSERT INTO form (name, email, message) VALUES (?, ?, ?)',
      [form.name, form.email, form.message]
    );
  return results[0].insertId;
};

//DELETE form
const deleteForm = async (idForm: number): Promise<boolean> => {
  const results = await connection
    .promise()
    .query<ResultSetHeader>('DELETE FROM form WHERE id = ?', [idForm]);
  return results[0].affectedRows === 1;
};

export default {
  getAllForms,
  addForm,
  deleteForm,
  getFormById,
};
