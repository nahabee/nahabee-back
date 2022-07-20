import { Express } from "express";
import brandsController from "./controllers/brands";
import imagesController from "./controllers/images";

const setupRoutes = (server: Express) => {
  // >> --- GET ALL Brands ---
  server.get("/api/brands", brandsController.getAllBrands);

  // ? GET a brand by id
  server.get("/api/brands/:idBrand", brandsController.getOneBrand);

  // ? POST a new brand
  server.post(
    "/api/brands",
    brandsController.validateBrand,
    brandsController.addBrand
  );

  // ? MODIFY brand
  server.put(
    "/api/brands/:idBrand",
    brandsController.validateBrand,
    brandsController.brandExists,
    brandsController.updateBrand
  );

  // ? DELETE a brand
  server.delete(
    "/api/brands/:idBrand",
    brandsController.brandExists,
    brandsController.deleteBrand
  );

  // >> --- GET ALL Images ---
  server.get("/api/images", imagesController.getAllImages);

  // ? GET a image by id
  server.get("/api/images/:idImage", imagesController.getOneImage);

  // ? POST a new image
  server.post(
    "/api/images",
    imagesController.validateImage,
    imagesController.addImage
  );

  // ? MODIFY image
  server.put(
    "/api/images/:idImage",
    imagesController.validateImage,
    imagesController.imageExists,
    imagesController.updateImage
  );

  // ? DELETE an image
  server.delete(
    "/api/images/:idImage",
    imagesController.imageExists,
    imagesController.deleteImage
  );
};

export default setupRoutes;
