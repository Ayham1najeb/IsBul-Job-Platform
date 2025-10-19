/**
 * Kategori Servisi
 * Kategori bilgileri için API çağrıları
 */
import api from '../config/api';

export const categoryService = {
  // Tüm kategorileri getir
  getCategories: async () => {
    const response = await api.get('/categories/');
    return response.data;
  },
};
