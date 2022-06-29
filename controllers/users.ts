import { NextFunction, Request, RequestHandler, Response } from 'express';
import * as User from '../models/user';
import IUser from '../interfaces/IUser';
import { ErrorHandler } from '../helpers/errors';



///////////// USERS ///////////////

// get all users
const getAllUsers = (async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const sortBy: string = req.query.sort as string;
      const users = await User.getAllUsers(sortBy);
  
      res.setHeader(
        'Content-Range',
        `users : 0-${users.length}/${users.length + 1}`
      );
      return res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }) as RequestHandler; 


  //get one user from
  const getOneUser = (async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { idUser } = req.params;
      const user = await User.getUserById(Number(idUser));
      user ? res.status(200).json(user) : res.sendStatus(404);
    } catch (err) {
      next(err);
    }
  }) as RequestHandler;

  // put user into
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
  


  export default {
    getAllUsers,getOneUser,updateUser
  };