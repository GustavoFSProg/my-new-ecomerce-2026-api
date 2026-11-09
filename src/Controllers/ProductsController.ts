import { PrismaClient } from "../generated/prisma/client";
import { Request, Response } from "express";
import { convertBufferToString, uploader } from "../config/uploader";
import { v2 } from "cloudinary";

const db = new PrismaClient();

export async function get(_req: Request, res: Response) {
  try {
    const data = await db.products.findMany();

    return res.status(200).json(data);
  } catch (error) {
    return res.status(200).json({ error });
  }
}

export async function getProductsImages(_req: Request, res: Response) {
  try {
    const data = await db.images.findFirst({
      where: { idProduto: _req.params.id } as any,
    });

    return res.status(200).json(data);
  } catch (error) {
    return res.status(200).json({ error });
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

export async function showOne(req: Request, res: Response) {
  try {
    const produto = await db.products.findFirst({
      where: { id: req.params.id } as any,
    });

    // const ProdutoID = req.params.id;

    if (!produto) {
      return res.status(404).json({ error: "Product not found" });
    }

    console.log(produto);

    const imagens = await db.images.findMany({
      where: { idProduto: produto.id } as any,
    });

    console.log(imagens);

    return res.status(200).json({ produto, imagens });
  } catch (error) {
    return res.status(200).json({ error });
  }
}

export async function createOneImageForProduct(req: Request, res: Response) {
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
      const product = await db.products.create({
        data: {
          name: "nome",
          price: Number(req.body.price),
          image: secure_url,
        },
      });

      products.push(product);
    }
    return res.json({ msg: "Sucesso!" });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

export async function create(req: Request, res: Response) {
  try {
    v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const product = await db.products.create({
      data: {
        name: req.body.name,
        price: Number(req.body.price),
        description: req.body.description,
        image:
          "https://res.cloudinary.com/my-owne/image/upload/v1702736622/udqvrd9dwrzt88too60y.jpg",
      },
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

      const figures = await db.images.create({
        data: {
          idProduto: product.id,
          images: secure_url,
        },
      });
      products.push(figures);
    }

    res.json({ msg: "Sucesso!", product });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

// export function update(req: Request, res: Response) {
//   const data = {
//     where: { id: req.params.id },
//     data: { name: req.body.name, price: Number(req.body.price) },
//   };
//   db.products
//     .update(data)
//     .then(() =>
//       res.status(201).json({ message: "Produto atualizado com sucesso!" }),
//     )
//     .catch((error: any) => res.status(400).json({ error }));
// }

// export function destroy(req: Request, res: Response) {
//   db.products
//     .delete({ where: { id: req.params.id } })
//     .then(() => res.status(201).json({ msg: "Produto removido com sucesso!" }))
//     .catch((error: any) => res.status(400).json({ error }));
// }
