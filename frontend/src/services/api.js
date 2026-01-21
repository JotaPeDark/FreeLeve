import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// ============================================
// FREELANCERS
// ============================================
export const freelancerAPI = {
  getAll: () => api.get('/freelancers'),
  getById: (id) => api.get(`/freelancers/${id}`),
  create: (data) => api.post('/freelancers', data),
  update: (id, data) => api.post(`/freelancers/${id}`, data),
  delete: (id) => api.delete(`/freelancers/${id}`),
  getClientes: (id) => api.get(`/freelancers/${id}/clientes`)
};

// ============================================
// CLIENTES
// ============================================
export const clienteAPI = {
  getAll: () => api.get('/clientes'),
  getById: (id) => api.get(`/clientes/${id}`),
  create: (data) => api.post('/clientes', data),
  update: (id, data) => api.post(`/clientes/${id}`, data),
  delete: (id) => api.delete(`/clientes/${id}`)
};

// ============================================
// PROJETOS
// ============================================
export const projetoAPI = {
  getAll: () => api.get('/projetos'),
  getById: (id) => api.get(`/projetos/${id}`),
  create: (data) => api.post('/projetos', data),
  update: (id, data) => api.post(`/projetos/${id}`, data),
  delete: (id) => api.delete(`/projetos/${id}`),
  getAtividades: (id) => api.get(`/projetos/${id}/atividades`)
};

// ============================================
// ATIVIDADES
// ============================================
export const atividadeAPI = {
  getAll: () => api.get('/atividades'),
  getById: (id) => api.get(`/atividades/${id}`),
  create: (data) => api.post('/atividades', data),
  update: (id, data) => api.post(`/atividades/${id}`, data),
  delete: (id) => api.delete(`/atividades/${id}`)
};

// ============================================
// HORAS
// ============================================
export const horaAPI = {
  getAll: () => api.get('/horas'),
  getById: (id) => api.get(`/horas/${id}`),
  getAtivas: () => api.get('/horas/ativas'),
  iniciar: (data) => api.post('/horas', data),
  parar: (id) => api.post(`/horas/${id}/parar`),
  delete: (id) => api.delete(`/horas/${id}`)
};

export default api;
