import connection from '../db-config';
import { ResultSetHeader } from 'mysql2';
import IUser from '../interfaces/IUser';import IUser from '../interfaces/IUser';
import { NextFunction, Request, Response } from 'express';
import { ErrorHandler } from '../helpers/errors';


const getAllUsers = async (sortBy = ''): Promise<IUser[]> => {
    let sql = `SELECT id, firstname, lastname, email, isIntern FROM users`;
    const results = await connection.promise().query<IUser[]>(sql);
    return results[0];
  };

  const getUserById = async (idUser: number): Promise<IUser> => {
    const [results] = await connection
      .promise()
      .query<IUser[]>(
        'SELECT id, firstname, lastname, email, isIntern FROM users WHERE id = ?',
        [idUser]
      );
    return results[0];
  };


  // route put 

  const updateUser = async (idUser: number, user: IUser): Promise<boolean> => {
    let sql = 'UPDATE users SET ';
    const sqlValues: Array<string | number | boolean > = [];
    let oneValue = false;
  
    if (user.firstname) {
      sql += 'firstname = ? ';
      sqlValues.push(user.firstname);
      oneValue = true;
    }
    if (user.lastname) {
      sql += oneValue ? ', lastname = ? ' : ' lastname = ? ';
      sqlValues.push(user.lastname);
      oneValue = true;
    }
    if (user.email) {
      sql += oneValue ? ', email = ? ' : ' email = ? ';
      sqlValues.push(user.email);
      oneValue = true;
    }
    if (user.password) {
      sql += oneValue ? ', password = ? ' : ' password = ? ';
      sqlValues.push(user.password);
      oneValue = true;
    }
    if (user.isIntern) {
      sql += oneValue ? ', inIntern = ? ' : ' isIntern = ? ';
      sqlValues.push(user.admin);
      oneValue = true;
    }
    sql += ' WHERE id = ?';
    sqlValues.push(idUser);
  
    const results = await connection
      .promise()
      .query<ResultSetHeader>(sql, sqlValues);
    return results[0].affectedRows === 1;
  };

const getUserByEmail = async (email: string): Promise<IUser> => {
  const [results] = await connection
    .promise()
    .query<IUser[]>(
      'SELECT id, firstname, lastname, email, password, isIntern FROM users WHERE email = ?',
      [email]
    );
  return results[0];
};

const getUserById = async (idUser: number): Promise<IUser> => {
  const [results] = await connection
    .promise()
    .query<IUser[]>(
      'SELECT id, firstname, lastname, email, password, isIntern FROM users WHERE id = ?',
      [idUser]
    );
  return results[0];
};

const emailIsFree = async (req: Request, res: Response, next: NextFunction) => {
  // Récupèrer l'email dans le req.body
  const user = req.body as IUser;
  // Vérifier si l'email appartient déjà à un user
  const userExists: IUser = await getUserByEmail(user.email);
  // Si oui => erreur
  if (userExists) {
    next(new ErrorHandler(409, `This user already exists`));
  } else {
    // Si non => next
    next();
  }
};

const addUser = async (user: IUser): Promise<number> => {
  const results = await connection
    .promise()
    .query<ResultSetHeader>(
      'INSERT INTO users (firstname, lastname, email, password, isIntern) VALUES (?, ?, ?, ?, ?)',
      [user.firstname, user.lastname, user.email, user.password, user.isIntern]
    );
  return results[0].insertId;
};

const updateUser = async (idUser: number, user: IUser): Promise<boolean> => {
  let sql = 'UPDATE users SET ';
  const sqlValues: Array<string | number | boolean | Date> = [];
  let oneValue = false;

  if (user.firstname) {
    sql += 'firstname = ? ';
    sqlValues.push(user.firstname);
    oneValue = true;
  }
  if (user.lastname) {
    sql += oneValue ? ', lastname = ? ' : ' lastname = ? ';
    sqlValues.push(user.lastname);
    oneValue = true;
  }
  if (user.email) {
    sql += oneValue ? ', email = ? ' : ' email = ? ';
    sqlValues.push(user.email);
    oneValue = true;
  }
  if (user.email) {
    sql += oneValue ? ', email = ? ' : ' email = ? ';
    sqlValues.push(user.email);
    oneValue = true;
  }
  if (user.password) {
    sql += oneValue ? ', password = ? ' : ' password = ? ';
    sqlValues.push(user.password);
    oneValue = true;
  }
  if (user.isIntern) {
    sql += oneValue ? ', isIntern = ? ' : ' isIntern = ? ';
    sqlValues.push(user.isIntern);
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
  getUserByEmail,
  deleteUser,
  updateUser,
  emailIsFree,
  getUserById,
  addUser,
  getAllUsers,
  getUserById,
  updateUser
};

