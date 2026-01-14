import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Freelancers from './pages/Freelancers';
import Clientes from './pages/Clientes';
import Projetos from './pages/Projetos';
import Atividades from './pages/Atividades';
import Timer from './pages/Timer';
import Pagamentos from './pages/Pagamentos';
import './styles/global.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/freelancers" element={<Freelancers />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/projetos" element={<Projetos />} />
            <Route path="/atividades" element={<Atividades />} />
            <Route path="/horas" element={<Timer />} />
            <Route path="/pagamentos" element={<Pagamentos />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
