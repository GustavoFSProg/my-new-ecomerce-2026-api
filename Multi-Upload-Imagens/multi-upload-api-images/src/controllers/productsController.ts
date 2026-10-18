import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { convertBufferToString, uploader } from '../config/uploader_old'
import { v2 } from 'cloudinary'

const db = new PrismaClient()

export function get(_req: Request, res: Response) {
  db.products
    .findMany()
    .then((products) => res.status(201).json({ products }))
    .catch((error) => res.status(400).json({ error }))
}

export async function showOne(req: Request, res: Response) {
  try {
    const produtos = await db.products.findFirst({
      where: { id: req.params.id },
      select: {
        name: true,
        id: true,
      },
    })

    return res.status(200).json(produtos)
  } catch (error) {
    return res.status(200).json({ error })
  }
}

export async function createOneImageForProduct(req: Request, res: Response) {
  try {
    v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    })

    if (req.files === undefined) return res.status(400).json({ error: 'Error converting buffer to string' })

    const products = []
    for (const file of req.files as unknown as any[]) {
      const bufferToString = convertBufferToString(file)
      const { secure_url, buffr } = await uploader.upload(bufferToString || '')
      console.log(req.files)
      const product = await db.products.create({
        data: {
          name: 'nome',
          price: Number(req.body.price),
          image: secure_url,
        },
      })

      products.push(product)
    }
    return res.json({ msg: 'Sucesso!' })
  } catch (error) {
    return res.status(400).json({ error })
  }
}

export async function create(req: Request, res: Response) {
  try {
    v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    })

    const product = await db.products.create({
      data: {
        name: req.body.name,
        price: Number(req.body.price),
        description: req.body.description,
        // image: 'https://res.cloudinary.com/my-owne/image/upload/v1702736622/udqvrd9dwrzt88too60y.jpg',
        image: 'https://res.cloudinary.com/my-owne/image/upload/v1702736622/udqvrd9dwrzt88too60y.jpg',
      },
    })

    if (req.files === undefined) return res.status(400).json({ error: 'Error converting buffer to string' })

    const products = []

    for (const file of req.files as unknown as any[]) {
      const bufferToString = convertBufferToString(file)
      const { secure_url, buffr } = await uploader.upload(bufferToString || '')
      console.log(req.files)

      const figures = await db.images.create({
        data: {
          idProduto: product.id,
          images: secure_url,
        },
      })
      products.push(figures)
    }

    res.json({ msg: 'Sucesso!', product })
  } catch (error) {
    return res.status(400).json({ error })
  }
}

export function update(req: Request, res: Response) {
  const data = { where: { id: req.params.id }, data: { name: req.body.name, price: Number(req.body.price) } }
  db.products
    .update(data)
    .then(() => res.status(201).json({ message: 'Produto atualizado com sucesso!' }))
    .catch((error) => res.status(400).json({ error }))
}

export function destroy(req: Request, res: Response) {
  db.products
    .delete({ where: { id: req.params.id } })
    .then(() => res.status(201).json({ msg: 'Produto removido com sucesso!' }))
    .catch((error) => res.status(400).json({ error }))
}
