import connection from '../db-config';
import { ResultSetHeader } from 'mysql2';
import IUser from '../interfaces/IUser';



const getAllUsers = async (sortBy = ''): Promise<IUser[]> => {
    let sql = `SELECT id, firstname, lastname, email, isIntern FROM users`;
    if (sortBy) {
      sql += ` ORDER BY ${sortBy}`;
    }
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



  export {
    getAllUsers,getUserById,updateUser
  };