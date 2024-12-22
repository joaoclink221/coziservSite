import * as db from "../repository/orcamentosRepository.js";
import { Router } from "express";
import { autenticar } from "../utils/jwt.js";  
const endpoint = Router();

endpoint.post("/CadastroOrcamento/",autenticar, async (req, resp) => {
  try {
    const { nm_cliente, tipo_servico, dt_passada, valor, cnpj, razao } = req.body;

    const verificarOrcamento = await db.verificarOrcamento(
      nm_cliente,
      tipo_servico,
      dt_passada,
      valor,
      cnpj,
      razao
    );

    if (!verificarOrcamento.valid) {
      return resp.status(400).send({
        message: verificarOrcamento.message,
      });
    }

    const orcamentoId = await db.criarOrcamento(
      nm_cliente, tipo_servico, dt_passada, valor, cnpj, razao
    );

    return resp.status(201).send({
      message: "Cadastro bem sucedido",
      orcamentoId: orcamentoId,
    });
  } catch (err) {
    console.error(err); 
    resp.status(500).send({
      erro: `Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde. ${err.message}`,
    });
  }
});

endpoint.get("/orcamento/", async(req, resp) =>{
    try {
        const orcamento = await db.mostrarOrcamentos()
        if(orcamento.length === 0 ){
            return resp.status(404).send({
                message: "Nenhum cliente encontrado",
              });
        }
        return resp.status(200).send(orcamento);
    } catch (err) {
        console.error("Erro ao listar Clientes:", err);
    resp.status(500).send({
      erro: `Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde. ${err.message}`,

    });
    }
})

endpoint.delete("/excluirServico/:id/", autenticar, async (req, resp) => {
    try {
      const { id } = req.params; 
      const resultado = await db.excluirServico(id); 
      return resp.status(200).send({ message: resultado.message }); 
    } catch (err) {
      return resp.status(500).send({
        erro: `Erro ao excluir serviço: ${err.message}`, 
      });
    }
  });
  
  endpoint.put("/atualizarServico/:id/", autenticar, async (req, resp) => {
    try {
      const { id } = req.params; 
      const { nm_cliente, tipo_servico, dt_passada, valor, cnpj, razao } = req.body; 
  
      const resultado = await db.atualizarServico(id, {
        nm_cliente,
        tipo_servico,
        dt_passada,
        valor,
        cnpj,
        razao,
      });
  
      return resp.status(200).send({ message: resultado.message });
    } catch (err) {
      return resp.status(500).send({
        erro: `Erro ao atualizar serviço: ${err.message}`,
      });
    }
  });
  

export default endpoint
