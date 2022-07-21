import { NextFunction, Request, RequestHandler, Response } from 'express';
import { ErrorHandler } from '../helpers/errors';
import Brand from '../models/brand';
import IBrand from '../interfaces/IBrand';
import Joi from 'joi';

// validate new brand for POST
const validateBrand = (req: Request, res: Response, next: NextFunction) => {
  let required: Joi.PresenceMode = 'optional';
  if (req.method === 'POST') {
    required = 'required';
  }
  const errors = Joi.object({
    name: Joi.string().max(255).presence(required),
    id: Joi.number().optional().allow(null), // pour react-admin
  }).validate(req.body, { abortEarly: false }).error;
  if (errors) {
    console.log(errors.message);
    next(new ErrorHandler(422, errors.message));
  } else {
    next();
  }
};

// GET all Brands
const getAllBrands = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const brands = await Brand.getAllBrands();
    return res.status(200).json(brands);
  } catch (err) {
    next(err);
  }
}) as RequestHandler;

//Brand by id

const getOneBrand = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idBrand } = req.params;
    const brand = await Brand.getBrandById(Number(idBrand));
    brand ? res.status(200).json(brand) : res.sendStatus(404);
  } catch (err) {
    next(err);
  }
}) as RequestHandler;

//Put brand
const brandExists = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { idBrand } = req.params;
  try {
    const brandExists = await Brand.getBrandById(Number(idBrand));
    if (!brandExists) {
      next(new ErrorHandler(404, `This brand does not exist`));
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}) as RequestHandler;

const updateBrand = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { idBrand } = req.params;
    const brandUpdated = await Brand.updateBrand(
      Number(idBrand),
      req.body as IBrand
    );
    if (brandUpdated) {
      const brand = await Brand.getBrandById(Number(idBrand));
      res.status(200).send(brand); // react-admin needs this response
    } else {
      throw new ErrorHandler(500, `Brand cannot be updated`);
    }
  } catch (err) {
    next(err);
  }
};

// POST brands
const addBrand = (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const brand = req.body as IBrand;
    brand.id = await Brand.addBrand(brand);
    res.status(201).json(brand);
  } catch (err) {
    console.log(err);
    next(err);
  }
}) as RequestHandler;

//DELETE brand
const deleteBrand = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idBrand } = req.params;
    const brandDeleted = await Brand.deleteBrand(Number(idBrand)); // boolean
    if (brandDeleted) {
      res.sendStatus(204);
    } else {
      throw new ErrorHandler(500, 'Brand cannot be deleted');
    }
  } catch (err) {
    next(err);
  }
}) as RequestHandler;

export default {
  getAllBrands,
  addBrand,
  deleteBrand,
  brandExists,
  getOneBrand,
  updateBrand,
  validateBrand,
};
