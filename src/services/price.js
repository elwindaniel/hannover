import axiosInstance from './axios';

export const getAllPriceGroups = () => axiosInstance.get('/price-group');
export const createPriceGroup = (data) => axiosInstance.post('/price-group', data);
export const updatePriceGroup = (id, data) => axiosInstance.put(`/price-group/${id}`, data);
export const deletePriceGroup = (id) => axiosInstance.delete(`/price-group/${id}`);
