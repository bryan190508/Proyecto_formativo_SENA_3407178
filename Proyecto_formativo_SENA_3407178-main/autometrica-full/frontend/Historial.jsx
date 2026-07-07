import React, { useEffect, useState } from "react";
import PanelLayout from "../components/PanelLayout";
import clientesService from "../services/clientesService";
import "./Clientes.css";

const vacio = { usuario_id: "", cedula: "", es_vip: false, notas: "" };

export default function Clientes() {
    const [clientes, setClientes] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [form, setForm] = useState(vacio);
    const [guardando, setGuardando] = useState(false);

    const cargarClientes = async () => {
        setCargando(true);
        setError(null);
        try {
            const data = await clientesService.getAll();
            setClientes(data);
        } catch (err) {
            console.error(err);
            setError("No se pudieron cargar los clientes. Verifica que el servidor esté corriendo.");
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        cargarClientes();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setGuardando(true);
        try {
            await clientesService.create({
                ...form,
                usuario_id: Number(form.usuario_id),
            });
            setForm(vacio);
            await cargarClientes();
            alert("Cliente guardado.");
        } catch (err) {
            console.error(err);
            alert("No se pudo guardar el cliente. Revisa que el ID de usuario exista.");
        } finally {
            setGuardando(false);
        }
    };

    return (
        <PanelLayout>
            <div className="page-header">
                <div className="page-header-text">
                    <p className="eyebrow">Panel de control</p>
                    <h1>Base de Clientes</h1>
                </div>
            </div>

            <img
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=280&fit=crop"
                alt="Atención al cliente"
                className="section-banner"
            />

            <div className="stats-row">
                <div className="stat-card">
                    <div className="stat-icon azul"><i className="fa-solid fa-users"></i></div>
                    <div><div className="stat-value">{clientes.length}</div><div className="stat-label">Total Clientes</div></div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon amarillo"><i className="fa-solid fa-star"></i></div>
                    <div><div className="stat-value">{clientes.filter((c) => c.es_vip).length}</div><div className="stat-label">Clientes VIP</div></div>
                </div>
            </div>

            {/* Registro */}
            <div className="card">
                <div className="card-header-row">
                    <div className="card-icon-box"><i className="fa-solid fa-user-plus"></i></div>
                    <div><h2>Registrar Cliente</h2><p>Asocia un cliente a un usuario ya registrado en el sistema.</p></div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label><i className="fa-solid fa-id-badge"></i> ID de Usuario</label>
                            <input type="number" name="usuario_id" value={form.usuario_id} onChange={handleChange} placeholder="Ej. 3" required />
                        </div>
                        <div className="form-group">
                            <label><i className="fa-solid fa-id-card"></i> Cédula</label>
                            <input type="text" name="cedula" value={form.cedula} onChange={handleChange} placeholder="Ej. 1023456789" />
                        </div>
                        <div className="form-group">
                            <label><i className="fa-solid fa-note-sticky"></i> Notas</label>
                            <input type="text" name="notas" value={form.notas} onChange={handleChange} placeholder="Notas adicionales (opcional)" />
                        </div>
                        <div className="form-group">
                            <label><input type="checkbox" name="es_vip" checked={form.es_vip} onChange={handleChange} style={{ width: "auto", marginRight: "8px" }} /> Cliente VIP</label>
                        </div>
                    </div>
                    <button className="btn-primary" type="submit" disabled={guardando}>
                        <i className="fa-solid fa-floppy-disk"></i> {guardando ? "Guardando..." : "Guardar Cliente"}
                    </button>
                </form>
            </div>

            {/* Tabla real desde la API */}
            <div className="card">
                <div className="card-header-row">
                    <div className="card-icon-box"><i className="fa-solid fa-list-ul"></i></div>
                    <div><h2>Clientes Registrados</h2><p>Listado de todos los clientes en el sistema.</p></div>
                </div>

                {cargando && <p>Cargando clientes...</p>}
                {error && <p style={{ color: "#DC2626" }}>{error}</p>}

                {!cargando && !error && (
                    <table>
                        <thead>
                            <tr><th>ID</th><th>Usuario ID</th><th>Cédula</th><th>VIP</th><th>Notas</th></tr>
                        </thead>
                        <tbody>
                            {clientes.map((c) => (
                                <tr key={c.id}>
                                    <td>{c.id}</td>
                                    <td>{c.usuario_id}</td>
                                    <td>{c.cedula || "—"}</td>
                                    <td>
                                        <span className={`badge ${c.es_vip ? "badge-activo" : "badge-finalizado"}`}>
                                            {c.es_vip ? "VIP" : "Regular"}
                                        </span>
                                    </td>
                                    <td>{c.notas || "—"}</td>
                                </tr>
                            ))}
                            {clientes.length === 0 && (
                                <tr><td colSpan="5">No hay clientes registrados todavía.</td></tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </PanelLayout>
    );
}
