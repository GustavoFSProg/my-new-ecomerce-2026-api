import { Request, Response, Router } from 'express'
import { showOne,  get, create, destroy, update, createOneImageForProduct } from '../controllers/productsController'
import { multerConfig } from '../config/uploader_old'
import { createImages, getImages, getImagesForOnePrpductID } from '../controllers/imagesController'

export const ProductRoutes = Router()

ProductRoutes.get('/', (req: Request, res: Response) => {
  return res.status(200).json({msg: `⚡ Server is running: 🎉`})

})
ProductRoutes.get('/products', get)
ProductRoutes.get('/get-one-product/:id', showOne)
ProductRoutes.post('/products', multerConfig, create)
ProductRoutes.put('/product/:id', update)
ProductRoutes.delete('/product/:id', destroy)
// ProductRoutes.post('/products', multerConfig, createOneImageForProduct)


ProductRoutes.get('/images', getImages)
ProductRoutes.get('/images/:id', getImagesForOnePrpductID)
// ProductRoutes.post('/images', multerConfig, createImages)

