import { useState, useEffect } from "react";
import { X } from 'lucide-react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ModalClientes = ({ isOpen, onClose, editarCliente }) => {
  const [token, setToken] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const [nomeCliente, setNomeCliente] = useState("")
  const [cnpj, setCnpj] = useState("")
  const [razao, setRazao] = useState("")
  const Navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem('TOKEN')
    setToken(token)

    if (token === null) {
      Navigate(`/`)
    }
  }, [])

  useEffect(() =>{
    if(editarCliente){
      setNomeCliente(editarCliente.nm_cliente)
      setCnpj(editarCliente.cnpj)
      setRazao(editarCliente.razao)
    }
  }, [editarCliente, isOpen])
  if (!isOpen) return null;

  const register =async(event) =>{
    event.preventDefault();

    if(!nomeCliente || !cnpj || ! razao){
      setMensagem("Todos os campos são obrigatórios.");
      return;
    }

    try {
      const dados ={
        nm_cliente: nomeCliente,
        cnpj:cnpj,
        razao: razao
      };

      if(editarCliente){
        console.log(consultaEditando)
        const resposta = await axios.put(`http://localhost:5001/atualizarCliente/${editarCliente.id_cliente}?x-access-token=${token}`, dados)
        setMensagem(`Cliente editado com sucesso`)
      } else{
        const resposta = await axios.post(`http://localhost:5001/CadastroCliente?x-access-token=${token}`, dados);
        setMensagem(`Cliente registrado com sucesso!`);
        setNomeCliente("");
        setCnpj("");
        setRazao("");
      }

    } catch (erro) {
      console.error("Erro ao registrar consulta:", erro.response?.data);
      setMensagem(erro.response?.data?.erro || "Erro ao conectar com o servidor.");
    }
  }
  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-[1000]"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
    >
      <div className="bg-white p-8 rounded-2xl w-[90%] max-w-[600px] relative shadow-xl overflow-y-auto max-h-[90vh]">
        <button
          className="absolute top-3 right-3 text-3xl text-custom-blue bg-transparent border-none cursor-pointer hover:text-blue-500 transition-all duration-300 ease-in-out"
          onClick={onClose}
        >
          <X />
        </button>
        <form className="flex flex-col gap-6" onSubmit={register}>
          <h1 className="text-3xl font-extrabold text-custom-blue text-center">{editarCliente ? "Editando cliente" : "CadastrandoCliente"}</h1>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col text-lg">
              <label htmlFor="name" className="text-custom-blue">Nome do Cliente</label>
              <input
                type="text"
                className="w-full h-12 border-2 border-solid border-custom-blue rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-transparent transition-all duration-300 ease-in-out"
                placeholder="Digite o nome"
                value={nomeCliente}
                onChange={(e) => setNomeCliente(e.target.value)}
              />
            </div>
            <div className="flex flex-col text-lg">
              <label htmlFor="cnpj" className="text-custom-blue">CNPJ</label>
              <input
                type="text"
                className="w-full h-12 border-2 border-solid border-custom-blue rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-transparent transition-all duration-300 ease-in-out"
                placeholder="Digite o CNPJ"
                value={setCnpj}
                onChange={(e) =>setCnpj(e.target.value)}
              />
            </div>
            <div className="flex flex-col text-lg">
              <label htmlFor="razao" className="text-custom-blue">Razão Social</label>
              <input
                type="text"
                className="w-full h-12 border-2 border-solid border-custom-blue rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-transparent transition-all duration-300 ease-in-out"
                placeholder="Digite a razão social"
                value={razao}
                onChange={(e) => setRazao(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-center items-center mt-8">
            <button
              className="w-80 h-12 text-center flex items-center justify-center bg-custom-gradient rounded-lg text-white font-bold cursor-pointer shadow-custom transition-all duration-300 ease-in-out transform hover:bg-custom-hover-gradient hover:shadow-lg hover:scale-105 active:scale-95 active:shadow-sm"
              type="submit"
            >
              {editarCliente ? "Atualizar" : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalClientes;
