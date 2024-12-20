import React, { useState, useEffect } from 'react';
import { CirclePlus, Trash, FilePen } from 'lucide-react';
import ModalClientes from '../modal/ModalClientes';
import Header from "../components/Header";
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const Clientes = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [clienteList, setClienteList] = useState([])
    const [erro, setErro] = useState(null)
    const [editarCliente, setEditarCliente] = useState(null)
    const [token, setToken] = useState(null)
    const Navigate = useNavigate()

    useEffect(() => {
        let token = localStorage.getItem('TOKEN')
        setToken(token)

        if (token === null) {
            Navigate(`/`)
        }
    }, [])

    useEffect(() => {
        axios.get("http://localhost:5001/clientes/")
            .then(Response => {
                setClienteList(Response.data)
                setErro(null)
            })
            .catch(error => {
                console.error("erro ao buscar cliente:", error);
                if (clienteList.length == 0) { setErro("nenhum cliente encontrado") }
                else { setErro("erro ao buscar consulta. tente novamente mais tarde") }
            })
    }, [consultasList]);

    const excluirCliente = async (id) => {
        try {
            const resposta = await axios.delete(`http://localhost:5001/excluirCliente/${id}?x-access-token=${token}`)
            alert(resposta.data.message);
            setClienteList(clienteList.filter((cliente) => cliente.id_cliente !== id))
        } catch (erro) {
            alert("Erro ao excluir consulta: " + erro.message);
        }
    }

    const clienteEditado = (cliente) => {
        editarCliente(cliente)
        setIsModalOpen(true)
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
            <Header />

            <div className="w-full max-w-6xl mx-auto px-6">

                <h1 className="text-custom-blue text-4xl font-extrabold mb-6 mt-16">Lista de Clientes</h1>

                <div className="flex justify-end mb-6">
                    <button
                        className="text-custom-blue bg-transparent w-14 h-14 rounded-full flex items-center justify-center hover:bg-custom-blue hover:text-blue-600 transition-all duration-300 ease-in-out"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <CirclePlus width={32} height={32} />
                    </button>
                    <ModalClientes isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} editarCliente={editarCliente} />
                </div>

                <div className="bg-white shadow-lg rounded-lg w-full overflow-hidden">
                    {clienteList.length > 0 ? (
                        <table className="min-w-full table-auto text-sm text-gray-800">
                            <thead className="bg-custom-blue text-white">
                                <tr>
                                    <th className="py-3 px-5 text-center">ID</th>
                                    <th className="py-3 px-5 text-center">Nome</th>
                                    <th className="py-3 px-5 text-center">CNPJ</th>
                                    <th className="py-3 px-5 text-center">Razão</th>
                                    <th className="py-3 px-5 text-center">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clienteList.map((cliente, index) => (

                                    <tr className="hover:bg-gray-100 transition-all duration-200 ease-in-out" key={index}>
                                        <td className="py-3 px-5 text-center">{cliente.id_cliente}</td>
                                        <td className="py-3 px-5 text-center">{cliente.nm_cliente}</td>
                                        <td className="py-3 px-5 text-center">{cliente.cnpj}</td>
                                        <td className="py-3 px-5 text-center">{cliente.razao}</td>
                                        <td className="py-3 px-5 text-center">
                                            <div className="flex justify-center gap-4">
                                                <button className="text-custom-blue text-xl hover:text-custom-hover-gradient transition-colors duration-300 ease-in-out" onClick={()=>clienteEditado(cliente)}>
                                                    <FilePen />
                                                </button>
                                                <button className="text-red-600 text-xl hover:text-red-800 transition-colors duration-300 ease-in-out" onClick={() =>excluirCliente(cliente.id_cliente)}>
                                                    <Trash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    ) : (
                        !erro && <p>Nenhuma consulta encontrada.</p>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Clientes;
