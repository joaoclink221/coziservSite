import e from "cors"

import clienteController from "./src/controller/clienteController.js"
import orcamentoController from "./src/controller/orcamentoController.js"
import loginController from "./src/controller/loginController.js"


export default function adicionarRotas(servidor){
    servidor.use(clienteController)
    servidor.use(orcamentoController)
    servidor.use(loginController)
}