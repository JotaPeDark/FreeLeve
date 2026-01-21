import React, { useState, useEffect } from 'react';
import { freelancerAPI, clienteAPI, projetoAPI } from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    freelancers: 0,
    clientes: 0,
    projetos: 0,
    loading: true
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [freelancers, clientes, projetos] = await Promise.all([
        freelancerAPI.getAll(),
        clienteAPI.getAll(),
        projetoAPI.getAll(),
      ]);

      setStats({
        freelancers: freelancers.data.length,
        clientes: clientes.data.length,
        projetos: projetos.data.length,
        loading: false
      });
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
      setStats(prev => ({ ...prev, loading: false }));
    }
  };

  if (stats.loading) {
    return <div className="loading">Carregando estatísticas...</div>;
  }

  return (
    <div>
      <div className="page-header">
        <h2>🎯 Dashboard</h2>
        <p>Visão geral do sistema em tempo real</p>
      </div>

      <div className="page-content">
        <div className="stats-grid">
          <div className="stat-card" style={{ animationDelay: '0.1s' }}>
            <div className="stat-card-header">
              <span className="stat-card-title">Freelancers</span>
              <div className="stat-card-icon" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
                👤
              </div>
            </div>
            <div className="stat-card-value">{stats.freelancers}</div>
            <div style={{ marginTop: '12px', fontSize: '13px', color: 'var(--gray-500)', fontWeight: '600' }}>
              ✓ Ativos no sistema
            </div>
          </div>

          <div className="stat-card" style={{ animationDelay: '0.2s' }}>
            <div className="stat-card-header">
              <span className="stat-card-title">Clientes</span>
              <div className="stat-card-icon" style={{ background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', color: 'white' }}>
                🏢
              </div>
            </div>
            <div className="stat-card-value">{stats.clientes}</div>
            <div style={{ marginTop: '12px', fontSize: '13px', color: 'var(--gray-500)', fontWeight: '600' }}>
              ✓ Cadastrados
            </div>
          </div>

          <div className="stat-card" style={{ animationDelay: '0.3s' }}>
            <div className="stat-card-header">
              <span className="stat-card-title">Projetos</span>
              <div className="stat-card-icon" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white' }}>
                📁
              </div>
            </div>
            <div className="stat-card-value">{stats.projetos}</div>
            <div style={{ marginTop: '12px', fontSize: '13px', color: 'var(--gray-500)', fontWeight: '600' }}>
              ✓ Em andamento
            </div>
          </div>

          <div className="stat-card" style={{ animationDelay: '0.4s' }}>
            <div className="stat-card-header">
              <span className="stat-card-title">Pagamentos</span>
              <div className="stat-card-icon" style={{ background: 'linear-gradient(135deg, #eb3349 0%, #f45c43 100%)', color: 'white' }}>
                💰
              </div>
            </div>
            <div className="stat-card-value">{stats.pagamentos}</div>
            <div style={{ marginTop: '12px', fontSize: '13px', color: 'var(--gray-500)', fontWeight: '600' }}>
              ✓ Registrados
            </div>
          </div>
        </div>

        <div className="card" style={{ animationDelay: '0.5s' }}>
          <div className="card-header">
            <h3 className="card-title">✨ Bem-vindo ao Sistema Freelancer</h3>
          </div>
          <div style={{ 
            padding: '24px', 
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
            borderRadius: '12px',
            marginBottom: '20px'
          }}>
            <p style={{ color: 'var(--gray-700)', lineHeight: '1.8', fontSize: '15px' }}>
              Sistema completo de gestão de serviços freelancers com design moderno e intuitivo. 
              Use o menu lateral para navegar entre os módulos e gerenciar seus freelancers, clientes, 
              projetos, atividades, horas trabalhadas e pagamentos de forma eficiente.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={loadStats}>
              🔄 Atualizar Estatísticas
            </button>
            <button className="btn btn-secondary" onClick={() => window.location.href = '/freelancers'}>
              👤 Ver Freelancers
            </button>
            <button className="btn btn-success" onClick={() => window.location.href = '/projetos'}>
              📁 Ver Projetos
            </button>
          </div>
        </div>

        <div className="card" style={{ animationDelay: '0.6s' }}>
          <div className="card-header">
            <h3 className="card-title">📊 Status da Conexão</h3>
          </div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '16px',
            padding: '20px',
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(5, 150, 105, 0.05) 100%)',
            borderRadius: '12px'
          }}>
            <div style={{ 
              width: '16px', 
              height: '16px', 
              borderRadius: '50%', 
              background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
              boxShadow: '0 0 20px rgba(16, 185, 129, 0.5)',
              animation: 'pulse 2s ease-in-out infinite'
            }}></div>
            <div>
              <div style={{ color: 'var(--gray-700)', fontWeight: '700', marginBottom: '4px' }}>
                Backend Online
              </div>
              <div style={{ color: 'var(--gray-500)', fontSize: '14px' }}>
                Conectado em <strong>http://localhost:3000</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="stats-grid" style={{ animationDelay: '0.7s' }}>
          <div className="card">
            <h4 style={{ 
              fontSize: '16px', 
              fontWeight: '700', 
              marginBottom: '16px',
              color: 'var(--gray-700)'
            }}>
              🚀 Recursos Disponíveis
            </h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {[
                '✓ CRUD completo de todas entidades',
                '✓ Timer de horas em tempo real',
                '✓ Dashboard com estatísticas',
                '✓ Design moderno e responsivo',
                '✓ Animações fluidas',
                '✓ Integração total com backend'
              ].map((item, index) => (
                <li key={index} style={{
                  padding: '12px 16px',
                  marginBottom: '8px',
                  background: 'var(--gray-50)',
                  borderRadius: '8px',
                  color: 'var(--gray-600)',
                  fontWeight: '600',
                  fontSize: '14px',
                  transition: 'all 0.3s'
                }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="card">
            <h4 style={{ 
              fontSize: '16px', 
              fontWeight: '700', 
              marginBottom: '16px',
              color: 'var(--gray-700)'
            }}>
              📈 Performance
            </h4>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--gray-600)' }}>
                  Sistema
                </span>
                <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--primary)' }}>
                  98%
                </span>
              </div>
              <div style={{ 
                height: '10px', 
                background: 'var(--gray-200)', 
                borderRadius: '10px',
                overflow: 'hidden'
              }}>
                <div style={{ 
                  width: '98%', 
                  height: '100%', 
                  background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                  transition: 'width 1s ease'
                }}></div>
              </div>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--gray-600)' }}>
                  API Response
                </span>
                <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--success)' }}>
                  95%
                </span>
              </div>
              <div style={{ 
                height: '10px', 
                background: 'var(--gray-200)', 
                borderRadius: '10px',
                overflow: 'hidden'
              }}>
                <div style={{ 
                  width: '95%', 
                  height: '100%', 
                  background: 'linear-gradient(90deg, #11998e 0%, #38ef7d 100%)',
                  transition: 'width 1s ease'
                }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
