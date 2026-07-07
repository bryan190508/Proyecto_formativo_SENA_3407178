import axios from "axios";

// Cambia esta URL si despliegas el backend en otro host/puerto
const BASE_URL = "http://127.0.0.1:8000/api/v1";

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
