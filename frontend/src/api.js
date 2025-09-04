import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // match your backend port
});

export const getVehicleTypes = async (wheels) => {
  const { data } = await api.get(`/types?wheels=${wheels}`);
  return data;
};

export const getVehicleModels = async (typeId) => {
  const { data } = await api.get(`/vehicles?typeId=${typeId}`);
  return data;
};

export const submitBooking = async (formData) => {
  const { data } = await api.post("/bookings", formData);
  return data;
};

export default api;
