import api from '../config/api';

export const companyService = {
  // Get all companies
  getAllCompanies: async (filters = {}) => {
    const response = await api.get('/companies', { params: filters });
    return response.data;
  },

  // Get company by ID
  getCompanyById: async (id) => {
    const response = await api.get(`/companies/${id}`);
    return response.data;
  },

  // Create company profile
  createCompany: async (companyData) => {
    const response = await api.post('/companies', companyData);
    return response.data;
  },

  // Update company profile
  updateCompany: async (id, companyData) => {
    const response = await api.put(`/companies/${id}`, companyData);
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
