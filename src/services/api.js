import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/profile"
});

export const getFullProfile = (id) =>
  API.get(`/full/${id}`);
