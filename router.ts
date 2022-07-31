import { Express } from 'express';
import brandsController from './controllers/brands';
import imagesController from './controllers/images';
import formsController from './controllers/forms';
import pagesController from './controllers/pages';
import usersController from './controllers/users';
import mesuresController from './controllers/mesures';
import authController from './controllers/auth';

const setupRoutes = (server: Express) => {
  // >> --- GET ALL Brands ---
  server.get('/api/brands', brandsController.getAllBrands);

  // ? GET a brand by id
  server.get('/api/brands/:idBrand', brandsController.getOneBrand);

  // ? POST a new brand
  server.post(
    '/api/brands',
    brandsController.validateBrand,
    brandsController.addBrand
  );

  // ? MODIFY brand
  server.put(
    '/api/brands/:idBrand',
    brandsController.validateBrand,
    brandsController.brandExists,
    brandsController.updateBrand
  );

  // ? DELETE a brand
  server.delete(
    '/api/brands/:idBrand',
    brandsController.brandExists,
    brandsController.deleteBrand
  );

  // >> --- GET ALL Images ---
  server.get('/api/images', imagesController.getAllImages);

  // ? GET a image by id
  server.get('/api/images/:idImage', imagesController.getOneImage);

  //GET IMAGE FOR A SPECIFIC PAGE
  server.get('/api/pages/:idPage/images', imagesController.getImagesByPage);

  // ? POST a new image
  server.post(
    '/api/images',
    imagesController.validateImage,
    imagesController.addImage
  );

  // ? MODIFY image
  server.put(
    '/api/images/:idImage',
    imagesController.validateImage,
    imagesController.imageExists,
    imagesController.updateImage
  );

  // ? DELETE an image
  server.delete(
    '/api/images/:idImage',
    imagesController.imageExists,
    imagesController.deleteImage
  );

  // >> --- GET ALL Pages ---
  server.get('/api/pages', pagesController.getAllPages);

  // ? GET a page by id
  server.get('/api/pages/:idPage', pagesController.getOnePage);

  // ? POST a new page
  server.post(
    '/api/pages',
    pagesController.validatePage,
    pagesController.addPage
  );

  // ? MODIFY page
  server.put(
    '/api/pages/:idPage',
    pagesController.validatePage,
    pagesController.pageExists,
    pagesController.updatePage
  );

  // ? DELETE a page
  server.delete(
    '/api/pages/:idPage',
    pagesController.pageExists,
    pagesController.deletePage
  );

  // ? GET ALL Forms
  server.get('/api/form', formsController.getAllForms);

  // ? POST a new form
  server.post(
    '/api/form',
    formsController.validateForm,
    formsController.addForm
  );

  // ? DELETE a form
  server.delete(
    '/api/form/:idForm',
    formsController.formExists,
    formsController.deleteForm
  );

  // >> --- GET ALL Mesures ---
  server.get('/api/mesures', mesuresController.getAllMesures);

  // ? GET a mesure by id
  server.get('/api/mesures/:idMesure', mesuresController.getOneMesure);

  // ? POST a new mesure
  server.post(
    '/api/mesures',
    mesuresController.validateMesure,
    mesuresController.addMesure
  );

  // ? MODIFY mesure
  server.put(
    '/api/mesures/:idMesure',
    mesuresController.validateMesure,
    mesuresController.mesureExists,
    mesuresController.updateMesure
  );

  // ? DELETE a mesure
  server.delete(
    '/api/mesures/:idMesure',
    mesuresController.mesureExists,
    mesuresController.deleteMesure
  );

  // USERS
  // get users
  server.get('/api/users', usersController.getAllUsers);
  // post users, checking if email is free then adding user
  server.post(
    '/api/users',
    // valide les données fournies dans la requete
    usersController.validateUser,
    // je vérifie que l'email est disponible
    // aucun utilisateur n'est déjà enregistré
    usersController.emailIsFree,
    usersController.addUser
  );
  // put users, checking if user exists and updates it
  server.put(
    '/api/users/:idUser',
    authController.getCurrentSession,
    authController.checkSessionPrivileges,
    usersController.validateUser,
    usersController.userExists,
    usersController.updateUser
  );
  // delete user by id
  server.delete(
    '/api/users/:idUser',
    authController.getCurrentSession,
    authController.checkSessionPrivileges,
    usersController.userExists,
    usersController.deleteUser
  );

  // LOGIN
  server.post('/api/login', authController.validateLogin, authController.login);
};

export default setupRoutes;
