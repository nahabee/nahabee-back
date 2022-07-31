import { NextFunction, Request, RequestHandler, Response } from 'express';
import { ErrorHandler } from '../helpers/errors';
import Image from '../models/image';
import IImage from '../interfaces/IImage';
import Joi from 'joi';

// validate new image for POST
const validateImage = (req: Request, res: Response, next: NextFunction) => {
  let required: Joi.PresenceMode = 'optional';
  if (req.method === 'POST') {
    required = 'required';
  }
  const errors = Joi.object({
    name: Joi.string().max(255).presence(required),
    id: Joi.number().optional().allow(null), // pour react-admin
    idPage: Joi.number().optional(),
    brand: Joi.string().max(255).presence(required),
  }).validate(req.body, { abortEarly: false }).error;
  if (errors) {
    console.log(errors.message);
    next(new ErrorHandler(422, errors.message));
  } else {
    next();
  }
};

// GET all Images
const getAllImages = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const images = await Image.getAllImages();
    res.setHeader(
      'Content-Range',
      `images : 0-${images.length}/${images.length + 1}`
    );
    return res.status(200).json(images);
  } catch (err) {
    next(err);
  }
}) as RequestHandler;

// GET IMAGES : by PAGE
const getImagesByPage = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idPage } = req.params;
    const images = await Image.getImagesByPage(Number(idPage));
    res.status(200).json(images);
  } catch (err) {
    next(err);
  }
}) as RequestHandler;

//Image by id

const getOneImage = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idImage } = req.params;
    const image = await Image.getImageById(Number(idImage));
    image ? res.status(200).json(image) : res.sendStatus(404);
  } catch (err) {
    next(err);
  }
}) as RequestHandler;

//Put Image
const imageExists = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { idImage } = req.params;
  try {
    const imageExists = await Image.getImageById(Number(idImage));
    if (!imageExists) {
      next(new ErrorHandler(404, `This image does not exist`));
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}) as RequestHandler;

const updateImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { idImage } = req.params;
    const imageUpdated = await Image.updateImage(
      Number(idImage),
      req.body as IImage
    );
    if (imageUpdated) {
      const image = await Image.getImageById(Number(idImage));
      res.status(200).send(image); // react-admin needs this response
    } else {
      throw new ErrorHandler(500, `Image cannot be updated`);
    }
  } catch (err) {
    next(err);
  }
};

// POST images
const addImage = (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const image = req.body as IImage;
    image.id = await Image.addImage(image);
    res.status(201).json(image);
  } catch (err) {
    console.log(err);
    next(err);
  }
}) as RequestHandler;

//DELETE images
const deleteImage = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idImage } = req.params;
    const imagetDeleted = await Image.deleteImage(Number(idImage)); // boolean
    if (imagetDeleted) {
      res.sendStatus(204);
    } else {
      throw new ErrorHandler(500, 'Image cannot be deleted');
    }
  } catch (err) {
    next(err);
  }
}) as RequestHandler;

export default {
  getAllImages,
  addImage,
  deleteImage,
  imageExists,
  getOneImage,
  updateImage,
  validateImage,
  getImagesByPage,
};
