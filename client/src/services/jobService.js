/**
 * İş İlanları Servisi
 * İş ilanları ile ilgili tüm API çağrıları
 */
import api from '../config/api';

export const jobService = {
  // Tüm iş ilanlarını getir (filtreli)
  getAllJobs: async (filters = {}) => {
    const response = await api.get('/jobs/', { params: filters });
    return response.data;
  },

  // ID'ye göre iş ilanı getir
  getJobById: async (id) => {
    const response = await api.get(`/jobs/detail.php?id=${id}`);
    return response.data;
  },

  // Yeni iş ilanı oluştur (sadece şirket)
  createJob: async (jobData) => {
    const response = await api.post('/jobs/create.php', jobData);
    return response.data;
  },

  // İş ilanını güncelle
  updateJob: async (jobData) => {
    const response = await api.put('/jobs/update.php', jobData);
    return response.data;
  },

  // İş ilanını sil
  deleteJob: async (id) => {
    const response = await api.delete(`/jobs/delete.php?id=${id}`);
    return response.data;
  },

  // Kategorileri getir
  getCategories: async () => {
    const response = await api.get('/categories/');
    return response.data;
  },

  // Şehirleri getir
  getCities: async () => {
    const response = await api.get('/locations/cities.php');
    return response.data;
  },

  // İlçeleri getir
  getDistricts: async (sehirId) => {
    const response = await api.get(`/locations/districts.php?sehir_id=${sehirId}`);
    return response.data;
  },
};
