import { Router  } from 'express';
import {createProduct, getProductId, getProducts, updateProduct, deleteProduct, updateAvailability} from './handlers/product'
import { handleInputErrors } from './middleware';
import { body, param } from 'express-validator';
import {post} from './middleware/post'
import {put} from './middleware/put'
import {eliminar} from './middleware/delete'


const router = Router();


router.get('/',getProducts,handleInputErrors, (req, res) => {
  res.send('Hola desde GET');
});

router.get('/:id',
  param("id")
    .isNumeric()
    .withMessage("El id debe ser numerico"),
  param("id")
    .isInt()
    .withMessage("El id no es valido")
  ,getProductId,handleInputErrors);


router.post('/',
  body("name")
    .notEmpty()
    .withMessage("El nombre es un campo requerido"),

  body("price")
    .notEmpty()
    .withMessage("El precio es un campo requerido")
    .isNumeric()
    .withMessage("El dato no es numérico")
    .custom((value) => value > 0)
    .withMessage("El precio debe ser mayor a 0")
  
    ,handleInputErrors, createProduct);

router.put('/:id',
  body("name")
    .notEmpty()
    .withMessage("El nombre es un campo requerido"),

  body("price")
    .notEmpty()
    .withMessage("El precio es un campo requerido")
    .isNumeric()
    .withMessage("El dato no es numérico")
    .custom((value) => value > 0)
    .withMessage("El precio debe ser mayor a 0"),

  param("id")
    .isNumeric()
    .withMessage("El id debe ser numerico")
  ,updateProduct, handleInputErrors);


router.patch('/:id',
  param("id")
    .isNumeric()
    .withMessage("El id debe ser numerico")
  ,updateAvailability, handleInputErrors);

router.delete('/:id',eliminar,deleteProduct,handleInputErrors, (req, res) => {
  res.send('Hola desde DELETE');
});


export default router;




