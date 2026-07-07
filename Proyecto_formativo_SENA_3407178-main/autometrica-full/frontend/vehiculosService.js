import api from "./api";

const RESOURCE = "/reportes-ingresos";

const reportesIngresosService = {
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

    getByTallerPeriodo: async (tallerId, anio, mes) => {
        const { data } = await api.get(`${RESOURCE}/taller/${tallerId}/periodo/${anio}/${mes}`);
        return data;
    },
};

export default reportesIngresosService;
