import { Router, Request, Response } from "express";
// import UserController from "./Controllers/UserController";

import {
  showOne,
  get,
  create,
  // destroy,
  // update,
  createOneImageForProduct,
} from "./Controllers/ProductsController";
import { multerConfig } from "./config/uploader";
import UserController from "./Controllers/UserController";
import {
  getImages,
  getImagesForOnePrpductID,
} from "./Controllers/ImagesController";
// import {
//   createImages,
//   getImages,
//   getImagesForOnePrpductID,
// } from "../controllers/imagesController";

const routes = Router();

routes.get("/", (req: Request, res: Response) => {
  return res.status(200).json({ msg: `⚡ Server is running: 🎉` });
});
routes.get("/get-products", get);
routes.get("/get-one-product/:id", showOne);
routes.post("/create-product", multerConfig, create);
// routes.put("/update-product/:id", update);
// routes.delete("/delete-product/:id", destroy);
routes.post("/products", multerConfig, createOneImageForProduct);

// images controller routes
routes.get("/get-product-images/:id", getImagesForOnePrpductID);
routes.get("/images", getImages);
// ProductRoutes.post('/images', multerConfig, createImages)

routes.get("/", (req: Request, res: Response) => {
  return res.status(200).json({ Mensagem: "Api funcionando!" });
});

routes.get("/get-users", UserController.GetUsers);
routes.post("/create-user", UserController.CreateUser);

export default routes;
