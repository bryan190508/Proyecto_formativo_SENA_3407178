import React, { useEffect, useState } from "react";
import PanelLayout from "../components/PanelLayout";
import vehiculosService from "../services/vehiculosService";
import "./GestionVehiculos.css";

const estadoBadge = {
    en_taller: { clase: "badge-reparacion", texto: "En Taller" },
    retrasado: { clase: "badge-retrasado", texto: "Retrasado" },
    finalizado: { clase: "badge-finalizado", texto: "Finalizado" },
    activo: { clase: "badge-activo", texto: "Activo" },
};

const vacio = {
    placa: "",
    marca: "",
    modelo: "",
    anio: "",
    color: "",
    kilometraje_actual: "",
    tipo: "carro",
    cliente_id: "",
};

export default function GestionVehiculos() {
    const [vehiculos, setVehiculos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [form, setForm] = useState(vacio);
    const [guardando, setGuardando] = useState(false);

    const cargarVehiculos = async () => {
        setCargando(true);
        setError(null);
        try {
            const data = await vehiculosService.getAll();
            setVehiculos(data);
        } catch (err) {
            console.error(err);
            setError("No se pudieron cargar los vehículos. Verifica que el servidor esté corriendo.");
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        cargarVehiculos();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setGuardando(true);
        try {
            await vehiculosService.create({
                ...form,
                anio: Number(form.anio),
                kilometraje_actual: Number(form.kilometraje_actual),
                cliente_id: Number(form.cliente_id),
            });
            setForm(vacio);
            await cargarVehiculos();
            alert("Vehículo guardado.");
        } catch (err) {
            console.error(err);
            alert("No se pudo guardar el vehículo. Revisa los datos e intenta de nuevo.");
        } finally {
            setGuardando(false);
        }
    };

    const total = vehiculos.length;
    const activos = vehiculos.filter((v) => v.activo).length;

    return (
        <PanelLayout>
            <div className="page-header">
                <div className="page-header-text">
                    <p className="eyebrow">Panel de control</p>
                    <h1>Gestión de Vehículos</h1>
                </div>
            </div>

            <img
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&h=300&fit=crop"
                alt="Vehículos"
                className="section-banner"
            />

            <div className="stats-row">
                <div className="stat-card">
                    <div className="stat-icon azul"><i className="fa-solid fa-car"></i></div>
                    <div><div className="stat-value">{total}</div><div className="stat-label">Total Vehículos</div></div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon verde"><i className="fa-solid fa-check-circle"></i></div>
                    <div><div className="stat-value">{activos}</div><div className="stat-label">Activos</div></div>
                </div>
            </div>

            {/* Registro */}
            <div className="card">
                <div className="card-header-row">
                    <div className="card-icon-box"><i className="fa-solid fa-car-side"></i></div>
                    <div><h2>Registro de Vehículo</h2><p>Completa los datos y guarda el vehículo en el sistema.</p></div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label><i className="fa-solid fa-hashtag"></i> Placa</label>
                            <input type="text" name="placa" value={form.placa} onChange={handleChange} placeholder="Ej. ABC-123" required />
                        </div>
                        <div className="form-group">
                            <label><i className="fa-solid fa-car"></i> Marca</label>
                            <input type="text" name="marca" value={form.marca} onChange={handleChange} placeholder="Ej. Mazda" required />
                        </div>
                        <div className="form-group">
                            <label><i className="fa-solid fa-tag"></i> Modelo</label>
                            <input type="text" name="modelo" value={form.modelo} onChange={handleChange} placeholder="Ej. Mazda 3" required />
                        </div>
                        <div className="form-group">
                            <label><i className="fa-solid fa-calendar"></i> Año</label>
                            <input type="number" name="anio" value={form.anio} onChange={handleChange} placeholder="Ej. 2022" required />
                        </div>
                        <div className="form-group">
                            <label><i className="fa-solid fa-palette"></i> Color</label>
                            <input type="text" name="color" value={form.color} onChange={handleChange} placeholder="Ej. Blanco" />
                        </div>
                        <div className="form-group">
                            <label><i className="fa-solid fa-gauge-high"></i> Kilometraje</label>
                            <input type="number" name="kilometraje_actual" value={form.kilometraje_actual} onChange={handleChange} placeholder="Ej. 45000" />
                        </div>
                        <div className="form-group">
                            <label><i className="fa-solid fa-id-card"></i> ID del Cliente</label>
                            <input type="number" name="cliente_id" value={form.cliente_id} onChange={handleChange} placeholder="Ej. 1" required />
                        </div>
                        <div className="form-group">
                            <label><i className="fa-solid fa-truck-pickup"></i> Tipo</label>
                            <select name="tipo" value={form.tipo} onChange={handleChange}>
                                <option value="carro">Carro</option>
                                <option value="camion">Camión</option>
                            </select>
                        </div>
                    </div>
                    <button className="btn-primary" type="submit" disabled={guardando}>
                        <i className="fa-solid fa-floppy-disk"></i> {guardando ? "Guardando..." : "Guardar Vehículo"}
                    </button>
                </form>
            </div>

            {/* Tabla real desde la API */}
            <div className="card">
                <div className="card-header-row">
                    <div className="card-icon-box"><i className="fa-solid fa-list-ul"></i></div>
                    <div><h2>Todos los Vehículos Registrados</h2><p>Listado completo del sistema.</p></div>
                </div>

                {cargando && <p>Cargando vehículos...</p>}
                {error && <p style={{ color: "#DC2626" }}>{error}</p>}

                {!cargando && !error && (
                    <table>
                        <thead>
                            <tr>
                                <th>Placa</th>
                                <th>Marca</th>
                                <th>Modelo</th>
                                <th>Año</th>
                                <th>Kilometraje</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vehiculos.map((v) => (
                                <tr key={v.id}>
                                    <td>{v.placa}</td>
                                    <td>{v.marca}</td>
                                    <td>{v.modelo}</td>
                                    <td>{v.anio}</td>
                                    <td>{v.kilometraje_actual?.toLocaleString("es-CO")} km</td>
                                    <td>
                                        <span className={`badge ${v.activo ? "badge-activo" : "badge-retrasado"}`}>
                                            {v.activo ? "Activo" : "Inactivo"}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {vehiculos.length === 0 && (
                                <tr><td colSpan="6">No hay vehículos registrados todavía.</td></tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </PanelLayout>
    );
}
