import api from '../config/api';

export const applicationService = {
  // Apply for a job
  applyForJob: async (jobId, applicationData) => {
    const response = await api.post('/applications', {
      ilan_id: jobId,
      ...applicationData,
    });
    return response.data;
  },

  // Get user's applications
  getUserApplications: async () => {
    const response = await api.get('/applications/user');
    return response.data;
  },

  // Get application by ID
  getApplicationById: async (id) => {
    const response = await api.get(`/applications/${id}`);
    return response.data;
  },

  // Get applications for a job (company only)
  getJobApplications: async (jobId) => {
    const response = await api.get(`/applications/job/${jobId}`);
    return response.data;
  },

  // Update application status (company only)
  updateApplicationStatus: async (id, status, notes) => {
    const response = await api.put(`/applications/${id}/status`, { durum: status, notlar: notes });
    return response.data;
  },

  // Delete application
  deleteApplication: async (id) => {
    const response = await api.delete(`/applications/${id}`);
    return response.data;
  },
};
