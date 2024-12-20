import con from "./connection.js";
import Crypto from "crypto-js";

export async function inserirUsuario(pessoa) {
  let hash = Crypto.SHA256(pessoa.senha).toString();

  const comando = `
      INSERT INTO tb_login(email, senha)
      VALUES (?, ?);
  `;

  let resposta = await con.query(comando, [pessoa.email, hash]);
  let info = resposta[0];

  return info.insertId;
}

export async function verificarLogin(nutri) {
  const comando = `
    SELECT id_login, email, senha
    FROM tb_login
    WHERE email = ? AND senha = ?;
  `;
  const hash = Crypto.SHA256(nutri.senha).toString();
  console.log("Hash gerado para login:", hash);

  try {
    const [linhas] = await con.query(comando, [nutri.email, hash]);

    // Retorna o usuário ou null
    return linhas[0] || null;
  } catch (err) {
    console.error("Erro ao verificar login:", err);
    throw new Error("Erro ao processar o login.");
  }
}
