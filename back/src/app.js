import "dotenv/config.js"
import express,{json} from "express"
import cors from "cors"
import adicionarRotas from "../rotas.js"

const servidor = express()
servidor.use(express.json())
servidor.use(cors())

adicionarRotas(servidor)
const PORT = process.env.PORT;
servidor.listen(PORT, () => console.log(`subiu na ${PORT}`)
)