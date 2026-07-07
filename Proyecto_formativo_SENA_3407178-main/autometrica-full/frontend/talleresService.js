import api from "./api";

const RESOURCE = "/mensajes";

const mensajesService = {
    getAll: async (params = {}) => {
        const { data } = await api.get(`${RESOURCE}/`, { params });
        return data;
    },

    getById: async (id) => {
        const { data } = await api.get(`${RESOURCE}/${id}`);
        return data;
    },

    create: async (payload) => {
        const { data } = await api.post(`${RESOURCE}/`, payload);
        return data;
    },

    update: async (id, cambios) => {
        const { data } = await api.put(`${RESOURCE}/${id}`, cambios);
        return data;
    },

    remove: async (id) => {
        await api.delete(`${RESOURCE}/${id}`);
    },
};

export default mensajesService;
