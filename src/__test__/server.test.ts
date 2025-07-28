import request from "supertest";
import server from "../server";
import {connectionDB} from "../server"
import db from "../config/db";
import { error, log } from "console";
jest.mock('../config/db');

describe("mi primer prueba de ts", () => {
  it("1+1 must give 2", () => {
    expect(1 + 1).toBe(2);

    expect(1 + 1).not.toBe(3);
  });
});


// describe('Get/api', ()=>{
//     it('Should send bakck a json response', async()=>{
//         const res = await request(server).get('/api/products')
//         // console.log(res);
//         expect(res.status).toBe(200)
//         expect(res.header['content-type']).toMatch(/json/)

//         //Contrarias
//         expect(res.status).not.toBe(400)
//     })

// })

describe('conect to database',()=>{
  it('should handle database conection error', async () =>{
    jest.spyOn(db,'authenticate')
    .mockRejectedValueOnce(new Error("Hubo un error al conectar"))

    //Guardamos el resultado de la consola
    const consoleSpy = jest.spyOn(console,'log')
    await connectionDB()

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Hubo un error al conectar")
    )

  })
})
