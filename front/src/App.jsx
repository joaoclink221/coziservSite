import { motion } from "framer-motion";  // Para animações
import { Mail, Lock } from "lucide-react";  // Ícones do Lucide
import logo from "../src/assets/logo.png"
import axios from "axios"
import { useState } from "react";
import {useNavigate} from "react-router-dom"

export default function App() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const logar = async (e) => {
    e.preventDefault();
    try {
      const resposta = await axios.post("http://localhost:5001/login/", {

        email: email,
        senha: senha,

      });

      if(resposta.data.token){
        localStorage.setItem("TOKEN", resposta.data.token);
        setMensagem(resposta.data.message);

        setTimeout(() => {
          navigate("/cliente");
        }, 2000);
      } else {
        setMensagem('Falha no login, tente novamente.');
      }
      
      
    } catch (err) {
      if (err.response) {
        setMensagem(err.response.data.message);
      } else {
        setMensagem("erro na conexão do servidor");
      }
    }
  }
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-white flex justify-center items-center z-50">
      <motion.div
        className="bg-white p-8 rounded-xl w-[90%] max-w-[400px] relative shadow-lg overflow-y-auto max-h-[80vh] animate-fadeIn"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="text-center mb-5">
          <img src={logo} alt="Logo" className="w-16 h-16 mx-auto mb-3" />
          <h1 className="text-3xl font-bold text-custom-blue">Login</h1>
        </div>

        <form className="flex flex-col gap-4" onSubmit={logar}>
          {/* Email Input */}
          <div className="relative">
            <label htmlFor="email" className="absolute left-[15px] text-custom-blue text-sm font-semibold">Email</label>
            <div className="flex items-center gap-2 border-2 border-solid border-custom-blue rounded-lg px-3 py-2 w-full">
              <Mail className="text-custom-blue text-lg" />
              <input
                id="email"
                type="email"
                placeholder="Email"
                className="w-full h-10 border-none text-base focus:outline-none"
                autoComplete="true"
                required value={email} onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Senha Input */}
          <div className="relative">
            <label htmlFor="senha" className="absolute left-[15px] text-custom-blue text-sm font-semibold">Senha</label>
            <div className="flex items-center gap-2 border-2 border-solid border-custom-blue rounded-lg px-3 py-2 w-full">
              <Lock className="text-custom-blue text-lg" />
              <input
                id="senha"
                type="password"
                placeholder="Senha"
                className="w-full h-10 border-none text-base focus:outline-none"
                autoComplete="true"
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}/>
            </div>
          </div>

          {/* Botão de Login */}
          <div className="flex justify-center mt-6">
            <motion.button
              className="w-full md:w-36 h-10 text-center flex items-center justify-center bg-custom-blue rounded-[10px] border-none text-base font-bold text-white cursor-pointer shadow-custom transition-all duration-300 ease-in-out transform hover:bg-custom-hover-gradient hover:shadow-hover hover:translate-y-[-2px] active:translate-y-[1px] active:shadow-active"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
            >
              Entrar
            </motion.button>
          </div>
            {mensagem && <p className="login-sucesso"> {mensagem}</p>}
        </form>
      </motion.div>
    </div>
  );
}
