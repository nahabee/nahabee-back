import { NextFunction, Request, RequestHandler, Response } from 'express';
import { ErrorHandler } from '../helpers/errors';
import Form from '../models/form';
import IForm from '../interfaces/IForm';
import Joi from 'joi';

// validate new brand for POST
const validateForm = (req: Request, res: Response, next: NextFunction) => {
  let required: Joi.PresenceMode = 'optional';
  if (req.method === 'POST') {
    required = 'required';
  }

  const errors = Joi.object({
    name: Joi.string().max(255).presence(required),
    email: Joi.string().max(255).presence(required),
    message: Joi.string().max(255).presence(required),
    id: Joi.number().optional().allow(null), // pour react-admin
  }).validate(req.body, { abortEarly: false }).error;
  if (errors) {
    console.log(errors.message);
    next(new ErrorHandler(422, errors.message));
  } else {
    next();
  }
};
//form by ID
const getOneForm = (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { idForm } = req.params;
    const form = await Form.getFormById(Number(idForm));
    form ? res.status(200).json(form) : res.sendStatus(404);
  } catch (err) {
    next(err);
  }
}) as RequestHandler;

// GET all forms
const getAllForms = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const forms = await Form.getAllForms();
    res.setHeader(
      'Content-Range',
      `forms : 0-${forms.length}/${forms.length + 1}`
    );
    return res.status(200).json(forms);
  } catch (err) {
    next(err);
  }
}) as RequestHandler;

//Put form
const formExists = (async (req: Request, res: Response, next: NextFunction) => {
  const { idForm } = req.params;
  try {
    const formExists = await Form.getFormById(Number(idForm));
    if (!formExists) {
      next(new ErrorHandler(404, `This form does not exist`));
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}) as RequestHandler;

// POST forms
const addForm = (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const form = req.body as IForm;
    form.id = await Form.addForm(form);
    res.status(201).json(form);
  } catch (err) {
    console.log(err);
    next(err);
  }
}) as RequestHandler;

//DELETE form
const deleteForm = (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { idForm } = req.params;
    const formDeleted = await Form.deleteForm(Number(idForm)); // boolean
    if (formDeleted) {
      res.sendStatus(204);
    } else {
      throw new ErrorHandler(500, 'Form cannot be deleted');
    }
  } catch (err) {
    next(err);
  }
}) as RequestHandler;

export default {
  getAllForms,
  addForm,
  deleteForm,
  formExists,
  validateForm,
  getOneForm,
};
