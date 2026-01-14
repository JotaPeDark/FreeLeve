import React, { useState, useEffect } from 'react';
import { horaAPI, atividadeAPI, freelancerAPI } from '../services/api';

const Timer = () => {
  const [horas, setHoras] = useState([]);
  const [atividades, setAtividades] = useState([]);
  const [freelancers, setFreelancers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    atividade_id: '',
    freelancer_id: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [horasRes, atividadesRes, freelancersRes] = await Promise.all([
        horaAPI.getAtivas(),
        atividadeAPI.getAll(),
        freelancerAPI.getAll()
      ]);
      setHoras(horasRes.data);
      setAtividades(atividadesRes.data);
      setFreelancers(freelancersRes.data);
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const handleIniciar = async (e) => {
    e.preventDefault();
    try {
      await horaAPI.iniciar({
        atividade_id: parseInt(formData.atividade_id),
        freelancer_id: parseInt(formData.freelancer_id)
      });
      alert('Timer iniciado!');
      closeModal();
      loadData();
    } catch (error) {
      alert('Erro ao iniciar timer.');
    }
  };

  const handleParar = async (id) => {
    try {
      await horaAPI.parar(id);
      alert('Timer parado!');
      loadData();
    } catch (error) {
      alert('Erro ao parar timer.');
    }
  };

  const openModal = () => {
    setFormData({ atividade_id: '', freelancer_id: '' });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const calcularTempo = (inicio) => {
    const agora = new Date();
    const inicioDate = new Date(inicio);
    return Math.floor((agora - inicioDate) / 1000);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>Timer de Horas</h2>
          <p>Gerencie o tempo de trabalho</p>
        </div>
      </div>

      <div className="page-content">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Timers Ativos</h3>
            <button className="btn btn-primary" onClick={openModal}>
              ⏱️ Iniciar Timer
            </button>
          </div>

          {horas.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">⏱️</div>
              <h3 className="empty-state-title">Nenhum timer ativo</h3>
              <button className="btn btn-primary" onClick={openModal}>Iniciar Timer</button>
            </div>
          ) : (
            <div>
              {horas.map(hora => (
                <div key={hora.id} style={{ 
                  border: '2px solid var(--primary)', 
                  borderRadius: '12px', 
                  padding: '24px', 
                  marginBottom: '16px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ fontSize: '24px', marginBottom: '8px' }}>
                        Atividade #{hora.atividade_id}
                      </h3>
                      <p style={{ opacity: 0.9 }}>Freelancer #{hora.freelancer_id}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '48px', fontWeight: '700', marginBottom: '12px' }}>
                        {formatTime(calcularTempo(hora.inicio))}
                      </div>
                      <button 
                        className="btn btn-danger" 
                        onClick={() => handleParar(hora.id)}
                      >
                        ⏹️ Parar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Iniciar Timer</h3>
            </div>
            <form onSubmit={handleIniciar}>
              <div className="form-group">
                <label className="form-label">Atividade</label>
                <select
                  className="form-select"
                  value={formData.atividade_id}
                  onChange={(e) => setFormData({ ...formData, atividade_id: e.target.value })}
                  required
                >
                  <option value="">Selecione uma atividade</option>
                  {atividades.map(a => (
                    <option key={a.id} value={a.id}>{a.nome}</option>
                  ))}
                </select>
              </div>
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
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancelar</button>
                <button type="submit" className="btn btn-success">⏱️ Iniciar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timer;
