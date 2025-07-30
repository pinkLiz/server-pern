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

/**
 * 
 * @swagger
 * 
 * /api/products:
 *    get:
 *        summary: Obtener una lista de los productos
 *        tags:
 *          - Products
 *        description: Regresa una lista de productos
 *        responses: 
 *          200:
 *            description: Respuesta exitosa
 *            content: 
 *              application/json:
 *                schema:
 *                  type: array
 *                  items: 
 *                    $ref: '#/components/schemas/Product'
 */
router.use(methods);

router.get("/", getProducts);

router.get(
  "/:id",
  param("id").isNumeric().withMessage("El id debe ser numerico"),
  handleInputErrors,
  getProductId
);

router.post(
  "/",
  body("name").notEmpty().withMessage("El nombre es un campo requerido"),

  body("price")
    .notEmpty()
    .withMessage("El precio es un campo requerido")
    .isNumeric()
    .withMessage("El dato no es numerico")
    .toFloat()
    .custom((value) => value > 0)
    .withMessage("El precio debe ser mayor a 0"),

  handleInputErrors,
  createProduct
);

router.put(
  "/:id",
  param("id").isNumeric().withMessage("El id debe ser numerico"),

  body("name").notEmpty().withMessage("El nombre es un campo requerido"),

  body("price")
    .notEmpty()
    .withMessage("El precio es un campo requerido")
    .isNumeric()
    .withMessage("El dato no es numerico")
    .toFloat()
    .custom((value) => value > 0)
    .withMessage("El precio debe ser mayor a 0"),

  body("availibility")
    .isBoolean()
    .withMessage("La disponibilidad debe ser booleana"),

  handleInputErrors,
  updateProduct
);

router.patch(
  "/:id",
  param("id").isNumeric().withMessage("El id debe ser numerico"),

  handleInputErrors,
  updateAvailability
);

router.delete(
  "/:id",
  param("id").isNumeric().withMessage("El id debe ser numérico"),

  handleInputErrors,
  eliminar,
  deleteProduct
);

//Usuarios

router.get(
  "/user/:id",
  param("id").isNumeric().withMessage("El id debe ser numerico"),
  param("id").isInt().withMessage("El id no es valido"),
  getUserId,
  handleInputErrors
);

router.post(
  "/user",
  body("username").notEmpty().withMessage("El nombre es un campo requerido"),

  body("password")
    .notEmpty()
    .withMessage("La constraseña es un campo requerido"),
  body("email").notEmpty().isEmail().withMessage("El email no es valido"),

  handleInputErrors,
  createUser
);

router.put(
  "/user/:id",
  body("username").notEmpty().withMessage("El nombre es un campo requerido"),

  body("email").notEmpty().isEmail().withMessage("El email no es válido"),

  param("id").isNumeric().withMessage("El id debe ser numerico"),
  updateUser,
  handleInputErrors
);

router.delete(
  "/user/:id",
  param("id").isNumeric().withMessage("El id debe ser numerico"),
  param("id").isInt().withMessage("El id no es valido"),
  deleteUser,
  handleInputErrors
);

export default router;
