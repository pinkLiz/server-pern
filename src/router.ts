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
 * /api/products:
 *      get:
 *          summary: Obtener una lista de los productos
 *          tags:
 *              - Products
 *          description: Regresa una lista de productos
 *          responses: 
 *              200:
 *                  description: Respuesta exitosa
 *                  content: 
 *                      aplication/json:
 *                          schema: 
 *                              type: array
 *                              items:
 *                                  $ref: "#/components/schemas/Product"
 * 
 */

/**
 * @swagger
 * /api/products/{id}:
 *      get:
 *          summary: Obtiene un producto por ID.
 *          tags:
 *              - Products
 *          description: Regresa un producto
 *          
 *          parameters: 
 *              - in: path
 *                name: id
 *                description: El ID del producto a consultar
 *                required: true
 *                schema:
 *                  type: integer
 *          responses: 
 *              200:
 *                  description: Respuesta exitosa
 *                  content: 
 *                      aplication/json:
 *                          schema: 
 *                              type: array
 *                              items:
 *                                  $ref: "#/components/schemas/Product"
 *              404:
 *                  description: No encontrado
 *              400:
 *                  description: Solicitud erronea
 *                  
 * 
 */


/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: Crea un nuevo producto
 *      tags:
 *          - Products
 *      description: Retornar un nuevo registro en la base de datos
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties: 
 *                name: 
 *                  type: string
 *                  example: "Monitor curvo 48 pulgadas"
 * 
 *                price:
 *                  type: number
 *                  example: 1599
 *      responses: 
 *          201:
 *             description: Respuesta exitosa.
 *             content: 
 *                  application/json:
 *                    schema:
 *                      $ref: '#/components/schemas/Product'
 *          404:
 *              description: No encontrado
 *                      
 * 
*/

/**
* @swagger
* /api/products/{id}:
*      put:
*          summary: Actualizar un producto completamente
*          tags:
*              - Products
*          description: Actualiza la información de un producto por su ID
*          parameters:
 *              - in: path
 *                name: id
 *                description: El ID del producto que se desea actualizar
 *                required: true
 *                schema:
 *                    type: integer
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Juego de uno"
 *                              price:
 *                                  type: number
 *                                  example: 60
 *          responses:
 *              200:
 *                  description: Producto actualizado
 *              400:
 *                  description: Datos invalidos
 *              404:
 *                  description: Producto no encontrado
*/

/**
 * @swagger
 * /api/user:
 *      get:
 *          summary: Obtener una lista de los usuarios
 *          tags:
 *              - Users
 *          description: Regresa una lista de usuarios
 *          responses: 
 *              200:
 *                  description: Respuesta exitosa
 *                  content: 
 *                      aplication/json:
 *                          schema: 
 *                              type: array
 *                              items:
 *                                  $ref: "#/components/schemas/User"
 * 
 */

/**
 * @swagger
 * /api/user/{id}:
 *      get:
 *          summary: Obtiene un usuario por ID.
 *          tags:
 *              - Users
 *          description: Regresa un usuario
 *          
 *          parameters: 
 *              - in: path
 *                name: id
 *                description: El ID del usuario a consultar
 *                required: true
 *                schema:
 *                  type: integer
 *          responses: 
 *              200:
 *                  description: Respuesta exitosa
 *                  content: 
 *                      aplication/json:
 *                          schema: 
 *                              type: array
 *                              items:
 *                                  $ref: "#/components/schemas/User"
 *              404:
 *                  description: No encontrado
 *              400:
 *                  description: Solicitud erronea
 *                  
 * 
 */


/**
 * @swagger
 * /api/user:
 *  post:
 *      summary: Crea un nuevo producto
 *      tags:
 *          - Users
 *      description: Retornar un nuevo registro en la base de datos
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties: 
 *                username: 
 *                  type: string
 *                  example: "Lizbeth"
 * 
 *                email:
 *                  type: string
 *                  example: "lizbeth@gmail.com"
 * 
 *                password:
 *                  type: string
 *                  example: "liz12345"
 *                 
 *                rol:
 *                  type: enum
 *                  example: "admin"
 * 
 *                isActive:
 *                  type: boolean
 *                  example: true  
 *      responses: 
 *          201:
 *             description: Respuesta exitosa.
 *             content: 
 *                  application/json:
 *                    schema:
 *                      $ref: '#/components/schemas/User'
 *          404:
 *              description: No encontrado
 *                      
 * 
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
