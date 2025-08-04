import { Router } from "express";
import {
  createProduct,
  getProductId,
  getProducts,
  updateProduct,
  deleteProduct,
  updateAvailability,
} from "./handlers/product";

import {
  createUser,
  getUsers,
  getUserId,
  updateUser,
  deleteUser,
} from "./handlers/user";

import { handleInputErrors } from "./middleware";
import { body, param } from "express-validator";
import { methods } from "./middleware/methods";
import { eliminar } from "./middleware/delete";

const router = Router();
/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The Product ID
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: The Product name
 *                      example: Monitor Curvo de 49 Pulgadas
 *                  price:
 *                      type: number
 *                      description: The Product price
 *                      example: 300
 *                  availability:
 *                      type: boolean
 *                      description: The Product availability
 *                      example: true
 */

/**
 * @swagger
 * components:
 *      schemas:
 *          Users:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The User ID
 *                      example: 1
 *                  username:
 *                      type: string
 *                      description: The name of user
 *                      example: Lizbeth
 *                  email:
 *                      type: string
 *                      description: the email of user
 *                      example: lizbeth@gmail.com
 *                  password:
 *                      type: enum
 *                      description: user o admin
 *                      example: user
 *                  isActive:
 *                      type: boolean
 *                      description: The user could be active 
 *                      example: true
 */

router.use(methods);

//Productos
router.get("/products", getProducts);

router.get(
  "/products/:id",
  param("id").isNumeric().withMessage("El id debe ser numerico"),
  handleInputErrors,
  getProductId
);

router.post(
  "/products",
  body("name").notEmpty().withMessage("El nombre es requerido"),
  body("price")
    .notEmpty().withMessage("El precio es requerido")
    .isNumeric().withMessage("Debe ser numérico")
    .toFloat()
    .custom((value) => value > 0).withMessage("Debe ser mayor a 0"),
  handleInputErrors,
  createProduct
);

router.put(
  "/products/:id",
  param("id").isNumeric().withMessage("El id debe ser numerico"),
  body("name").notEmpty().withMessage("El nombre es requerido"),
  body("price")
    .notEmpty().withMessage("El precio es requerido")
    .isNumeric().withMessage("Debe ser numérico")
    .toFloat()
    .custom((value) => value > 0).withMessage("Debe ser mayor a 0"),
  body("availibility").isBoolean().withMessage("Debe ser booleano"),
  handleInputErrors,
  updateProduct
);

router.patch(
  "/products/:id",
  param("id").isNumeric().withMessage("El id debe ser numerico"),
  handleInputErrors,
  updateAvailability
);

router.delete(
  "/products/:id",
  param("id").isNumeric().withMessage("El id debe ser numerico"),
  handleInputErrors,
  eliminar,
  deleteProduct
);

//Usuarios
router.get("/user", getUsers);

router.get(
  "/user/:id",
  param("id").isInt().withMessage("El id debe ser numerico"),
  handleInputErrors,
  getUserId
);

router.post(
  "/user",
  body("username").notEmpty().withMessage("El nombre es requerido"),
  body("password").notEmpty().withMessage("La contraseña es requerida"),
  body("email").isEmail().withMessage("El email no es válido"),
  handleInputErrors,
  createUser
);

router.put(
  "/user/:id",
  param("id").isInt().withMessage("El id debe ser numerico"),
  body("username").notEmpty().withMessage("El nombre es requerido"),
  body("email").isEmail().withMessage("El email no es válido"),
  handleInputErrors,
  updateUser
);

router.delete(
  "/user/:id",
  param("id").isInt().withMessage("El id debe ser numerico"),
  handleInputErrors,
  deleteUser
);

export default router;
