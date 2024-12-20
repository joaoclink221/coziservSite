import React, { useState } from 'react';
import { CirclePlus, Trash, FilePen } from 'lucide-react';
import ModalOrcamento from '../modal/ModalOrcamentos.jsx'; // Supondo que você tenha esse modal
import Header from "../components/Header";

const Orcamentos = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
            <Header />

            <div className="w-full max-w-7xl mx-auto px-6"> {/* Alterei de max-w-6xl para max-w-7xl para aumentar a largura */}
                {/* Ajustei a margem superior do título para ficar mais afastado do header */}
                <h1 className="text-custom-blue text-4xl font-extrabold mb-6 mt-16">Lista de Orçamentos</h1> {/* Margem superior ajustada com mt-16 */}

                <div className="flex justify-end mb-6">
                    <button
                        className="text-custom-blue bg-transparent w-14 h-14 rounded-full flex items-center justify-center hover:bg-custom-blue hover:text-blue-600 transition-all duration-300 ease-in-out"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <CirclePlus width={32} height={32} />
                    </button>
                    <ModalOrcamento isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
                </div>

                <div className="bg-white shadow-lg rounded-lg w-full overflow-hidden">
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
                            {/* Exemplo de item */}
                            <tr className="hover:bg-gray-100 transition-all duration-200 ease-in-out">
                                <td className="py-3 px-5 text-center">1</td>
                                <td className="py-3 px-5 text-center">Cliente Exemplo</td>
                                <td className="py-3 px-5 text-center">R$ 1.000,00</td>
                                <td className="py-3 px-5 text-center">Serviço A</td>
                                <td className="py-3 px-5 text-center">01/01/2024</td>
                                <td className="py-3 px-5 text-center">R$ 2.500,00</td>
                                <td className="py-3 px-5 text-center">Razão Exemplo</td>
                                <td className="py-3 px-5 text-center">
                                    <div className="flex justify-center gap-4">
                                        <button className="text-custom-blue text-xl hover:text-custom-hover-gradient transition-colors duration-300 ease-in-out">
                                            <FilePen />
                                        </button>
                                        <button className="text-red-600 text-xl hover:text-red-800 transition-colors duration-300 ease-in-out">
                                            <Trash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            {/* Adicione mais itens conforme necessário */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Orcamentos;
