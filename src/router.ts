import { Router  } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send('Hola desde GET');
});

router.post('/', (req, res) => {
  res.send('Hola desde POST');
});

router.put('/', (req, res) => {
  res.send('Hola desde PUT');
});

router.delete('/', (req, res) => {
  res.send('Hola desde DELETE');
});


export default router;




