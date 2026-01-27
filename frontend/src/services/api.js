import axios from 'axios'; 
 
const api = axios.create({ 
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000', 
  headers: { 
    'Content-Type': 'application/json' 
  } 
}); 
 
// ============================================ 
// FREELANCERS 
// ============================================ 
export const freelancerAPI = { 
  getAll: () => api.get('/api/freelancers'), 
  getById: (id) => api.get(`/api/freelancers/${id}`), 
  create: (data) => api.post('/api/freelancers', data), 
  update: (id, data) => api.put(`/api/freelancers/${id}`, data), 
  delete: (id) => api.delete(`/api/freelancers/${id}`), 
  getClientes: (id) => api.get(`/api/freelancers/${id}/clientes`) 
}; 
 
// ============================================ 
// CLIENTES 
// ============================================ 
export const clienteAPI = { 
  getAll: () => api.get('/api/clientes'), 
  getById: (id) => api.get(`/api/clientes/${id}`), 
  create: (data) => api.post('/api/clientes', data), 
  update: (id, data) => api.put(`/api/clientes/${id}`, data), 
  delete: (id) => api.delete(`/api/clientes/${id}`) 
}; 
 
// ============================================ 
// PROJETOS 
// ============================================ 
export const projetoAPI = { 
  getAll: () => api.get('/api/projetos'), 
  getById: (id) => api.get(`/api/projetos/${id}`), 
  create: (data) => api.post('/api/projetos', data), 
  update: (id, data) => api.put(`/api/projetos/${id}`, data), 
  delete: (id) => api.delete(`/api/projetos/${id}`), 
  getAtividades: (id) => api.get(`/api/projetos/${id}/atividades`) 
}; 
 
// ============================================ 
// ATIVIDADES 
// ============================================ 
export const atividadeAPI = { 
  getAll: () => api.get('/api/atividades'), 
  getById: (id) => api.get(`/api/atividades/${id}`), 
  create: (data) => api.post('/api/atividades', data), 
  update: (id, data) => api.put(`/api/atividades/${id}`, data), 
  delete: (id) => api.delete(`/api/atividades/${id}`) 
}; 
 
// ============================================ 
// HORAS 
// ============================================ 
export const horaAPI = { 
  getAll: () => api.get('/api/horas'), 
  getById: (id) => api.get(`/api/horas/${id}`), 
  getAtivas: () => api.get('/api/horas/ativas'), 
  iniciar: (data) => api.post('/api/horas', data), 
  parar: (id) => api.post(`/api/horas/${id}/parar`), 
  delete: (id) => api.delete(`/api/horas/${id}`) 
}; 
 
export default api;
