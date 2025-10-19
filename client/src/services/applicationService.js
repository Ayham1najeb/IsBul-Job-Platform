/**
 * Başvuru Servisi
 * Başvurular ile ilgili tüm API çağrıları
 */
import api from '../config/api';

export const applicationService = {
  // İlana başvuru yap
  applyForJob: async (applicationData) => {
    const response = await api.post('/applications/create.php', applicationData);
    return response.data;
  },

  // Kullanıcının başvurularını getir
  getUserApplications: async () => {
    const response = await api.get('/applications/user.php');
    return response.data;
  },

  // İlana yapılan başvuruları getir (Şirket için)
  getJobApplications: async (ilanId) => {
    const response = await api.get(`/applications/job.php?ilan_id=${ilanId}`);
    return response.data;
  },

  // Şirketin tüm başvurularını getir
  getCompanyApplications: async () => {
    const response = await api.get('/applications/company.php');
    return response.data;
  },

  // Başvuru durumunu güncelle (Şirket için)
  updateApplicationStatus: async (id, durum) => {
    const response = await api.put('/applications/update-status.php', { id, durum });
    return response.data;
  },

  // Başvuruyu iptal et
  cancelApplication: async (id) => {
    // TODO: Cancel endpoint eklenecek
    return { success: true };
  },
};
