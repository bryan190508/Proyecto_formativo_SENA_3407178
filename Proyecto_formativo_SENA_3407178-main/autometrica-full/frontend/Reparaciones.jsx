import React, { useState } from "react";
import SidebarCliente from "../components/SidebarCliente";
import "./PortalCliente.css";

const vehiculosIniciales = [
    {
        id: "mazda",
        nombre: "Mazda 3", placa: "ABC-123", anio: "2019", color: "Plateado",
        marca: "Mazda", modelo: "3", combustible: "Gasolina", km: "44.820 km",
        estado: '<span class="status-pill status-proceso">En Servicio</span>',
        servicio: "Cambio de discos y pastillas delanteras — En proceso",
        tipo: "carro", icono: "fa-car-side"
    },
    {
        id: "hilux",
        nombre: "Toyota Hilux", placa: "XYZ-456", anio: "2021", color: "Blanco",
        marca: "Toyota", modelo: "Hilux", combustible: "Diésel", km: "61.200 km",
        estado: '<span class="status-pill status-exito">Entregado</span>',
        servicio: "Mantenimiento general 30.000 km — Finalizado",
        tipo: "camion", icono: "fa-truck"
    }
];

const formAgregarVacio = { nombre: "", placa: "", anio: "", color: "" };

export default function PortalCliente() {
    const [seccion, setSeccion] = useState("inicio");
    const [vehiculos, setVehiculos] = useState(vehiculosIniciales);
    const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState(null);

    const [modalAgregarAbierto, setModalAgregarAbierto] = useState(false);
    const [tipoAgregar, setTipoAgregar] = useState("carro");
    const [formAgregar, setFormAgregar] = useState(formAgregarVacio);
    const [errorAgregar, setErrorAgregar] = useState(null);

    const confirmarAgregarVehiculo = () => {
        const { nombre, placa, anio, color } = formAgregar;

        if (!nombre.trim() || !placa.trim() || !anio.trim() || !color.trim()) {
            setErrorAgregar("Por favor completa todos los campos.");
            return;
        }
        setErrorAgregar(null);

        const icono = tipoAgregar === "carro" ? "fa-car-side" : "fa-truck";
        const partes = nombre.trim().split(" ");

        const nuevoVehiculo = {
            id: "v_" + Date.now(),
            nombre: nombre.trim(),
            placa: placa.trim().toUpperCase(),
            anio: anio.trim(),
            color: color.trim(),
            tipo: tipoAgregar,
            icono,
            marca: partes[0],
            modelo: partes.slice(1).join(" ") || nombre.trim(),
            combustible: "—",
            km: "0 km",
            estado: '<span class="status-pill" style="background:#e2e8f0;color:#475569;">Registrado</span>',
            servicio: "Sin servicio activo",
        };

        setVehiculos((prev) => [...prev, nuevoVehiculo]);
        setFormAgregar(formAgregarVacio);
        setTipoAgregar("carro");
        setModalAgregarAbierto(false);
    };

    return (
<div className="layout-cliente">

    {/* SIDEBAR */}
    <SidebarCliente seccion={seccion} setSeccion={setSeccion} />

    {/* CONTENIDO PRINCIPAL */}
    <main className="contenido-cliente">

        {/* ===== SECCIÓN: INICIO (ORIGINAL) ===== */}
        {seccion === "inicio" && (
        <div id="seccion-inicio">
        <nav className="portal-nav">
            <div className="nav-user-info">
                <span>Vehículo: <strong>Mazda 3 (ABC-123)</strong></span>
            </div>
        </nav>

        <div className="portal-content">
            <div className="portal-header-box">
                <h2>Seguimiento de tu Servicio en Tiempo Real</h2>
                <p>Consulta las evidencias de tu reparación con transparencia y honestidad garantizada.</p>
            </div>

            <div className="card linea-tiempo-card">
                <div className="timeline">
                    <div className="timeline-step completed">
                        <div className="step-icon"><i className="fa-solid fa-car-side"></i></div>
                        <span>Recibido</span>
                    </div>
                    <div className="timeline-step completed">
                        <div className="step-icon"><i className="fa-solid fa-magnifying-glass-wrench"></i></div>
                        <span>En Diagnóstico</span>
                    </div>
                    <div className="timeline-step active">
                        <div className="step-icon"><i className="fa-solid fa-gears"></i></div>
                        <span>En Reparación</span>
                    </div>
                    <div className="timeline-step">
                        <div className="step-icon"><i className="fa-solid fa-flag-checkered"></i></div>
                        <span>Finalizado</span>
                    </div>
                </div>
            </div>

            <div className="portal-grid-detalles">
                <div className="card">
                    <h3><i className="fa-solid fa-clipboard-list text-electrico"></i> Resumen Técnico del Taller</h3>
                    <div className="detalle-item">
                        <strong>Diagnóstico reportado por el mecánico:</strong>
                        <p>Vibración severa detectada en el eje delantero durante pruebas de frenado. Los discos presentan deformaciones físicas por fatiga térmica.</p>
                    </div>
                </div>

                <div className="card">
                    <h3><i className="fa-solid fa-hand-holding-dollar text-exito"></i> Costos y Justificación de Repuestos</h3>
                    <div className="tabla-piezas-cliente">
                        <div className="tabla-header-p">
                            <span>Pieza / Acción</span>
                            <span>Motivo Técnico</span>
                            <span>Valor</span>
                        </div>
                        <div className="tabla-row-p">
                            <td><strong>Discos Delanteros</strong></td>
                            <td>Superficie deformada, compromete frenado seguro.</td>
                            <td><strong className="text-pizarra">$240.000 COP</strong></td>
                        </div>
                    </div>
                    <div className="total-box">
                        <span>Total Neto Estimado:</span>
                        <span className="monto-total">$240.000 COP</span>
                    </div>
                </div>
            </div>
        </div>
        </div>
        )}

        {/* ===== SECCIÓN: MIS VEHÍCULOS ===== */}
        {seccion === "mis-vehiculos" && (
        <div className="seccion-contenido" id="seccion-mis-vehiculos">
            <div className="seccion-header-cliente">
                <h2><i className="fa-solid fa-car text-electrico"></i> Mis Vehículos</h2>
                <p>Todos los vehículos registrados en tu cuenta.</p>
            </div>

            <div className="grid-vehiculos-cliente">
                {vehiculos.map((v) => (
                    <div
                        key={v.id}
                        className="card-vehiculo-cliente card-vehiculo-hover"
                        onClick={() => setVehiculoSeleccionado(v)}
                    >
                        <div className="vehiculo-icono">
                            <i className={`fa-solid ${v.icono}`}></i>
                        </div>
                        <div className="vehiculo-info">
                            <h3>{v.nombre}</h3>
                            <div className="vehiculo-detalle"><span className="etiqueta">Placa</span><span>{v.placa}</span></div>
                            <div className="vehiculo-detalle"><span className="etiqueta">Año</span><span>{v.anio}</span></div>
                            <div className="vehiculo-detalle"><span className="etiqueta">Color</span><span>{v.color}</span></div>
                            <div className="vehiculo-detalle">
                                <span className="etiqueta">Estado</span>
                                <span dangerouslySetInnerHTML={{ __html: v.estado }}></span>
                            </div>
                        </div>
                        <div className="vehiculo-hover-tip"><i className="fa-solid fa-circle-info"></i> Ver detalles</div>
                    </div>
                ))}

                <div className="card-vehiculo-cliente card-agregar-vehiculo" onClick={() => setModalAgregarAbierto(true)}>
                    <i className="fa-solid fa-plus-circle"></i>
                    <p>Agregar vehículo</p>
                </div>
            </div>
        </div>
        )}

        {/* MODAL AGREGAR VEHÍCULO */}
        {modalAgregarAbierto && (
        <div id="modal-agregar" className="modal-vehiculo-overlay" onClick={(e) => { if (e.target.id === "modal-agregar") setModalAgregarAbierto(false); }}>
            <div className="modal-vehiculo-box">
                <button className="modal-cerrar" onClick={() => setModalAgregarAbierto(false)}><i className="fa-solid fa-xmark"></i></button>

                <div className="modal-vehiculo-header">
                    <div className="modal-vehiculo-icono" id="agregar-icono-preview">
                        <i className={`fa-solid ${tipoAgregar === "carro" ? "fa-car-side" : "fa-truck"}`}></i>
                    </div>
                    <div>
                        <h2>Agregar Vehículo</h2>
                        <span className="modal-tipo-badge">Nuevo registro</span>
                    </div>
                </div>

                <div className="modal-tipo-selector">
                    <p className="modal-label-tipo">Tipo de vehículo:</p>
                    <div className="modal-tipo-botones">
                        <button className={`modal-tipo-btn ${tipoAgregar === "carro" ? "activo-tipo" : ""}`} id="agregar-btn-carro" onClick={() => setTipoAgregar("carro")}>
                            <i className="fa-solid fa-car-side"></i> Carro
                        </button>
                        <button className={`modal-tipo-btn ${tipoAgregar === "camion" ? "activo-tipo" : ""}`} id="agregar-btn-camion" onClick={() => setTipoAgregar("camion")}>
                            <i className="fa-solid fa-truck"></i> Camión / Camioneta
                        </button>
                    </div>
                </div>

                <div className="panel-form" style={{marginTop: '4px'}}>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Nombre / Modelo</label>
                            <input type="text" id="agregar-nombre" placeholder="Ej. Mazda 3" value={formAgregar.nombre} onChange={(e) => setFormAgregar((p) => ({ ...p, nombre: e.target.value }))} />
                        </div>
                        <div className="form-group">
                            <label>Placa</label>
                            <input type="text" id="agregar-placa" placeholder="Ej. ABC-123" style={{textTransform: 'uppercase'}} value={formAgregar.placa} onChange={(e) => setFormAgregar((p) => ({ ...p, placa: e.target.value.toUpperCase() }))} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Año</label>
                            <input type="number" id="agregar-anio" placeholder="Ej. 2021" min="1990" max="2026" value={formAgregar.anio} onChange={(e) => setFormAgregar((p) => ({ ...p, anio: e.target.value }))} />
                        </div>
                        <div className="form-group">
                            <label>Color</label>
                            <input type="text" id="agregar-color" placeholder="Ej. Blanco" value={formAgregar.color} onChange={(e) => setFormAgregar((p) => ({ ...p, color: e.target.value }))} />
                        </div>
                    </div>
                    {errorAgregar && (<div id="agregar-error" style={{color: '#dc2626', fontSize: '13px', marginTop: '4px'}}>{errorAgregar}</div>)}
                    <button className="btn btn-electrico btn-block" onClick={confirmarAgregarVehiculo}>
                        <i className="fa-solid fa-plus"></i> Agregar Vehículo
                    </button>
                </div>
            </div>
        </div>
        )}

        {/* MODAL VEHÍCULO */}
        {vehiculoSeleccionado && (
        <div id="modal-vehiculo" className="modal-vehiculo-overlay" onClick={(e) => { if (e.target.id === "modal-vehiculo") setVehiculoSeleccionado(null); }}>
            <div className="modal-vehiculo-box">
                <button className="modal-cerrar" onClick={() => setVehiculoSeleccionado(null)}><i className="fa-solid fa-xmark"></i></button>

                <div className="modal-vehiculo-header" id="modal-header">
                    <div className="modal-vehiculo-icono" id="modal-icono"><i className={`fa-solid ${vehiculoSeleccionado?.icono}`}></i></div>
                    <div>
                        <h2 id="modal-nombre">{vehiculoSeleccionado?.nombre}</h2>
                        <span id="modal-tipo-badge" className="modal-tipo-badge">{vehiculoSeleccionado?.tipo === "carro" ? "🚗 Automóvil" : "🚛 Camión / Camioneta"}</span>
                    </div>
                </div>

                <div className="modal-tipo-selector">
                    <p className="modal-label-tipo">Tipo de vehículo:</p>
                    <div id="modal-tipo-display" className="modal-tipo-display">
                        {vehiculoSeleccionado?.tipo === "carro" ? (
                            <div className="modal-tipo-readonly carro"><i className="fa-solid fa-car-side"></i> Carro / Automóvil</div>
                        ) : (
                            <div className="modal-tipo-readonly camion"><i className="fa-solid fa-truck"></i> Camión / Camioneta</div>
                        )}
                    </div>
                </div>

                <div className="modal-vehiculo-grid">
                    <div className="modal-dato"><span className="modal-etiqueta">Placa</span><span id="modal-placa">{vehiculoSeleccionado?.placa}</span></div>
                    <div className="modal-dato"><span className="modal-etiqueta">Año</span><span id="modal-anio">{vehiculoSeleccionado?.anio}</span></div>
                    <div className="modal-dato"><span className="modal-etiqueta">Color</span><span id="modal-color">{vehiculoSeleccionado?.color}</span></div>
                    <div className="modal-dato"><span className="modal-etiqueta">Marca</span><span id="modal-marca">{vehiculoSeleccionado?.marca}</span></div>
                    <div className="modal-dato"><span className="modal-etiqueta">Modelo</span><span id="modal-modelo">{vehiculoSeleccionado?.modelo}</span></div>
                    <div className="modal-dato"><span className="modal-etiqueta">Combustible</span><span id="modal-combustible">{vehiculoSeleccionado?.combustible}</span></div>
                    <div className="modal-dato"><span className="modal-etiqueta">Kilometraje</span><span id="modal-km">{vehiculoSeleccionado?.km}</span></div>
                    <div className="modal-dato"><span className="modal-etiqueta">Estado</span><span id="modal-estado">{vehiculoSeleccionado?.estado}</span></div>
                </div>

                <div className="modal-servicio-actual">
                    <p className="modal-label-tipo">Servicio actual:</p>
                    <p id="modal-servicio" className="modal-servicio-texto">{vehiculoSeleccionado?.servicio}</p>
                </div>
            </div>
        </div>
        )}

        {/* ===== SECCIÓN: MIS ÓRDENES ===== */}
        {seccion === "mis-ordenes" && (
        <div className="seccion-contenido" id="seccion-mis-ordenes">
            <div className="seccion-header-cliente">
                <h2><i className="fa-solid fa-clipboard-list text-electrico"></i> Mis Órdenes</h2>
                <p>Seguimiento de todas tus órdenes de servicio.</p>
            </div>

            <div className="tabla-ordenes-cliente">
                <div className="tabla-ordenes-header">
                    <span>N° Orden</span>
                    <span>Vehículo</span>
                    <span>Servicio</span>
                    <span>Fecha</span>
                    <span>Estado</span>
                </div>
                <div className="tabla-ordenes-row">
                    <span className="orden-numero">#ORD-001</span>
                    <span>Mazda 3 — ABC-123</span>
                    <span>Cambio de discos y pastillas</span>
                    <span>12/06/2025</span>
                    <span><span className="status-pill status-proceso">En Proceso</span></span>
                </div>
                <div className="tabla-ordenes-row">
                    <span className="orden-numero">#ORD-002</span>
                    <span>Toyota Hilux — XYZ-456</span>
                    <span>Mantenimiento general 30.000 km</span>
                    <span>03/04/2025</span>
                    <span><span className="status-pill status-exito">Finalizado</span></span>
                </div>
                <div className="tabla-ordenes-row">
                    <span className="orden-numero">#ORD-003</span>
                    <span>Mazda 3 — ABC-123</span>
                    <span>Diagnóstico sistema eléctrico</span>
                    <span>18/01/2025</span>
                    <span><span className="status-pill status-exito">Finalizado</span></span>
                </div>
            </div>
        </div>
        )}

        {/* ===== SECCIÓN: HISTORIAL ===== */}
        {seccion === "historial" && (
        <div className="seccion-contenido" id="seccion-historial">
            <div className="seccion-header-cliente">
                <h2><i className="fa-solid fa-screwdriver-wrench text-electrico"></i> Historial de Servicios</h2>
                <p>Registro completo de todos los servicios realizados a tus vehículos.</p>
            </div>

            <div className="historial-lista">
                <div className="historial-item">
                    <div className="historial-icono completado">
                        <i className="fa-solid fa-check"></i>
                    </div>
                    <div className="historial-cuerpo">
                        <div className="historial-top">
                            <strong>Cambio de discos y pastillas delanteras</strong>
                            <span className="status-pill status-proceso">En Proceso</span>
                        </div>
                        <p className="historial-meta"><i className="fa-solid fa-car-side"></i> Mazda 3 — ABC-123 &nbsp;|&nbsp; <i className="fa-regular fa-calendar"></i> 12/06/2025</p>
                        <p className="historial-desc">Discos delanteros deformados por fatiga térmica. Se reemplazaron discos y pastillas. Costo: <strong>$240.000 COP</strong></p>
                    </div>
                </div>

                <div className="historial-item">
                    <div className="historial-icono completado">
                        <i className="fa-solid fa-check"></i>
                    </div>
                    <div className="historial-cuerpo">
                        <div className="historial-top">
                            <strong>Mantenimiento general 30.000 km</strong>
                            <span className="status-pill status-exito">Finalizado</span>
                        </div>
                        <p className="historial-meta"><i className="fa-solid fa-truck"></i> Toyota Hilux — XYZ-456 &nbsp;|&nbsp; <i className="fa-regular fa-calendar"></i> 03/04/2025</p>
                        <p className="historial-desc">Cambio de aceite, filtros, revisión de frenos y suspensión. Costo: <strong>$380.000 COP</strong></p>
                    </div>
                </div>

                <div className="historial-item">
                    <div className="historial-icono completado">
                        <i className="fa-solid fa-check"></i>
                    </div>
                    <div className="historial-cuerpo">
                        <div className="historial-top">
                            <strong>Diagnóstico sistema eléctrico</strong>
                            <span className="status-pill status-exito">Finalizado</span>
                        </div>
                        <p className="historial-meta"><i className="fa-solid fa-car-side"></i> Mazda 3 — ABC-123 &nbsp;|&nbsp; <i className="fa-regular fa-calendar"></i> 18/01/2025</p>
                        <p className="historial-desc">Diagnóstico completo del sistema eléctrico. Se detectó y reparó falla en el alternador. Costo: <strong>$150.000 COP</strong></p>
                    </div>
                </div>
            </div>
        </div>
        )}

        {/* ===== SECCIÓN: COSTOS ===== */}
        {seccion === "costos" && (
        <div className="seccion-contenido" id="seccion-costos">
            <div className="seccion-header-cliente">
                <h2><i className="fa-solid fa-money-bill-wave text-electrico"></i> Costos</h2>
                <p>Resumen de todos los gastos asociados a tus vehículos.</p>
            </div>

            <div className="costos-resumen-grid">
                <div className="card costos-stat-card">
                    <div className="costos-stat-icono" style={{background: '#e0f2fe', color: '#0284C7'}}>
                        <i className="fa-solid fa-receipt"></i>
                    </div>
                    <div>
                        <p className="costos-stat-label">Total Gastado</p>
                        <p className="costos-stat-valor">$770.000 COP</p>
                    </div>
                </div>
                <div className="card costos-stat-card">
                    <div className="costos-stat-icono" style={{background: '#dcfce7', color: '#16A34A'}}>
                        <i className="fa-solid fa-check-double"></i>
                    </div>
                    <div>
                        <p className="costos-stat-label">Servicios Pagados</p>
                        <p className="costos-stat-valor">2 servicios</p>
                    </div>
                </div>
                <div className="card costos-stat-card">
                    <div className="costos-stat-icono" style={{background: '#fef9c3', color: '#854d0e'}}>
                        <i className="fa-solid fa-clock"></i>
                    </div>
                    <div>
                        <p className="costos-stat-label">Pendiente de Pago</p>
                        <p className="costos-stat-valor">$240.000 COP</p>
                    </div>
                </div>
            </div>

            <div className="tabla-ordenes-cliente" style={{marginTop: '28px'}}>
                <div className="tabla-costos-header">
                    <span>Servicio</span>
                    <span>Vehículo</span>
                    <span>Fecha</span>
                    <span>Monto</span>
                    <span>Estado Pago</span>
                </div>
                <div className="tabla-costos-row">
                    <span>Cambio de discos y pastillas</span>
                    <span>Mazda 3 — ABC-123</span>
                    <span>12/06/2025</span>
                    <span className="costo-monto">$240.000</span>
                    <span><span className="status-pill status-proceso">Pendiente</span></span>
                </div>
                <div className="tabla-costos-row">
                    <span>Mantenimiento general 30.000 km</span>
                    <span>Toyota Hilux — XYZ-456</span>
                    <span>03/04/2025</span>
                    <span className="costo-monto">$380.000</span>
                    <span><span className="status-pill status-exito">Pagado</span></span>
                </div>
                <div className="tabla-costos-row">
                    <span>Diagnóstico sistema eléctrico</span>
                    <span>Mazda 3 — ABC-123</span>
                    <span>18/01/2025</span>
                    <span className="costo-monto">$150.000</span>
                    <span><span className="status-pill status-exito">Pagado</span></span>
                </div>
                <div className="tabla-costos-total">
                    <span colSpan={3}>Total Acumulado</span>
                    <span className="costo-monto-total">$770.000 COP</span>
                    <span></span>
                </div>
            </div>
        </div>
        )}

        {/* ===== SECCIÓN: PRÓXIMOS SERVICIOS ===== */}
        {seccion === "proximos-servicios" && (
        <div className="seccion-contenido" id="seccion-proximos-servicios">
            <div className="seccion-header-cliente">
                <h2><i className="fa-solid fa-calendar-check text-electrico"></i> Próximos Servicios</h2>
                <p>Mantenimientos y revisiones programadas para tus vehículos.</p>
            </div>

            <div className="proximos-lista">
                <div className="proximo-card urgente proximo-card-hover">
                    <div className="proximo-fecha-bloque">
                        <span className="proximo-mes">JUL</span>
                        <span className="proximo-dia">15</span>
                        <span className="proximo-anio">2025</span>
                    </div>
                    <div className="proximo-info">
                        <div className="proximo-top">
                            <strong>Cambio de aceite y filtros</strong>
                            <span className="status-pill status-peligro">Próximo</span>
                        </div>
                        <p className="proximo-meta"><i className="fa-solid fa-car-side"></i> Mazda 3 — ABC-123 &nbsp;|&nbsp; <i className="fa-solid fa-gauge-high"></i> 45.000 km</p>
                        <p className="proximo-desc">Mantenimiento preventivo programado cada 5.000 km. Incluye cambio de aceite sintético y filtro de aceite.</p>
                        <div className="proximo-tooltip">
                            <i className="fa-solid fa-wrench"></i>
                            <div>
                                <strong>¿Qué se realizará?</strong>
                                <ul>
                                    <li>Cambio de aceite de motor sintético 5W-30</li>
                                    <li>Reemplazo de filtro de aceite</li>
                                    <li>Revisión de niveles de fluidos</li>
                                    <li>Inspección visual general</li>
                                </ul>
                                <span className="proximo-tooltip-costo">Costo estimado: <strong>$120.000 COP</strong></span>
                            </div>
                        </div>
                    </div>
                    <div className="proximo-dias-restantes urgente-texto">
                        <span>19</span>
                        <small>días</small>
                    </div>
                </div>

                <div className="proximo-card proximo-card-hover">
                    <div className="proximo-fecha-bloque">
                        <span className="proximo-mes">AGO</span>
                        <span className="proximo-dia">03</span>
                        <span className="proximo-anio">2025</span>
                    </div>
                    <div className="proximo-info">
                        <div className="proximo-top">
                            <strong>Revisión de frenos y suspensión</strong>
                            <span className="status-pill status-proceso">Programado</span>
                        </div>
                        <p className="proximo-meta"><i className="fa-solid fa-truck"></i> Toyota Hilux — XYZ-456 &nbsp;|&nbsp; <i className="fa-solid fa-gauge-high"></i> 62.000 km</p>
                        <p className="proximo-desc">Inspección completa del sistema de frenos, pastillas, discos y amortiguadores delanteros y traseros.</p>
                        <div className="proximo-tooltip">
                            <i className="fa-solid fa-wrench"></i>
                            <div>
                                <strong>¿Qué se realizará?</strong>
                                <ul>
                                    <li>Medición del espesor de pastillas y discos</li>
                                    <li>Revisión de líquido de frenos</li>
                                    <li>Inspección de amortiguadores</li>
                                    <li>Prueba de frenado en pista</li>
                                </ul>
                                <span className="proximo-tooltip-costo">Costo estimado: <strong>$180.000 COP</strong></span>
                            </div>
                        </div>
                    </div>
                    <div className="proximo-dias-restantes">
                        <span>38</span>
                        <small>días</small>
                    </div>
                </div>

                <div className="proximo-card proximo-card-hover">
                    <div className="proximo-fecha-bloque">
                        <span className="proximo-mes">SEP</span>
                        <span className="proximo-dia">20</span>
                        <span className="proximo-anio">2025</span>
                    </div>
                    <div className="proximo-info">
                        <div className="proximo-top">
                            <strong>Mantenimiento general 50.000 km</strong>
                            <span className="status-pill status-proceso">Programado</span>
                        </div>
                        <p className="proximo-meta"><i className="fa-solid fa-car-side"></i> Mazda 3 — ABC-123 &nbsp;|&nbsp; <i className="fa-solid fa-gauge-high"></i> 50.000 km</p>
                        <p className="proximo-desc">Revisión completa: bujías, correa de distribución, líquidos, filtros de aire y habitáculo.</p>
                        <div className="proximo-tooltip">
                            <i className="fa-solid fa-wrench"></i>
                            <div>
                                <strong>¿Qué se realizará?</strong>
                                <ul>
                                    <li>Cambio de bujías y correa de distribución</li>
                                    <li>Cambio de filtros de aire y habitáculo</li>
                                    <li>Revisión completa de líquidos</li>
                                    <li>Diagnóstico electrónico general</li>
                                </ul>
                                <span className="proximo-tooltip-costo">Costo estimado: <strong>$450.000 COP</strong></span>
                            </div>
                        </div>
                    </div>
                    <div className="proximo-dias-restantes">
                        <span>86</span>
                        <small>días</small>
                    </div>
                </div>
            </div>
        </div>
        )}

        {/* ===== SECCIÓN: CONTACTAR TALLER ===== */}
        {seccion === "contactar-taller" && (
        <div className="seccion-contenido" id="seccion-contactar-taller">
            <div className="seccion-header-cliente">
                <h2><i className="fa-solid fa-phone text-electrico"></i> Contactar Taller</h2>
                <p>Comunícate directamente con nuestro equipo de atención.</p>
            </div>

            <div className="contactar-grid">
                <div className="card contactar-info-card">
                    <h3><i className="fa-solid fa-circle-info text-electrico"></i> Información del Taller</h3>
                    <div className="contactar-dato">
                        <div className="contactar-icono-dato"><i className="fa-solid fa-location-dot"></i></div>
                        <div>
                            <strong>Dirección</strong>
                            <p>Calle 45 # 22-10, Bogotá, Colombia</p>
                        </div>
                    </div>
                    <div className="contactar-dato">
                        <div className="contactar-icono-dato"><i className="fa-solid fa-phone"></i></div>
                        <div>
                            <strong>Teléfono</strong>
                            <p>+57 601 456 7890</p>
                        </div>
                    </div>
                    <div className="contactar-dato">
                        <div className="contactar-icono-dato"><i className="fa-brands fa-whatsapp"></i></div>
                        <div>
                            <strong>WhatsApp</strong>
                            <p>+57 300 123 4567</p>
                        </div>
                    </div>
                    <div className="contactar-dato">
                        <div className="contactar-icono-dato"><i className="fa-solid fa-envelope"></i></div>
                        <div>
                            <strong>Correo</strong>
                            <p>contacto@autometrica.com</p>
                        </div>
                    </div>
                    <div className="contactar-dato">
                        <div className="contactar-icono-dato"><i className="fa-regular fa-clock"></i></div>
                        <div>
                            <strong>Horario</strong>
                            <p>Lunes a Viernes: 7:00 am – 6:00 pm</p>
                            <p>Sábados: 8:00 am – 1:00 pm</p>
                        </div>
                    </div>
                </div>

                <div className="card contactar-mensaje-card">
                    <h3><i className="fa-solid fa-paper-plane text-electrico"></i> Enviar Mensaje</h3>
                    <div className="panel-form" style={{marginTop: '20px'}}>
                        <div className="form-group">
                            <label>Asunto</label>
                            <input type="text" placeholder="Ej. Consulta sobre mi orden #ORD-001" />
                        </div>
                        <div className="form-group">
                            <label>Mensaje</label>
                            <textarea rows="5" placeholder="Escribe tu mensaje aquí..."></textarea>
                        </div>
                        <button className="btn btn-electrico btn-block">
                            <i className="fa-solid fa-paper-plane"></i> Enviar Mensaje
                        </button>
                    </div>
                </div>
            </div>
        </div>
        )}

    </main>

</div>
    );
}
