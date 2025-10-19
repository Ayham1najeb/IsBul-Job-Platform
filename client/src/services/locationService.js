/**
 * Lokasyon Servisi
 * Şehir ve ilçe bilgileri için API çağrıları
 */
import api from '../config/api';

export const locationService = {
  // Tüm şehirleri getir
  getCities: async () => {
    const response = await api.get('/locations/cities.php');
    return response.data;
  },

  // Şehre göre ilçeleri getir
  getDistricts: async (cityId) => {
    const response = await api.get(`/locations/districts.php?sehir_id=${cityId}`);
    return response.data;
  },
};
