import { NextFunction, Request, RequestHandler, Response } from 'express';
import { ErrorHandler } from '../helpers/errors';
import Page from '../models/page';
import IPage from '../interfaces/IPage';
import Joi from 'joi';

// validate new page for POST
const validatePage = (req: Request, res: Response, next: NextFunction) => {
  let required: Joi.PresenceMode = 'optional';
  if (req.method === 'POST') {
    required = 'required';
  }
  const errors = Joi.object({
    title: Joi.string().max(255).presence(required),
    id: Joi.number().optional().allow(null), // pour react-admin
  }).validate(req.body, { abortEarly: false }).error;
  if (errors) {
    console.log(errors.message);
    next(new ErrorHandler(422, errors.message));
  } else {
    next();
  }
};

// GET all pages
const getAllPages = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const pages = await Page.getAllPages();
    res.setHeader(
      'Content-Range',
      `pages : 0-${pages.length}/${pages.length + 1}`
    );
    return res.status(200).json(pages);
  } catch (err) {
    next(err);
  }
}) as RequestHandler;

//Pages by id

const getOnePage = (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { idPage } = req.params;
    const page = await Page.getPageById(Number(idPage));
    page ? res.status(200).json(page) : res.sendStatus(404);
  } catch (err) {
    next(err);
  }
}) as RequestHandler;

//Put page
const pageExists = (async (req: Request, res: Response, next: NextFunction) => {
  const { idPage } = req.params;
  try {
    const pageExists = await Page.getPageById(Number(idPage));
    if (!pageExists) {
      next(new ErrorHandler(404, `This page does not exist`));
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}) as RequestHandler;

const updatePage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { idPage } = req.params;
    const pageUpdated = await Page.updatePage(
      Number(idPage),
      req.body as IPage
    );
    if (pageUpdated) {
      const page = await Page.getPageById(Number(idPage));
      res.status(200).send(page); // react-admin needs this response
    } else {
      throw new ErrorHandler(500, `Page cannot be updated`);
    }
  } catch (err) {
    next(err);
  }
};

// POST pages
const addPage = (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = req.body as IPage;
    page.id = await Page.addPage(page);
    res.status(201).json(page);
  } catch (err) {
    console.log(err);
    next(err);
  }
}) as RequestHandler;

//DELETE page
const deletePage = (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { idPage } = req.params;
    const pagetDeleted = await Page.deletePage(Number(idPage)); // boolean
    if (pagetDeleted) {
      res.sendStatus(204);
    } else {
      throw new ErrorHandler(500, 'Page cannot be deleted');
    }
  } catch (err) {
    next(err);
  }
}) as RequestHandler;

export default {
  getAllPages,
  addPage,
  deletePage,
  pageExists,
  getOnePage,
  updatePage,
  validatePage,
};
