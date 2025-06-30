import { Router  } from 'express';
import {createProduct, getProductId, getProducts, updateProduct, deleteProduct} from './handlers/product'
import { handleInputErrors } from './middleware';
import { body } from 'express-validator';
import {post} from './middleware/post'
import {put} from './middleware/put'


const router = Router();


router.get('/',getProducts,handleInputErrors, (req, res) => {
  res.send('Hola desde GET');
});

router.get('/:id',getProductId,handleInputErrors, (req, res) => {
  res.send('Hola desde GET');
});


router.post('/',post,handleInputErrors, createProduct);

router.put('/:id',put,updateProduct, handleInputErrors, (req, res) => {
  res.send('Hola desde PUT');
});

router.delete('/:id',deleteProduct,handleInputErrors, (req, res) => {
  res.send('Hola desde DELETE');
});


export default router;




