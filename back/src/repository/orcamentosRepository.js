import con from "./connection.js";

export async function criarOrcamento(
  nm_cliente,
  tipo_servico,
  dt_passada,
  valor,
  cnpj,
  razao
) {
  try {
    const comando = `insert into tb_servicos(nm_cliente, tipo_servico, dt_passada, valor, cnpj, razao)
        values (?,?,?,?,?,?)`;
    const [resultado] = await con.query(comando, [
      nm_cliente,
      tipo_servico,
      dt_passada,
      valor,
      cnpj,
      razao,
    ]);
    return resultado.insertId;
  } catch (err) {
    throw new Error("Erro ao cadastrar orçamento. Tente novamente mais tarde.");
  }
}

export async function verificarOrcamento(
  nm_cliente,
  tipo_servico,
  dt_passada,
  valor,
  cnpj,
  razao
) {
  try {
    if (
      !nm_cliente ||
      !tipo_servico ||
      !dt_passada ||
      !valor ||
      !cnpj ||
      !razao
    ) {
      return { valid: false, message: "Todos os campos são obrigatórios." };
    }

    return { valid: true };
  } catch (err) {
    return {
      valid: false,
      message: "Erro ao verificar orçamento. Tente novamente mais tarde.",
    };
  }
}

export async function mostrarOrcamentos() {
  const comando = `
    select * from tb_servicos
    `;
  const [linhas] = await con.query(comando);
  return linhas;
}

export async function excluirServico(id_servico) {
  try {
    const comando = `DELETE FROM tb_servicos WHERE id_servico = ?`;
    const [resultado] = await con.query(comando, [id_servico]);

    if (resultado.affectedRows > 0) {
      return { message: "Serviço excluído com sucesso!" };
    } else {
      return { message: "Serviço não encontrado." };
    }
  } catch (err) {
    throw new Error("Erro ao excluir serviço: " + err.message);
  }
}

export async function atualizarServico(
  id_servico,
  { nm_cliente, tipo_servico, dt_passada, valor, cnpj, razao }
) {
  try {
    const comando = `
            UPDATE tb_servicos 
            SET nm_cliente = ?, tipo_servico = ?, dt_passada = ?, valor = ?, cnpj = ?, razao = ? 
            WHERE id_servico = ?`;

    const [resultado] = await con.query(comando, [
      nm_cliente,
      tipo_servico,
      dt_passada,
      valor,
      cnpj,
      razao,
      id_servico,
    ]);

    if (resultado.affectedRows > 0) {
      return { message: "Serviço atualizado com sucesso!" };
    } else {
      return { message: "Serviço não encontrado." };
    }
  } catch (err) {
    throw new Error("Erro ao atualizar serviço: " + err.message);
  }
}
