import React, { useState, useEffect } from 'react';
import { projetoAPI, clienteAPI } from '../services/api';

const Projetos = () => {
  const [projetos, setProjetos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    cliente_id: '',
    nome: '',
    valor: '',
    status: 'pendente'
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [projetosRes, clientesRes] = await Promise.all([
        projetoAPI.getAll(),
        clienteAPI.getAll()
      ]);
      setProjetos(projetosRes.data);
      setClientes(clientesRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Erro:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        cliente_id: parseInt(formData.cliente_id),
        valor: parseFloat(formData.valor)
      };
      
      if (editingId) {
        await projetoAPI.update(editingId, data);
        alert('Projeto atualizado!');
      } else {
        await projetoAPI.create(data);
        alert('Projeto criado!');
      }
      closeModal();
      loadData();
    } catch (error) {
      alert('Erro ao salvar projeto.');
    }
  };

  const handleEdit = (projeto) => {
    setEditingId(projeto.id);
    setFormData({
      cliente_id: projeto.cliente_id,
      nome: projeto.nome,
      valor: projeto.valor,
      status: projeto.status
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Deletar este projeto?')) return;
    try {
      await projetoAPI.delete(id);
      alert('Projeto deletado!');
      loadData();
    } catch (error) {
      alert('Erro ao deletar.');
    }
  };

  const openModal = () => {
    setEditingId(null);
    setFormData({ cliente_id: '', nome: '', valor: '', status: 'pendente' });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
  };

  const getStatusBadge = (status) => {
    const badges = {
      'pendente': 'badge-warning',
      'em_andamento': 'badge-primary',
      'concluido': 'badge-success'
    };
    return badges[status] || 'badge-primary';
  };

  if (loading) return <div className="loading">Carregando...</div>;

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>Projetos</h2>
          <p>Gerencie seus projetos</p>
        </div>
      </div>

      <div className="page-content">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Lista de Projetos</h3>
            <button className="btn btn-primary" onClick={openModal}>
              ➕ Novo Projeto
            </button>
          </div>

          {projetos.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📁</div>
              <h3 className="empty-state-title">Nenhum projeto cadastrado</h3>
              <button className="btn btn-primary" onClick={openModal}>➕ Criar Projeto</button>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Cliente ID</th>
                  <th>Valor</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {projetos.map(projeto => (
                  <tr key={projeto.id}>
                    <td>#{projeto.id}</td>
                    <td><strong>{projeto.nome}</strong></td>
                    <td>#{projeto.cliente_id}</td>
                    <td>R$ {parseFloat(projeto.valor).toFixed(2)}</td>
                    <td>
                      <span className={`badge ${getStatusBadge(projeto.status)}`}>
                        {projeto.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-secondary btn-sm" onClick={() => handleEdit(projeto)} style={{marginRight:'8px'}}>
                        ✏️
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(projeto.id)}>
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{editingId ? 'Editar Projeto' : 'Novo Projeto'}</h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Cliente</label>
                <select
                  className="form-select"
                  value={formData.cliente_id}
                  onChange={(e) => setFormData({ ...formData, cliente_id: e.target.value })}
                  required
                >
                  <option value="">Selecione um cliente</option>
                  {clientes.map(c => (
                    <option key={c.id} value={c.id}>{c.nome}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Nome do Projeto</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Valor (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-input"
                  value={formData.valor}
                  onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="pendente">Pendente</option>
                  <option value="em_andamento">Em Andamento</option>
                  <option value="concluido">Concluído</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancelar</button>
                <button type="submit" className="btn btn-primary">{editingId ? 'Atualizar' : 'Criar'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projetos;
