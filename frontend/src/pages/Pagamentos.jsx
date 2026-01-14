import React, { useState, useEffect } from 'react';
import { pagamentoAPI, projetoAPI } from '../services/api';

const Pagamentos = () => {
  const [pagamentos, setPagamentos] = useState([]);
  const [projetos, setProjetos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showPixModal, setShowPixModal] = useState(false);
  const [currentPix, setCurrentPix] = useState(null);
  const [formData, setFormData] = useState({
    projeto_id: '',
    valor: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [pagamentosRes, projetosRes] = await Promise.all([
        pagamentoAPI.getAll(),
        projetoAPI.getAll()
      ]);
      setPagamentos(pagamentosRes.data);
      setProjetos(projetosRes.data);
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await pagamentoAPI.create({
        projeto_id: parseInt(formData.projeto_id),
        valor: parseFloat(formData.valor)
      });
      alert('Pagamento criado! Gerando PIX...');
      closeModal();
      loadData();
      
      if (res.data.qr_code) {
        setCurrentPix(res.data);
        setShowPixModal(true);
      }
    } catch (error) {
      alert('Erro ao criar pagamento.');
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await pagamentoAPI.updateStatus(id, status);
      alert('Status atualizado!');
      loadData();
    } catch (error) {
      alert('Erro ao atualizar status.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Deletar este pagamento?')) return;
    try {
      await pagamentoAPI.delete(id);
      alert('Pagamento deletado!');
      loadData();
    } catch (error) {
      alert('Erro ao deletar.');
    }
  };

  const openModal = () => {
    setFormData({ projeto_id: '', valor: '' });
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Código PIX copiado!');
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>Pagamentos</h2>
          <p>Gerencie os pagamentos dos projetos</p>
        </div>
      </div>

      <div className="page-content">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Lista de Pagamentos</h3>
            <button className="btn btn-primary" onClick={openModal}>
              ➕ Novo Pagamento
            </button>
          </div>

          {pagamentos.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">💰</div>
              <h3 className="empty-state-title">Nenhum pagamento cadastrado</h3>
              <button className="btn btn-primary" onClick={openModal}>➕ Criar Pagamento</button>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Projeto ID</th>
                  <th>Valor</th>
                  <th>Status</th>
                  <th>PIX</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {pagamentos.map(pagamento => (
                  <tr key={pagamento.id}>
                    <td>#{pagamento.id}</td>
                    <td>#{pagamento.projeto_id}</td>
                    <td><strong>R$ {parseFloat(pagamento.valor).toFixed(2)}</strong></td>
                    <td>
                      <span className={`badge ${
                        pagamento.status === 'pago' ? 'badge-success' : 
                        pagamento.status === 'cancelado' ? 'badge-danger' : 'badge-warning'
                      }`}>
                        {pagamento.status}
                      </span>
                    </td>
                    <td>
                      {pagamento.qr_code && pagamento.status === 'pendente' && (
                        <button 
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            setCurrentPix(pagamento);
                            setShowPixModal(true);
                          }}
                        >
                          📱 Ver QR Code
                        </button>
                      )}
                    </td>
                    <td>
                      {pagamento.status === 'pendente' && (
                        <button 
                          className="btn btn-success btn-sm" 
                          onClick={() => handleUpdateStatus(pagamento.id, 'pago')}
                          style={{marginRight:'8px'}}
                        >
                          ✓ Marcar Pago
                        </button>
                      )}
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(pagamento.id)}>
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
              <h3 className="modal-title">Novo Pagamento</h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Projeto</label>
                <select className="form-select" value={formData.projeto_id} onChange={(e) => setFormData({ ...formData, projeto_id: e.target.value })} required>
                  <option value="">Selecione um projeto</option>
                  {projetos.map(p => (
                    <option key={p.id} value={p.id}>{p.nome} - R$ {parseFloat(p.valor).toFixed(2)}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Valor (R$)</label>
                <input type="number" step="0.01" className="form-input" value={formData.valor} onChange={(e) => setFormData({ ...formData, valor: e.target.value })} required />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancelar</button>
                <button type="submit" className="btn btn-primary">Criar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showPixModal && currentPix && (
        <div className="modal-overlay" onClick={() => setShowPixModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{textAlign: 'center'}}>
            <div className="modal-header">
              <h3 className="modal-title">Pagamento via PIX</h3>
            </div>
            <div style={{padding: '20px'}}>
              <p>Escaneie o QR Code abaixo para pagar:</p>
              <img 
                src={`data:image/png;base64,${currentPix.qr_code_base64}`} 
                alt="QR Code PIX" 
                style={{width: '250px', height: '250px', margin: '20px 0'}}
              />
              <div className="form-group">
                <label className="form-label">Ou copie o código:</label>
                <textarea 
                  className="form-input" 
                  readOnly 
                  value={currentPix.qr_code}
                  style={{fontSize: '12px', height: '80px'}}
                />
              </div>
              <button 
                className="btn btn-primary" 
                onClick={() => copyToClipboard(currentPix.qr_code)}
                style={{width: '100%'}}
              >
                📋 Copiar Código PIX
              </button>
            </div>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowPixModal(false)}>Fechar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pagamentos;
