import React from 'react';
import { X } from 'lucide-react';

const ModalClientes = ({ isOpen, onClose, editarOrcamento }) => {
  if (!isOpen) return null;

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
        <form className="flex flex-col gap-6">
          <h1 className="text-3xl font-extrabold text-custom-blue text-center">Cadastro de Cliente</h1>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col text-lg">
              <label htmlFor="name" className="text-custom-blue">Nome do Cliente</label>
              <input
                type="text"
                className="w-full h-12 border-2 border-solid border-custom-blue rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-transparent transition-all duration-300 ease-in-out"
                placeholder="Digite o nome"
              />
            </div>
            <div className="flex flex-col text-lg">
              <label htmlFor="cnpj" className="text-custom-blue">CNPJ</label>
              <input
                type="text"
                className="w-full h-12 border-2 border-solid border-custom-blue rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-transparent transition-all duration-300 ease-in-out"
                placeholder="Digite o CNPJ"
              />
            </div>
            <div className="flex flex-col text-lg">
              <label htmlFor="razao" className="text-custom-blue">Razão Social</label>
              <input
                type="text"
                className="w-full h-12 border-2 border-solid border-custom-blue rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-transparent transition-all duration-300 ease-in-out"
                placeholder="Digite a razão social"
              />
            </div>
          </div>

          <div className="flex justify-center items-center mt-8">
            <button
              className="w-80 h-12 text-center flex items-center justify-center bg-custom-gradient rounded-lg text-white font-bold cursor-pointer shadow-custom transition-all duration-300 ease-in-out transform hover:bg-custom-hover-gradient hover:shadow-lg hover:scale-105 active:scale-95 active:shadow-sm"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalClientes;
