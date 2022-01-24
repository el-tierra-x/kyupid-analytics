import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: 'https://kyupid-api.vercel.app/api',
});


export const getGeoJsonDataApi = () => {
  return axiosInstance.get('/areas');
}

export const getAllUsersDataApi = () => {
  return axiosInstance.get('/users');
}
