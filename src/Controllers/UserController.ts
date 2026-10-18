import express, { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma/client";
import md5 from "md5";

const prismaDB = new PrismaClient();

async function CreateUser(req: Request, res: Response) {
  try {
    const user = await prismaDB.users.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: String(
          md5(
            req.body.password,
            process.env.SECRET as string & { asBytes: true },
          ),
        ),
      },
    });
    return res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: error });
  }
}

async function GetUsers(req: Request, res: Response) {
  try {
    const data = await prismaDB.users.findMany();

    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({ Mensagem: "Error!", error });
  }
}

export default { CreateUser, GetUsers };
