import { PrismaClient } from "../generated/prisma/client";
import { Request, Response } from "express";
import { convertBufferToString, uploader } from "../config/uploader";
import { v2 } from "cloudinary";

const db = new PrismaClient();

export function getImages(_req: Request, res: Response) {
  db.images
    .findMany()
    .then((products) => res.status(201).json({ products }))
    .catch((error) => res.status(400).json({ error }));
}

export async function createImages(req: Request, res: Response) {
  try {
    v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    if (req.files === undefined)
      return res
        .status(400)
        .json({ error: "Error converting buffer to string" });

    const products = [];
    for (const file of req.files as unknown as any[]) {
      const bufferToString = convertBufferToString(file);
      const { secure_url, buffr } = await uploader.upload(bufferToString || "");
      console.log(req.files);
      const product = await db.images.create({
        data: {
          idProduto: req.body.product,
          images: secure_url,
        },
      });
      products.push(product);
    }

    return res.json(products);
  } catch (error) {
    return res.status(400).json({ error });
  }
}

export async function getImagesForOnePrpductID(req: Request, res: Response) {
  try {
    const data = await db.images.findMany({
      where: { idProduto: req.params.id } as any,
      select: {
        images: true,

        idProduto: true,
      },
    });

    return res.status(201).json({ data });
  } catch (error) {
    return res.status(201).json({ error });
  }
}
