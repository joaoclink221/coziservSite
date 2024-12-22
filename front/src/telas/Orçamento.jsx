import React, { useEffect, useState } from 'react';
import { CirclePlus, Trash, FilePen } from 'lucide-react';
import ModalOrcamento from '../modal/ModalOrcamentos.jsx'; // Supondo que você tenha esse modal
import Header from "../components/Header";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Orcamentos = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [orcamentoList, setOrcamentoLists] = useState([])
    const [erro, setErro] = useState(null)
    const [editarorcamento, setEditarorcamento] = useState(null)
     const [token, setToken] = useState(null)
    const Navigate = useNavigate()

    useEffect(() =>{
        let token = localStorage.getItem("TOKEN")
        setToken(token)

        if(token === null){
            Navigate("/")
        }
    }, [])

    useEffect(() =>{
        axios.get("http://localhost:5001/orcamento/")
        .then(Response =>{
            setOrcamentoLists(Response.data)
            setErro(null)
        })
        .catch(error =>{
            console.error("erro ao buscar orçamento:", error);
                if (orcamentoList.length == 0) { setErro("nenhum orçamento encontrado") }
                else { setErro("erro ao buscar orçamento. tente novamente mais tarde") }
        })
    }, [orcamentoList])

    const excluirOrcamento = async(id) =>{
        try {
            const resposta = await axios.delete(`http://localhost:5001/excluirServico/${id}?x-access-token=${token}`)
            alert(resposta.data.message);
            setOrcamentoLists(orcamentoList.filter((orcamento) => orcamento.id_servico !==id))
        } catch (erro) {
            alert("Erro ao excluir orçamento: " + erro.message);
        }
    }

    const editandoOrcamento = (orcamento) =>{
        editandoOrcamento(orcamento)
        setIsModalOpen(true)
    }
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
            <Header />

            <div className="w-full max-w-7xl mx-auto px-6"> 
                <h1 className="text-custom-blue text-4xl font-extrabold mb-6 mt-16">Lista de Orçamentos</h1>

                <div className="flex justify-end mb-6">
                    <button
                        className="text-custom-blue bg-transparent w-14 h-14 rounded-full flex items-center justify-center hover:bg-custom-blue hover:text-blue-600 transition-all duration-300 ease-in-out"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <CirclePlus width={32} height={32} />
                    </button>
                    <ModalOrcamento isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}  editarOrcamento={editarorcamento}/>
                </div>

                <div className="bg-white shadow-lg rounded-lg w-full overflow-hidden">
                    {orcamentoList.length >0 ?(

                    <table className="min-w-full table-auto text-sm text-gray-800">
                        <thead className="bg-custom-blue text-white">
                            <tr>
                                <th className="py-3 px-5 text-center">ID</th>
                                <th className="py-3 px-5 text-center">Cliente</th>
                                <th className="py-3 px-5 text-center">CNPJ</th>
                                <th className="py-3 px-5 text-center">Tipo de serviço</th>
                                <th className="py-3 px-5 text-center">Data de orçamento</th>
                                <th className="py-3 px-5 text-center">Valor</th>
                                <th className="py-3 px-5 text-center">Razão</th>
                                <th className="py-3 px-5 text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                           {orcamentoList.map((orcamento, index) =>(

                            <tr className="hover:bg-gray-100 transition-all duration-200 ease-in-out" key={index}>
                                <td className="py-3 px-5 text-center">{orcamento.id_servico}</td>
                                <td className="py-3 px-5 text-center">{orcamento.nm_cliente}</td>
                                <td className="py-3 px-5 text-center">{orcamento.cnpj}</td>
                                <td className="py-3 px-5 text-center">{orcamento.tipo_servico}</td>
                                <td className="py-3 px-5 text-center">{orcamento.dt_passada}</td>
                                <td className="py-3 px-5 text-center">{orcamento.valor}</td>
                                <td className="py-3 px-5 text-center">{orcamento.razao}</td>
                                <td className="py-3 px-5 text-center">
                                    <div className="flex justify-center gap-4">
                                        <button className="text-custom-blue text-xl hover:text-custom-hover-gradient transition-colors duration-300 ease-in-out" onClick={() => editandoOrcamento(orcamento)}>
                                            <FilePen />
                                        </button>
                                        <button className="text-red-600 text-xl hover:text-red-800 transition-colors duration-300 ease-in-out" onClick={() => excluirOrcamento(orcamento)}>
                                            <Trash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                           ))}
                            
                        </tbody>
                    </table>
                    ):(
                        !erro && <p>Nenhum orçamento encontrado.</p> 
                    )}
                </div>
            </div>
        </div>
    );
};

export default Orcamentos;
