import * as db from "../repository/clientesRepository.js"
import { Router } from "express";
import { autenticar } from "../utils/jwt.js";
const endpoint = Router();

endpoint.post("/CadastroCliente/", autenticar, async (req, resp) => {
    try {
        const { nm_cliente, cnpj, razao } = req.body;

        
        const cnpjExiste = await db.verificarCnpj(cnpj);
        if (cnpjExiste) {
            return resp.status(400).send({
                message: "CNPJ já cadastrado.",
            });
        }

        
        const clienteId = await cadastroDeCliente(nm_cliente, cnpj, razao);
        return resp.status(201).send({
            message: "Cadastro bem sucedido",
            id_cliente: clienteId,
        });
    } catch (err) {
        resp.status(500).send({
            erro: `Erro ao processar a solicitação: ${err.message}`,
        });
    }
});


endpoint.get("/clientes/", async(req, resp) =>{
   try {
    const clientes= await db.listarClientes()

    if(clientes.length === 0 ){
        return resp.status(404).send({
            message: "Nenhum cliente encontrado",
          });
    }
    return resp.status(200).send(clientes);
   } catch (err) {

    console.error("Erro ao listar Clientes:", err);
    resp.status(500).send({
      erro: `Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde. ${err.message}`,

    });
   } 
})

endpoint.delete("excluirCliente/:id/", autenticar, async ( req, resp) =>{
    try {
        const {id} = req.params;
        const resultado = await db.excluirCliente(id);
        return resp.status(200).send({message: resultado.message})
    } catch (err) {
        return resp.status(500).send({
            erro: `Erro ao excluir cliente: ${err.message}`,
          });
    }
})

endpoint.put("/atualizarCliente/:id/", autenticar, async(req, resp) =>{
    try {
        const {id} = req.params;
        const { nm_cliente, cnpj, razao} = req.body;

        const resulta = await db.atualizarCliente(id, {
             nm_cliente, cnpj, razao
        })

        return resp.status(200).send({ message: resulta.message });
    } catch (err) {
        return resp.status(500).send({
            erro: `Erro ao atualizar cliente: ${err.message}`,
          });
    }
})

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