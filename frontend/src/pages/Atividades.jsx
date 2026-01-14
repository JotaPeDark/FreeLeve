import React, { useState, useEffect } from 'react';
import { atividadeAPI, projetoAPI } from '../services/api';

const Atividades = () => {
  const [atividades, setAtividades] = useState([]);
  const [projetos, setProjetos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    projeto_id: '',
    nome: '',
    status: 'pendente',
    tempo_estimado: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [atividadesRes, projetosRes] = await Promise.all([
        atividadeAPI.getAll(),
        projetoAPI.getAll()
      ]);
      setAtividades(atividadesRes.data);
      setProjetos(projetosRes.data);
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        projeto_id: parseInt(formData.projeto_id),
        tempo_estimado: parseInt(formData.tempo_estimado)
      };
      
      if (editingId) {
        await atividadeAPI.update(editingId, data);
        alert('Atividade atualizada!');
      } else {
        await atividadeAPI.create(data);
        alert('Atividade criada!');
      }
      closeModal();
      loadData();
    } catch (error) {
      alert('Erro ao salvar atividade.');
    }
  };

  const handleEdit = (atividade) => {
    setEditingId(atividade.id);
    setFormData({
      projeto_id: atividade.projeto_id,
      nome: atividade.nome,
      status: atividade.status,
      tempo_estimado: atividade.tempo_estimado || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Deletar esta atividade?')) return;
    try {
      await atividadeAPI.delete(id);
      alert('Atividade deletada!');
      loadData();
    } catch (error) {
      alert('Erro ao deletar.');
    }
  };

  const openModal = () => {
    setEditingId(null);
    setFormData({ projeto_id: '', nome: '', status: 'pendente', tempo_estimado: '' });
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>Atividades</h2>
          <p>Gerencie as atividades dos projetos</p>
        </div>
      </div>

      <div className="page-content">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Lista de Atividades</h3>
            <button className="btn btn-primary" onClick={openModal}>
              ➕ Nova Atividade
            </button>
          </div>

          {atividades.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">✓</div>
              <h3 className="empty-state-title">Nenhuma atividade cadastrada</h3>
              <button className="btn btn-primary" onClick={openModal}>➕ Criar Atividade</button>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Projeto ID</th>
                  <th>Status</th>
                  <th>Tempo Est. (h)</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {atividades.map(atividade => (
                  <tr key={atividade.id}>
                    <td>#{atividade.id}</td>
                    <td><strong>{atividade.nome}</strong></td>
                    <td>#{atividade.projeto_id}</td>
                    <td><span className={`badge ${atividade.status === 'concluida' ? 'badge-success' : 'badge-primary'}`}>{atividade.status}</span></td>
                    <td>{atividade.tempo_estimado || '-'}</td>
                    <td>
                      <button className="btn btn-secondary btn-sm" onClick={() => handleEdit(atividade)} style={{marginRight:'8px'}}>✏️</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(atividade.id)}>🗑️</button>
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
              <h3 className="modal-title">{editingId ? 'Editar Atividade' : 'Nova Atividade'}</h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Projeto</label>
                <select className="form-select" value={formData.projeto_id} onChange={(e) => setFormData({ ...formData, projeto_id: e.target.value })} required>
                  <option value="">Selecione um projeto</option>
                  {projetos.map(p => (
                    <option key={p.id} value={p.id}>{p.nome}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Nome da Atividade</label>
                <input type="text" className="form-input" value={formData.nome} onChange={(e) => setFormData({ ...formData, nome: e.target.value })} required />
              </div>
              <div className="form-group">
                <label className="form-label">Status</label>
                <select className="form-select" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                  <option value="pendente">Pendente</option>
                  <option value="em_andamento">Em Andamento</option>
                  <option value="concluida">Concluída</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Tempo Estimado (horas)</label>
                <input type="number" className="form-input" value={formData.tempo_estimado} onChange={(e) => setFormData({ ...formData, tempo_estimado: e.target.value })} />
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

export default Atividades;
