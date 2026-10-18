import { Router, Request, Response } from "express";
// import UserController from "./Controllers/UserController";

// import {
//   showOne,
//   get,
//   create,
//   destroy,
//   update,
//   createOneImageForProduct,
// } from "../controllers/productsController";
import { multerConfig } from "../src/config/uploader_old";
import UserController from "./Controllers/UserController";
// import {
//   createImages,
//   getImages,
//   getImagesForOnePrpductID,
// } from "../controllers/imagesController";

export const ProductRoutes = Router();

// ProductRoutes.get("/", (req: Request, res: Response) => {
//   return res.status(200).json({ msg: `⚡ Server is running: 🎉` });
// });
// ProductRoutes.get("/products", get);
// ProductRoutes.get("/get-one-product/:id", showOne);
// ProductRoutes.post("/products", multerConfig, create);
// ProductRoutes.put("/product/:id", update);
// ProductRoutes.delete("/product/:id", destroy);
// // ProductRoutes.post('/products', multerConfig, createOneImageForProduct)

// ProductRoutes.get("/images", getImages);
// ProductRoutes.get("/images/:id", getImagesForOnePrpductID);
// ProductRoutes.post('/images', multerConfig, createImages)

const routes = Router();

routes.get("/", (req: Request, res: Response) => {
  return res.status(200).json({ Mensagem: "Api funcionando!" });
});

routes.get("/get-users", UserController.GetUsers);
routes.post("/create-user", UserController.CreateUser);

export default routes;
