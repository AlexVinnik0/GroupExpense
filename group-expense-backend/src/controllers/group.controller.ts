import { Request, Response } from "express";
import prisma from "../prisma/client";

export const createGroup = async (req: Request, res: Response) => {
  const { name, createdBy } = req.body;

  if (!name || !createdBy) {
    return res.status(400).json({ error: "name and createdBy are required" });
  }

  try {
    const newGroup = await prisma.group.create({
      data: {
        name,
        createdBy,
      },
    });
    res.status(201).json(newGroup);
  } catch (err) {
    console.error("Failed to create group:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
