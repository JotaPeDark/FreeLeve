import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/freelancers', label: 'Freelancers', icon: '👤' },
    { path: '/clientes', label: 'Clientes', icon: '🏢' },
    { path: '/projetos', label: 'Projetos', icon: '📁' },
    { path: '/atividades', label: 'Atividades', icon: '✓' },
    { path: '/horas', label: 'Timer', icon: '⏱️' },
    { path: '/pagamentos', label: 'Pagamentos', icon: '💰' }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1>🚀 Freelancer</h1>
        <p>Sistema de Gestão</p>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="nav-item-icon">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
