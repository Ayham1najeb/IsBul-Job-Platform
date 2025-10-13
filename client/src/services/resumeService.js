/**
 * Özgeçmiş Servisi
 * Özgeçmiş yönetimi için API servisi
 */
import api from '../config/api';

export const resumeService = {
  // Tam özgeçmiş getir
  getFullResume: async () => {
    const response = await api.get('/resumes/get-full.php');
    return response.data;
  },

  // Ayarlar
  getSettings: async () => {
    const response = await api.get('/resumes/settings.php');
    return response.data;
  },

  saveSettings: async (settings) => {
    const response = await api.post('/resumes/settings.php', settings);
    return response.data;
  },

  // İş Deneyimleri
  getExperiences: async () => {
    const response = await api.get('/resumes/experience.php');
    return response.data;
  },

  addExperience: async (experience) => {
    const response = await api.post('/resumes/experience.php', experience);
    return response.data;
  },

  updateExperience: async (experience) => {
    const response = await api.put('/resumes/experience.php', experience);
    return response.data;
  },

  deleteExperience: async (id) => {
    const response = await api.delete(`/resumes/experience.php?id=${id}`);
    return response.data;
  },

  // Eğitim
  getEducation: async () => {
    const response = await api.get('/resumes/education.php');
    return response.data;
  },

  addEducation: async (education) => {
    const response = await api.post('/resumes/education.php', education);
    return response.data;
  },

  updateEducation: async (education) => {
    const response = await api.put('/resumes/education.php', education);
    return response.data;
  },

  deleteEducation: async (id) => {
    const response = await api.delete(`/resumes/education.php?id=${id}`);
    return response.data;
  },

  // Beceriler
  getSkills: async () => {
    const response = await api.get('/resumes/skills.php');
    return response.data;
  },

  addSkill: async (skill) => {
    const response = await api.post('/resumes/skills.php', skill);
    return response.data;
  },

  updateSkill: async (skill) => {
    const response = await api.put('/resumes/skills.php', skill);
    return response.data;
  },

  deleteSkill: async (id) => {
    const response = await api.delete(`/resumes/skills.php?id=${id}`);
    return response.data;
  },

  // Diller
  getLanguages: async () => {
    const response = await api.get('/resumes/languages.php');
    return response.data;
  },

  addLanguage: async (language) => {
    const response = await api.post('/resumes/languages.php', language);
    return response.data;
  },

  updateLanguage: async (language) => {
    const response = await api.put('/resumes/languages.php', language);
    return response.data;
  },

  deleteLanguage: async (id) => {
    const response = await api.delete(`/resumes/languages.php?id=${id}`);
    return response.data;
  },

  // Sertifikalar
  getCertificates: async () => {
    const response = await api.get('/resumes/certificates.php');
    return response.data;
  },

  addCertificate: async (certificate) => {
    const response = await api.post('/resumes/certificates.php', certificate);
    return response.data;
  },

  updateCertificate: async (certificate) => {
    const response = await api.put('/resumes/certificates.php', certificate);
    return response.data;
  },

  deleteCertificate: async (id) => {
    const response = await api.delete(`/resumes/certificates.php?id=${id}`);
    return response.data;
  },
};
