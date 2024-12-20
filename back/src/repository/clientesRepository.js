import con from "./connection.js";

export async function cadastroDeCliente(nm_cliente, cnpj, razao) {
  try {
    const comando = `
        INSERT INTO tb_clientes (nm_cliente, cnpj, razao)
      VALUES (?, ?, ?)
        `;

    const [result] = await con.query(comando, [nm_cliente, cnpj, razao]);
    console.log("Consulta cadastrada com sucesso! ID:", result.insertId);
    return result.insertId;
  } catch (err) {
    throw new Error("Erro ao cadastrar clente. Tente novamente mais tarde. 2");
  }
}

export async function verifcarCadastroCliente(nm_cliente, cnpj, razao) {
  try {
    if (!nm_cliente || !cnpj || !razao) {
      return { valid: false, message: "Todos os campos são obrigatórios." };
    }

    const comando = `
        SELECT COUNT(*) as count FROM tb_clientes WHERE nm_cliente = ? AND cnpj = ? AND razao = ?
        `;
    const [linhas] = await con.query(comando, [nm_cliente, cnpj, razao]);

    if (linhas[0].count > 0) {
      return {
        valid: false,
        message: "Esse cliente já existe.",
      };
    }
    return { valid: true };
  } catch (err) {
    return {
      valid: false,
      message:
        "Erro ao verificar Clinte. Tente novamente mais tarde. verificar",
    };
  }
}

export async function verificarCnpj(cnpj) {
  try {
    const comando = `
        SELECT COUNT(*) as count 
        FROM tb_clientes 
        WHERE cnpj = ?
        `;
    const [result] = await con.query(comando, [cnpj]);

    return result[0].count > 0;
  } catch (err) {
    throw new Error("Erro ao verificar CNPJ.");
  }
}
export async function listarClientes() {
  const comando = `
    select * from tb_clientes;
    `;

  const [linhas] = await con.query(comando);
  return linhas;
}

export async function excluirCliente(id_cliente) {
  try {
    const comando = `delete from tb_clientes where id_cliente = ?`;
    const [resultado] = await con.query(comando, [id_cliente]);

    if (resultado.affectedRows > 0) {
      return { message: "cliente excluido com sucesso!" };
    } else {
      return { message: "cliente nn encontrado" };
    }
  } catch (err) {
    throw new Error("Erro ao excluir cliente: " + err.message);
  }
}

export async function atualizarCliente(
  id_cliente,
  { nm_cliente, cnpj, razao }
) {
  try {
    const comando = `update tb_clientes set nm_cliente = ?, cnpj = ?, razao = ?
        where id_cliente = ?`;

    const [resultado] = await con.query(comando, [
      id_cliente,
      nm_cliente,
      cnpj,
      razao,
    ]);

    if (resultado.affectedRows > 0) {
      return { message: "cliente atualizado com sucesso!" };
    } else {
      return { message: "cliente não encontrado" };
    }
  } catch (err) {
    throw new Error("erro ao atualizar cliente: " + err.message);
  }
}
