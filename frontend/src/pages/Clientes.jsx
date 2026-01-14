import React, { useState, useEffect } from 'react';
import { clienteAPI, freelancerAPI } from '../services/api';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    freelancer_id: '',
    nome: '',
    email: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [clientesRes, freelancersRes] = await Promise.all([
        clienteAPI.getAll(),
        freelancerAPI.getAll()
      ]);
      setClientes(clientesRes.data);
      setFreelancers(freelancersRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        freelancer_id: parseInt(formData.freelancer_id)
      };
      
      if (editingId) {
        await clienteAPI.update(editingId, data);
        alert('Cliente atualizado!');
      } else {
        await clienteAPI.create(data);
        alert('Cliente criado!');
      }
      closeModal();
      loadData();
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao salvar cliente.');
    }
  };

  const handleEdit = (cliente) => {
    setEditingId(cliente.id);
    setFormData({
      freelancer_id: cliente.freelancer_id,
      nome: cliente.nome,
      email: cliente.email
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Deletar este cliente?')) return;
    try {
      await clienteAPI.delete(id);
      alert('Cliente deletado!');
      loadData();
    } catch (error) {
      alert('Erro ao deletar.');
    }
  };

  const openModal = () => {
    setEditingId(null);
    setFormData({ freelancer_id: '', nome: '', email: '' });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
  };

  if (loading) return <div className="loading">Carregando...</div>;

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>Clientes</h2>
          <p>Gerencie seus clientes</p>
        </div>
      </div>

      <div className="page-content">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Lista de Clientes</h3>
            <button className="btn btn-primary" onClick={openModal}>
              ➕ Novo Cliente
            </button>
          </div>

          {clientes.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🏢</div>
              <h3 className="empty-state-title">Nenhum cliente cadastrado</h3>
              <button className="btn btn-primary" onClick={openModal}>➕ Criar Cliente</button>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Freelancer ID</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {clientes.map(cliente => (
                  <tr key={cliente.id}>
                    <td>#{cliente.id}</td>
                    <td><strong>{cliente.nome}</strong></td>
                    <td>{cliente.email}</td>
                    <td>#{cliente.freelancer_id}</td>
                    <td>
                      <button className="btn btn-secondary btn-sm" onClick={() => handleEdit(cliente)} style={{marginRight:'8px'}}>
                        ✏️ Editar
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(cliente.id)}>
                        🗑️ Deletar
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
              <h3 className="modal-title">{editingId ? 'Editar Cliente' : 'Novo Cliente'}</h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Freelancer</label>
                <select
                  className="form-select"
                  value={formData.freelancer_id}
                  onChange={(e) => setFormData({ ...formData, freelancer_id: e.target.value })}
                  required
                >
                  <option value="">Selecione um freelancer</option>
                  {freelancers.map(f => (
                    <option key={f.id} value={f.id}>{f.nome}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Nome</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
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

export default Clientes;
