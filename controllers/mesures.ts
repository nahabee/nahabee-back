import { NextFunction, Request, RequestHandler, Response } from 'express';
import { ErrorHandler } from '../helpers/errors';
import Mesure from '../models/mesure';
import IMesure from '../interfaces/IMesure';
import Joi from 'joi';

// validate new mesure for POST //
const validateMesure = (req: Request, res: Response, next: NextFunction) => {
  let required: Joi.PresenceMode = 'optional';
  if (req.method === 'POST') {
    required = 'required';
  }
  const errors = Joi.object({
    name: Joi.string().max(255).presence(required),
    description: Joi.string().max(255).presence(required),
    id: Joi.number().optional().allow(null), // pour react-admin
  }).validate(req.body, { abortEarly: false }).error;
  if (errors) {
    console.log(errors.message);
    next(new ErrorHandler(422, errors.message));
  } else {
    next();
  }
};

// GET all Mesures
const getAllMesures = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const mesures = await Mesure.getAllMesures();
    res.setHeader(
      'Content-Range',
      `mesures : 0-${mesures.length}/${mesures.length + 1}`
    );
    return res.status(200).json(mesures);
  } catch (err) {
    next(err);
  }
}) as RequestHandler;

//Mesure by id

const getOneMesure = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idMesure } = req.params;
    const mesure = await Mesure.getMesureById(Number(idMesure));
    mesure ? res.status(200).json(mesure) : res.sendStatus(404);
  } catch (err) {
    next(err);
  }
}) as RequestHandler;

//Put mesure
const mesureExists = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { idMesure } = req.params;
  try {
    const mesureExists = await Mesure.getMesureById(Number(idMesure));
    if (!mesureExists) {
      next(new ErrorHandler(404, `This mesure does not exist`));
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}) as RequestHandler;

const updateMesure = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idMesure } = req.params;
    const mesureUpdated = await Mesure.updateMesure(
      Number(idMesure),
      req.body as IMesure
    );
    if (mesureUpdated) {
      const mesure = await Mesure.getMesureById(Number(idMesure));
      res.status(200).send(mesure); // react-admin needs this response
    } else {
      throw new ErrorHandler(500, `Mesure cannot be updated`);
    }
  } catch (err) {
    next(err);
  }
};

// POST mesures
const addMesure = (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const mesure = req.body as IMesure;
    mesure.id = await Mesure.addMesure(mesure);
    res.status(201).json(mesure);
  } catch (err) {
    console.log(err);
    next(err);
  }
}) as RequestHandler;

//DELETE mesure
const deleteMesure = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idMesure } = req.params;
    const mesureDeleted = await Mesure.deleteMesure(Number(idMesure)); // boolean
    if (mesureDeleted) {
      res.sendStatus(204);
    } else {
      throw new ErrorHandler(500, 'Mesure cannot be deleted');
    }
  } catch (err) {
    next(err);
  }
}) as RequestHandler;

export default {
  getAllMesures,
  addMesure,
  deleteMesure,
  mesureExists,
  getOneMesure,
  updateMesure,
  validateMesure,
};
