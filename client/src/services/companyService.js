/**
 * Şirket Servisi
 * Şirketler ile ilgili tüm API çağrıları
 */
import api from '../config/api';

export const companyService = {
  // Tüm şirketleri getir
  getAllCompanies: async (filters = {}) => {
    const response = await api.get('/companies/', { params: filters });
    return response.data;
  },

  // ID'ye göre şirket getir
  getCompanyById: async (id) => {
    const response = await api.get(`/companies/detail.php?id=${id}`);
    return response.data;
  },

  // Kendi şirket bilgilerini getir
  getMyCompany: async () => {
    const response = await api.get('/companies/my-company.php');
    return response.data;
  },

  // Şirket profili oluştur veya güncelle
  createOrUpdateCompany: async (companyData) => {
    const response = await api.post('/companies/create-or-update.php', companyData);
    return response.data;
  },

  // Şirket profili oluştur
  createCompany: async (companyData) => {
    const response = await api.post('/companies/create.php', companyData);
    return response.data;
  },

  // Şirket profili güncelle
  updateCompany: async (companyData) => {
    const response = await api.put('/companies/update.php', companyData);
    return response.data;
  },

  // Delete company
  deleteCompany: async (id) => {
    const response = await api.delete(`/companies/${id}`);
    return response.data;
  },

  // Upload company logo
  uploadLogo: async (id, file) => {
    const formData = new FormData();
    formData.append('logo', file);
    const response = await api.post(`/companies/${id}/logo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Follow company
  followCompany: async (companyId) => {
    const response = await api.post(`/companies/${companyId}/follow`);
    return response.data;
  },

  // Unfollow company
  unfollowCompany: async (companyId) => {
    const response = await api.delete(`/companies/${companyId}/follow`);
    return response.data;
  },

  // Get company ratings
  getCompanyRatings: async (companyId) => {
    const response = await api.get(`/ratings/company/${companyId}`);
    return response.data;
  },
};
