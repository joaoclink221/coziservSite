import * as db from "../repository/loginRepository.js";
import { gerarToken } from "../utils/jwt.js";
import { Router } from "express";

const endpoints = Router();

endpoints.post('/usuario/', async (req, resp) => {
  try {
      let pessoa = req.body;

      let id = await db.inserirUsuario(pessoa);

      resp.send({
          novoId: id
      });
  } catch (err) {
      resp.status(400).send({
          erro: err.message
      });
  }
});

endpoints.post("/login/", async (req, resp) => {
  try {
    let { email, senha } = req.body;

    console.log("Dados recebidos para login:", { email, senha });

    let usuario = await db.verificarLogin({ email, senha });

    if (!usuario) {
        resp.status(401).send({ erro: "Usuário ou senha incorreto(s)" });
    } else {
        let token = gerarToken({ id: usuario.id_login, email: usuario.email });
        resp.send({
            usuario: { id: usuario.id_login, email: usuario.email },
            token
        });
    }
  } catch (err) {
    console.error("Erro ao fazer login:", err.message);
    resp.status(400).send({
        erro: err.message
    });
  }
});

export default endpoints;
