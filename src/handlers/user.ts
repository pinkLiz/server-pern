import { Request, Response } from "express";

import User from "../models/User.mo";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password, role } = req.body;


    const validarEmail = await User.findOne({ where: { email } });
    const validarUsername = await User.findOne({ where: { username } });

    if (validarEmail || validarUsername) {
      return res.status(400).json({
        error: "El email o username, ya se encuentran registrados",
      });
    }

    const user = await User.create({ username, email, password, role });
    res.json({ data: user });
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const { role } = req.query;

    const where: any = {};

    if (role) {
      where.role = role;
    }

    const users = await User.findAll({
      where,
      order: [["id", "ASC"]],
    });
    res.json({ data: users });
  } catch (error) {
    console.log(error);
  }
};

export const getUserId = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    res.json({ data: user });
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { username, email, role, isActive } = req.body;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    if ("id" in req.body || "password" in req.body) {
      return res
        .status(400)
        .json({ error: "No puedes modificar los campos de id o password" });
    }

    await user.update({ username, email, role, isActive });
    res.json({ data: user });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    user.isActive = false;
    await user.save();

    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    console.log(error);
  }
};