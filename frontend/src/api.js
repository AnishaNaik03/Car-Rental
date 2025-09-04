import axios from "axios";

// Create axios instance with base URL
const api = axios.create({
  baseURL: "http://localhost:5000/api", // backend base path
});

// ---------------------- Vehicle Types ----------------------
export const getVehicleTypes = async (wheels) => {
  const { data } = await api.get(`/types?wheels=${wheels}`);
  return data;
};

// ---------------------- Vehicle Models ----------------------
export const getVehicleModels = async (typeId) => {
  const { data } = await api.get(`/vehicles?typeId=${typeId}`);
  return data;
};

// ---------------------- Bookings ----------------------
export const submitBooking = async (bookingData) => {
  const { data } = await api.post("/bookings", bookingData);
  return data;
};

// export const getBookings = async () => {
//   const { data } = await api.get("/bookings");
//   return data;
// };

export default api;
