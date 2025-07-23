import request from 'supertest';
import server from '../../server';
import db from '../../config/db';

afterAll(async () => {
  await db.close(); 
});

describe('POST /api/products', () => {
  it('Debe mostrar errores de validacion si el cuerpo esta vacio', async () => {
    const res = await request(server).post('/api/products');
    expect(res.status).toBe(400);
    expect(res.body.errors).toBeDefined();
  });

  it('Debe validar que price sea mayor a 0', async () => {
    const res = await request(server).post('/api/products').send({
      name: 'Telefono',
      price: 0,
    });
    expect(res.status).toBe(400);
  });

  it('Debe validar que price sea un numero valido', async () => {
    const res = await request(server).post('/api/products').send({
      name: 'Botella',
      price: 'texto',
    });
    expect(res.status).toBe(400);
  });

  it('Debe crear el producto si los datos son validos', async () => {
    const res = await request(server).post('/api/products').send({
      name: 'Balon',
      price: 400,
      availibility: true,
    });
    expect(res.status).toBe(201);
    expect(res.body.data).toBeDefined();
    expect(res.body.data.name).toBe('Balon');
  });

  it('No debe devolver 404 en circunstancias esperadas', async () => {
    const res = await request(server).post('/api/products').send({
      name: 'Mochila',
      price: 100,
      availibility: true,
    });
    expect(res.status).not.toBe(404);
  });
});

describe('GET /api/products', () => {
  it('Debe devolver status 200', async () => {
    const res = await request(server).get('/api/products');
    expect(res.status).toBe(200);
  });

  it('Debe devolver datos en formato JSON', async () => {
    const res = await request(server).get('/api/products');
    expect(res.header['content-type']).toMatch(/json/);
  });

  it('La respuesta debe contener una propiedad data', async () => {
    const res = await request(server).get('/api/products');
    expect(res.body.data).toBeDefined();
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('La respuesta no debe tener la propiedad errors', async () => {
    const res = await request(server).get('/api/products');
    expect(res.body.errors).toBeUndefined();
  });
});

describe('GET /api/products/:id', () => {
  it('Debe retornar 400 si el id no es valido', async () => {
    const res = await request(server).get('/api/products/hola');
    expect(res.status).toBe(400);
  });

  it('Debe retornar 404 si el producto no existe', async () => {
    const res = await request(server).get('/api/products/9999');
    expect(res.status).toBe(404);
  });

  it('Debe retornar 200 si el id es valido', async () => {
    const nuevo = await request(server).post('/api/products').send({
      name: 'Tacos de futbol',
      price: 100,
      availibility: true,
    });
    const id = nuevo.body.data.id;

    const res = await request(server).get(`/api/products/${id}`);
    expect(res.status).toBe(200);
    expect(res.body.data).toBeDefined();
    expect(res.body.data.id).toBe(id);
  });
});

describe('PUT /api/products/:id', () => {
  it('Debe validar que el id en la url sea valido', async () => {
    const res = await request(server).put('/api/products/abc').send({});
    expect(res.status).toBe(400);
  });

  it('Debe retornar 404 si el producto no existe', async () => {
    const res = await request(server).put('/api/products/9999').send({
      name: 'Camiseta Rosa',
      price: 10,
      availibility: true,
    });
    expect(res.status).toBe(404);
  });

  it('Debe validar que el precio sea mayor a 0', async () => {
    const nuevo = await request(server).post('/api/products').send({
      name: 'Funko Pop',
      price: 500,
      availibility: true,
    });

    const id = nuevo.body.data.id;

    const res = await request(server).put(`/api/products/${id}`).send({
      name: 'Funko Pop',
      price: 0,
      availibility: true,
    });

    expect(res.status).toBe(400);
  });

  it('Debe retornar 200 si el producto se actualiza correctamente', async () => {
    const nuevo = await request(server).post('/api/products').send({
      name: 'Taza',
      price: 150,
      availibility: true,
    });

    const id = nuevo.body.data.id;

    const res = await request(server).put(`/api/products/${id}`).send({
      name: 'Vaso',
      price: 200,
      availibility: false,
    });

    expect(res.status).toBe(200);
    expect(res.body.data.name).toBe('Vaso');
    expect(res.body.data.price).toBe(200); 
  });
});

describe('PATCH /api/products/:id', () => {
  it('Debe retornar 404 si el producto no existe', async () => {
    const res = await request(server).patch('/api/products/9999');
    expect(res.status).toBe(404);
  });

  it('Debe retornar 200 si se cambia correctamente la disponibilidad', async () => {
    const nuevo = await request(server).post('/api/products').send({
      name: 'Gorra',
      price: 300,
      availibility: true,
    });

    const id = nuevo.body.data.id;

    const res = await request(server).patch(`/api/products/${id}`);
    expect(res.status).toBe(200);
    expect(res.body.data.availibility).toBe(false);
  });

  it('Debe alternar availability correctamente true -> false -> true', async () => {
    const nuevo = await request(server).post('/api/products').send({
      name: 'Zapatos',
      price: 500,
      availibility: true,
    });

    const id = nuevo.body.data.id;

    const res1 = await request(server).patch(`/api/products/${id}`);
    const res2 = await request(server).patch(`/api/products/${id}`);

    expect(res1.body.data.availibility).toBe(false);
    expect(res2.body.data.availibility).toBe(true);
  });
});

describe('DELETE /api/products/:id', () => {
  it('Debe retornar 400 si el id no es valido', async () => {
    const res = await request(server).delete('/api/products/abc');
    expect(res.status).toBe(400);
  });

  it('Debe retornar 404 si el producto no existe', async () => {
    const res = await request(server).delete('/api/products/999999');
    expect(res.status).toBe(404);
  });

  it('Debe eliminar correctamente el producto', async () => {
    const nuevo = await request(server).post('/api/products').send({
      name: 'Papel',
      price: 50,
      availibility: true,
    });

    const id = nuevo.body.data.id;

    const res = await request(server).delete(`/api/products/${id}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBeDefined();
  });
});
