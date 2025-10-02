/**
 * İş İlanları Servisi
 * İş ilanları ile ilgili tüm API çağrıları
 */
import api from '../config/api';

export const jobService = {
  // Tüm iş ilanlarını getir (filtreli)
  getAllJobs: async (filters = {}) => {
    const response = await api.get('/jobs', { params: filters });
    return response.data;
  },

  // ID'ye göre iş ilanı getir
  getJobById: async (id) => {
    const response = await api.get(`/jobs/${id}`);
    return response.data;
  },

  // Yeni iş ilanı oluştur (sadece şirket)
  createJob: async (jobData) => {
    const response = await api.post('/jobs', jobData);
    return response.data;
  },

  // İş ilanını güncelle
  updateJob: async (id, jobData) => {
    const response = await api.put(`/jobs/${id}`, jobData);
    return response.data;
  },

  // İş ilanını sil
  deleteJob: async (id) => {
    const response = await api.delete(`/jobs/${id}`);
    return response.data;
  },

  // İş ilanı ara
  searchJobs: async (searchTerm) => {
    const response = await api.get('/jobs/search', { params: { q: searchTerm } });
    return response.data;
  },

  // Kategoriye göre iş ilanları
  getJobsByCategory: async (categoryId) => {
    const response = await api.get(`/jobs/category/${categoryId}`);
    return response.data;
  },

  // Şirkete göre iş ilanları
  getJobsByCompany: async (companyId) => {
    const response = await api.get(`/jobs/company/${companyId}`);
    return response.data;
  },

  // İş ilanını kaydet (yer işareti)
  saveJob: async (jobId) => {
    const response = await api.post(`/jobs/${jobId}/save`);
    return response.data;
  },

  // İş ilanı kaydını kaldır
  unsaveJob: async (jobId) => {
    const response = await api.delete(`/jobs/${jobId}/save`);
    return response.data;
  },
};
