import React, { useState, useEffect } from 'react';
import { freelancerAPI } from '../services/api';

const Freelancers = () => {
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    chave_pix: ''
  });

  useEffect(() => {
    loadFreelancers();
  }, []);

  const loadFreelancers = async () => {
    try {
      const response = await freelancerAPI.getAll();
      setFreelancers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar freelancers:', error);
      alert('Erro ao carregar freelancers. Verifique se o backend está rodando.');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await freelancerAPI.update(editingId, formData);
        alert('Freelancer atualizado com sucesso!');
      } else {
        await freelancerAPI.create(formData);
        alert('Freelancer criado com sucesso!');
      }
      closeModal();
      loadFreelancers();
    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Erro ao salvar freelancer.');
    }
  };

  const handleEdit = (freelancer) => {
    setEditingId(freelancer.id);
    setFormData({
      nome: freelancer.nome,
      email: freelancer.email,
      chave_pix: freelancer.chave_pix
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja deletar este freelancer?')) return;
    
    try {
      await freelancerAPI.delete(id);
      alert('Freelancer deletado com sucesso!');
      loadFreelancers();
    } catch (error) {
      console.error('Erro ao deletar:', error);
      alert('Erro ao deletar freelancer.');
    }
  };

  const openModal = () => {
    setEditingId(null);
    setFormData({ nome: '', email: '', chave_pix: '' });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({ nome: '', email: '', chave_pix: '' });
  };

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>Freelancers</h2>
          <p>Gerencie seus freelancers</p>
        </div>
      </div>

      <div className="page-content">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Lista de Freelancers</h3>
            <button className="btn btn-primary" onClick={openModal}>
              ➕ Novo Freelancer
            </button>
          </div>

          {freelancers.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">👤</div>
              <h3 className="empty-state-title">Nenhum freelancer cadastrado</h3>
              <p className="empty-state-text">Comece criando seu primeiro freelancer</p>
              <button className="btn btn-primary" onClick={openModal}>
                ➕ Criar Freelancer
              </button>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Chave PIX</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {freelancers.map(freelancer => (
                  <tr key={freelancer.id}>
                    <td>#{freelancer.id}</td>
                    <td><strong>{freelancer.nome}</strong></td>
                    <td>{freelancer.email}</td>
                    <td>{freelancer.chave_pix}</td>
                    <td>
                      <button 
                        className="btn btn-secondary btn-sm" 
                        onClick={() => handleEdit(freelancer)}
                        style={{ marginRight: '8px' }}
                      >
                        ✏️ Editar
                      </button>
                      <button 
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(freelancer.id)}
                      >
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
              <h3 className="modal-title">
                {editingId ? 'Editar Freelancer' : 'Novo Freelancer'}
              </h3>
            </div>

            <form onSubmit={handleSubmit}>
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

              <div className="form-group">
                <label className="form-label">Chave PIX</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.chave_pix}
                  onChange={(e) => setFormData({ ...formData, chave_pix: e.target.value })}
                  required
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingId ? 'Atualizar' : 'Criar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Freelancers;
