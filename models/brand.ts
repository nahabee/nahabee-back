import { ResultSetHeader } from "mysql2";
import connection from "../db-config";
import IBrand from "../interfaces/IBrand";

// GET all brands
const getAllBrands = async (): Promise<IBrand[]> => {
  const results = await connection
    .promise()
    .query<IBrand[]>(`SELECT * FROM brands`);
  return results[0];
};

// GET brand by ID
const getBrandById = async (idBrand: number): Promise<IBrand> => {
  const [results] = await connection
    .promise()
    .query<IBrand[]>("SELECT * FROM brands WHERE id = ?", [idBrand]);
  return results[0];
};

// POST brands
const addBrand = async (brand: IBrand): Promise<number> => {
  const results = await connection.promise().query<ResultSetHeader>(
    "INSERT INTO brands (name) VALUES (?)",

    brand.name
  );
  return results[0].insertId;
};

// UPDATE Brand
const updateBrand = async (
  idBrand: number,
  brand: IBrand
): Promise<boolean> => {
  let sql = "UPDATE brands SET ";
  const sqlValues: Array<string | number | boolean> = [];
  let oneValue = false;

  if (brand.idPage) {
    sql += oneValue ? ", idPage = ? " : " idPage = ? ";
    sqlValues.push(brand.idPage);
    oneValue = true;
  }
  if (brand.name) {
    sql += oneValue ? ", name = ? " : " name = ? ";
    sqlValues.push(brand.name);
    oneValue = true;
  }
  sql += " WHERE id = ?";
  sqlValues.push(idBrand);

  const results = await connection
    .promise()
    .query<ResultSetHeader>(sql, sqlValues);
  return results[0].affectedRows === 1;
};

//DELETE brand
const deleteBrand = async (idBrand: number): Promise<boolean> => {
  const results = await connection
    .promise()
    .query<ResultSetHeader>("DELETE FROM brands WHERE id = ?", [idBrand]);
  return results[0].affectedRows === 1;
};

export default {
  getAllBrands,
  addBrand,
  deleteBrand,
  getBrandById,
  updateBrand,
};
