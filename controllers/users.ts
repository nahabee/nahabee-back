import { NextFunction, Request, RequestHandler, Response } from 'express';
import * as User from '../models/user';
import IUser from '../interfaces/IUser';
import { ErrorHandler } from '../helpers/errors';
import { formatSortString } from '../helpers/functions';
import Joi from 'joi';

///////////// USERS ///////////////
// validates inputs
const validateUser = (req: Request, res: Response, next: NextFunction) => {
  let required: Joi.PresenceMode = 'optional';
  if (req.method === 'POST') {
    required = 'required';
  }
  const errors = Joi.object({
    name: Joi.string().max(100).presence(required),
    email: Joi.string().email().max(255).presence(required),
    password: Joi.string().min(8).max(15).presence(required),
    id: Joi.number().optional(), // for react-admin
  }).validate(req.body, { abortEarly: false }).error;
  if (errors) {
    next(new ErrorHandler(422, errors.message));
  } else {
    next();
  }
};

// get all users
const getAllUsers = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sortBy: string = req.query.sort as string;
    const users = await User.getAllUsers(formatSortString(sortBy));

    res.setHeader(
      'Content-Range',
      `users : 0-${users.length}/${users.length + 1}`
    );
    return res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}) as RequestHandler; // Used to avoid eslint error : Promise returned in function argument where a void return was expected

// get one user
const getOneUser = (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { idUser } = req.params;
    const user = await User.getUserById(Number(idUser));
    user ? res.status(200).json(user) : res.sendStatus(404);
  } catch (err) {
    next(err);
  }
}) as RequestHandler;

// checks if user exists
const userExists = (async (req: Request, res: Response, next: NextFunction) => {
  // Récupèrer l'id user de req.params
  const { idUser } = req.params;
  // Vérifier si le user existe
  try {
    const userExists = await User.getUserById(Number(idUser));
    // Si non, => erreur
    if (!userExists) {
      next(new ErrorHandler(404, `This user doesn't exist`));
    }
    // Si oui => next
    else {
      next();
    }
  } catch (err) {
    next(err);
  }
}) as RequestHandler;

// adds a user
const addUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body as IUser;
    user.id = await User.addUser(user);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

// updates a user
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { idUser } = req.params;
    const userUpdated = await User.updateUser(
      Number(idUser),
      req.body as IUser
    );
    if (userUpdated) {
      const user = await User.getUserById(Number(idUser));
      res.status(200).send(user); // react-admin needs this response
    } else {
      throw new ErrorHandler(500, `User cannot be updated`);
    }
  } catch (err) {
    next(err);
  }
};

// delete one user
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Récupèrer l'id user de req.params
    const { idUser } = req.params;
    // Vérifier si le user existe
    const user = await User.getUserById(Number(idUser));
    const userDeleted = await User.deleteUser(Number(idUser));
    if (userDeleted) {
      res.status(200).send(user); // react-admin needs this response
    } else {
      throw new ErrorHandler(500, `This user cannot be deleted`);
    }
  } catch (err) {
    next(err);
  }
};

export default {
  getAllUsers,
  getOneUser,
  userExists,
  deleteUser,
  validateUser,
  addUser,
  updateUser,
};
