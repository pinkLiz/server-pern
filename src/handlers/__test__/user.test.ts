import request from "supertest";
import server from "../../server";
import db from "../../config/db";
import User from "../../models/User.mo";

import {
  createUser,
  getUsers,
  getUserId,
  updateUser,
  deleteUser,
} from "../user";

afterAll(async () => {
  await db.close();
});

describe("POST /api/user", () => {
  it("Debe validar campos obligatorios", async () => {
    const res = await request(server).post("/api/user");
    expect(res.status).toBe(400);
    expect(res.body.errors).toBeDefined();
  });

  it("Debe rechazar un email inválido", async () => {
    const res = await request(server).post("/api/user").send({
      username: "Liz",
      email: "email falso",
      password: "123456",
      role: "user",
    });
    expect(res.status).toBe(400);
  });

  it("Debe crear un usuario si los datos son válidos", async () => {
    const res = await request(server).post("/api/user").send({
      username: "Liz",
      email: "liz@gmail.com",
      password: "123456",
      role: "user",
    });
    expect(res.status).toBe(200);
    expect(res.body.data).toBeDefined();
    expect(res.body.data.username).toBe("Liz");
  }, 10000);

  it("Debe rechazar si el email o username ya existen", async () => {
    await request(server).post("/api/user").send({
      username: "Liz",
      email: "liz@gmail.com",
      password: "123456",
      role: "user",
    });

    const res = await request(server).post("/api/user").send({
      username: "Liz",
      email: "liz@gmail.com",
      password: "123456",
      role: "user",
    });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe(
      "El email o username, ya se encuentran registrados"
    );
  });
});

describe("GET /api/user", () => {
  it("Debe retornar la lista de usuarios", async () => {
    await request(server).post("/api/user").send({
      username: "Lucia",
      email: "lucia@gmail.com",
      password: "123456",
      role: "user",
    });

    const res = await request(server).get("/api/user");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it("Debe retornar solo usuarios con rol 'user'", async () => {
    await request(server).post("/api/user").send({
      username: "Saul",
      email: "saul@gmail.com",
      password: "123456789",
      role: "admin",
    });

    const res = await request(server).get("/api/user?role=user");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.every((user: any) => user.role === "user")).toBe(true);
  });
});

describe("GET /api/user/:id", () => {
  it("Debe retornar 404 si el usuario no existe", async () => {
    const res = await request(server).get("/api/user/9999");
    expect(res.status).toBe(404);
  });

  it("Debe retornar 200 si el usuario existe", async () => {
    const nuevo = await request(server).post("/api/user").send({
      username: "Daniel",
      email: "daniel@gmail.com",
      password: "123456",
      role: "admin",
    });

    const id = nuevo.body.data.id;
    const res = await request(server).get(`/api/user/${id}`);
    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe(id);
  });
});

describe("PUT /api/user/:id", () => {
  it("Debe retornar 404 si el usuario no existe", async () => {
    const res = await request(server).put("/api/user/9999").send({
      username: "Fernando",
      email: "fer@gmail.com",
      role: "admin",
    });
    expect(res.status).toBe(404);
  });

  it("Debe actualizar correctamente el usuario", async () => {
    const nuevo = await request(server).post("/api/user").send({
      username: "Lizbeth",
      email: "lizbeth@gmail.com",
      password: "123456789",
      role: "user",
    });

    const id = nuevo.body.data.id;

    const res = await request(server).put(`/api/user/${id}`).send({
      username: "Lizbeth",
      email: "lizbet@gmail.com",
      role: "admin",
      isActive: true,
    });

    expect(res.status).toBe(200);
    expect(res.body.data.username).toBe("Lizbeth");
  });

  it("Debe rechazar si se intenta modificar id o password", async () => {
    const nuevo = await request(server).post("/api/user").send({
      username: "Mario",
      email: "mario@gmail.com",
      password: "abcdef",
      role: "user",
    });

    const id = nuevo.body.data.id;

    const res = await request(server).put(`/api/user/${id}`).send({
      id: 12345,
      password: "123456",
      username: "mario",
      email: "m12345@gmail.com",
    });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe(
      "No puedes modificar los campos de id o password"
    );
  });
});

describe("DELETE /api/user/:id", () => {
  it("Debe retornar 404 si el usuario no existe", async () => {
    const res = await request(server).delete("/api/user/99999");
    expect(res.status).toBe(404);
  });

  it("Debe desactivar correctamente el usuario", async () => {
    const nuevo = await request(server).post("/api/user").send({
      username: "Diego",
      email: "diego@gmail.com",
      password: "123456",
      role: "user",
    });

    const id = nuevo.body.data.id;

    const res = await request(server).delete(`/api/user/${id}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Usuario eliminado");
  });
});

describe("Error the users", () => {
  it("Should error create product", async () => {
    jest
      .spyOn(User, "create")
      .mockRejectedValueOnce(new Error("Hubo un error al crear el usuario"));
    const consoleSpy = jest.spyOn(console, "log");

    const req = { body: {} } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
    await createUser(req, res);

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Hubo un error al crear el usuario")
    );
  });

  it("Error get users", async () => {
    jest
      .spyOn(User, "findAll")
      .mockRejectedValueOnce(
        new Error("Hubo un error al obtener la lista de usuarios")
      );
    const consoleSpy = jest.spyOn(console, "log");

    const req = { query: {} } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    await getUsers(req, res);

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Hubo un error al obtener la lista de usuarios")
    );
  });

  it("Error get users by id", async () => {
    jest
      .spyOn(User, "findByPk")
      .mockRejectedValueOnce(
        new Error("Hubo un error al obtener el usuario de acuerdo a su id")
      );
    const consoleSpy = jest.spyOn(console, "log");

    const req = { params: { id: 1 } } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
    await getUserId(req, res);

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        "Hubo un error al obtener el usuario de acuerdo a su id"
      )
    );
  });

  it("Error update user by id", async () => {
    jest
      .spyOn(User, "findByPk")
      .mockRejectedValueOnce(
        new Error("Hubo un error al actualizar el usuario de acuerdo a su id")
      );
    const consoleSpy = jest.spyOn(console, "log");

    const req = { params: { id: 1 }, body: {} } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await updateUser(req, res);
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        "Hubo un error al actualizar el usuario de acuerdo a su id"
      )
    );
  });

  it("Error delete user by id", async () => {
    jest
      .spyOn(User, "findByPk")
      .mockRejectedValueOnce(
        new Error("Hubo un error al eliminar el usuario de acuerdo a su id")
      );
    const consoleSpy = jest.spyOn(console, "log");

    const req = { params: { id: 1 } } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await deleteUser(req, res);
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        "Hubo un error al eliminar el usuario de acuerdo a su id"
      )
    );
  });
});
