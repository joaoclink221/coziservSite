import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Clientes from './telas/Clientes.jsx'
import Orçamento from './telas/Orçamento.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
      <Route path='/' element={<App />} />
      <Route path='/cliente' element ={<Clientes/>}/>
      <Route path='/orcamento' element ={<Orçamento/>}/>
      </Routes>
    </Router>
  </StrictMode>,
)
