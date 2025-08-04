import { Request, Response } from "express";
import colors from "colors";


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
    console.log(colors.white.bgRed.bold("Hubo un error al crear el usuario"));
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

    return res.status(200).json({ data: users });
  } catch (error) {
    console.log(colors.white.bgRed.bold("Hubo un error al obtener la lista de usuarios"));
    return res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

export const getUserId = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    res.json({ data: user });
  } catch (error) {
    console.log(colors.white.bgRed.bold("Hubo un error al obtener el usuario de acuerdo a su id"));
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    if ("id" in req.body || "password" in req.body) {
      return res.status(400).json({
        error: "No puedes modificar los campos de id o password"
      });
    }

    const { id } = req.params;
    const { username, email, role, isActive } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    await user.update({ username, email, role, isActive });
    return res.json({ data: user });

  } catch (error) {
    console.log(colors.white.bgRed.bold("Hubo un error al actualizar el usuario de acuerdo a su id"));
    return res.status(500).json({ error: "Error interno del servidor" });
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
    console.log(colors.white.bgRed.bold("Hubo un error al eliminar el usuario de acuerdo a su id"));
  }
};