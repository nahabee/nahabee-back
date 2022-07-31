import connection from '../db-config';
import IUser from '../interfaces/IUser';
import argon2, { Options } from 'argon2';
import { ResultSetHeader } from 'mysql2';

const hashingOptions: Options & { raw?: false } = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashPassword = (password: string): Promise<string> => {
  return argon2.hash(password, hashingOptions);
};

const verifyPassword = (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return argon2.verify(hashedPassword, password, hashingOptions);
};

const getAllUsers = async (sortBy = ''): Promise<IUser[]> => {
  let sql = `SELECT id, name, email FROM users`;
  if (sortBy) {
    sql += ` ORDER BY ${sortBy}`;
  }
  const results = await connection.promise().query<IUser[]>(sql);
  return results[0];
};

const getUserById = async (idUser: number): Promise<IUser> => {
  const [results] = await connection
    .promise()
    .query<IUser[]>('SELECT id, name, email FROM users WHERE id = ?', [idUser]);
  return results[0];
};

const getUserByEmail = async (email: string): Promise<IUser> => {
  const [results] = await connection
    .promise()
    .query<IUser[]>('SELECT id, name, email FROM users WHERE email = ?', [
      email,
    ]);
  return results[0];
};

const addUser = async (user: IUser): Promise<number> => {
  const hashedPassword = await hashPassword(user.password);
  const results = await connection
    .promise()
    .query<ResultSetHeader>(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [user.name, user.email, hashedPassword]
    );

  console.log(hashedPassword);
  console.log(results);
  console.log(results[0]);

  return results[0].insertId;
};

const updateUser = async (idUser: number, user: IUser): Promise<boolean> => {
  let sql = 'UPDATE users SET ';
  const sqlValues: Array<string | number | boolean | Date> = [];
  let oneValue = false;

  if (user.firstname) {
    sql += 'name = ? ';
    sqlValues.push(user.name);
    oneValue = true;
  }
  if (user.email) {
    sql += oneValue ? ', email = ? ' : ' email = ? ';
    sqlValues.push(user.email);
    oneValue = true;
  }
  if (user.password) {
    sql += oneValue ? ', password = ? ' : ' password = ? ';
    const hashedPassword: string = await hashPassword(user.password);
    sqlValues.push(hashedPassword);
    oneValue = true;
  }
  sql += ' WHERE id = ?';
  sqlValues.push(idUser);

  const results = await connection
    .promise()
    .query<ResultSetHeader>(sql, sqlValues);
  return results[0].affectedRows === 1;
};

const deleteUser = async (idUser: number): Promise<boolean> => {
  const results = await connection
    .promise()
    .query<ResultSetHeader>('DELETE FROM users WHERE id = ?', [idUser]);
  return results[0].affectedRows === 1;
};

export {
  verifyPassword,
  getAllUsers,
  addUser,
  getUserByEmail,
  getUserById,
  deleteUser,
  updateUser,
};
