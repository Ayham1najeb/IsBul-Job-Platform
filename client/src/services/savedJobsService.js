/**
 * Kayıtlı İşler Servisi
 * Kayıtlı iş ilanları işlemleri
 */
import api from '../config/api';

export const savedJobsService = {
  // Kayıtlı işleri getir
  getSavedJobs: async () => {
    const response = await api.get('/saved-jobs/');
    return response.data;
  },

  // İşi kaydet
  saveJob: async (jobId) => {
    const response = await api.post('/saved-jobs/save.php', { ilan_id: jobId });
    return response.data;
  },

  // Kayıttan çıkar
  unsaveJob: async (jobId) => {
    const response = await api.delete(`/saved-jobs/remove.php?ilan_id=${jobId}`);
    return response.data;
  },

  // İş kaydedilmiş mi kontrol et
  isJobSaved: async (jobId) => {
    const response = await api.get(`/saved-jobs/check.php?ilan_id=${jobId}`);
    return response.data;
  },
};
