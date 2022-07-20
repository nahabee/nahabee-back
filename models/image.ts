import { ResultSetHeader } from 'mysql2';
import connection from '../db-config';
import IImage from '../interfaces/IImage';

// GET all images
const getAllImages = async (): Promise<IImage[]> => {
  const results = await connection
    .promise()
    .query<IImage[]>(`SELECT * FROM images`);
  return results[0];
};
// Get Image FROM A SPECIFIC PAGE

const getImagesByPage = async (idPage: number): Promise<IImage[]> => {
  const results = await connection
    .promise()
    .query<IImage[]>('SELECT * FROM images WHERE idPage = ?', [idPage]);

  return results[0];
};

// GET images by ID
const getImageById = async (idImage: number): Promise<IImage> => {
  const [results] = await connection
    .promise()
    .query<IImage[]>('SELECT * FROM images WHERE id = ?', [idImage]);
  return results[0];
};

// POST images
const addImage = async (image: IImage): Promise<number> => {
  const results = await connection
    .promise()
    .query<ResultSetHeader>(
      'INSERT INTO images (name, idPage) VALUES (? , ?, ?)',
      [image.name, image.idPage, image.brand]
    );
  return results[0].insertId;
};

// UPDATE Image
const updateImage = async (
  idImage: number,
  image: IImage
): Promise<boolean> => {
  let sql = 'UPDATE images SET ';
  const sqlValues: Array<string | number | boolean> = [];
  let oneValue = false;

  if (image.idPage) {
    sql += oneValue ? ', idPage = ? ' : ' idPage = ? ';
    sqlValues.push(image.idPage);
    oneValue = true;
  }
  if (image.name) {
    sql += oneValue ? ', name = ? ' : ' name = ? ';
    sqlValues.push(image.name);
    oneValue = true;
  }
  if (image.brand) {
    sql += oneValue ? ', brand = ? ' : ' brand = ? ';
    sqlValues.push(image.brand);
    oneValue = true;
  }
  sql += ' WHERE id = ?';
  sqlValues.push(idImage);

  const results = await connection
    .promise()
    .query<ResultSetHeader>(sql, sqlValues);
  return results[0].affectedRows === 1;
};

//DELETE image
const deleteImage = async (idImage: number): Promise<boolean> => {
  const results = await connection
    .promise()
    .query<ResultSetHeader>('DELETE FROM images WHERE id = ?', [idImage]);
  return results[0].affectedRows === 1;
};

export default {
  getAllImages,
  addImage,
  deleteImage,
  getImageById,
  updateImage,
  getImagesByPage,
};
