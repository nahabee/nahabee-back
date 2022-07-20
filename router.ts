import { Express } from 'express';
import brandsController from './controllers/brands';

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
};

export default setupRoutes;
