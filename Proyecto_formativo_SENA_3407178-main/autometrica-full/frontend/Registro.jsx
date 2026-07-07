import React from "react";
import PanelLayout from "../components/PanelLayout";
import "./PanelMecanico.css";

export default function PanelMecanico() {
    return (
        <PanelLayout>
            <div className="page-header">
                <div className="page-header-text">
                    <p className="eyebrow">Panel de control</p>
                    <h1>Gestión de Órdenes de Trabajo</h1>
                </div>
                <button className="btn-primary" onClick={() => alert("Abriendo formulario: Nueva Orden")}>
                    <i className="fa-solid fa-plus"></i> Nueva Orden
                </button>
            </div>

            <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=320&fit=crop"
                alt="Taller mecánico"
                className="section-banner"
            />

            <div className="panel-grid">
                {/* FORMULARIO */}
                <div className="card">
                    <div className="card-header-row">
                        <div className="card-icon-box"><i className="fa-solid fa-screwdriver-wrench"></i></div>
                        <div>
                            <h2>Actualización de Servicio Técnico</h2>
                            <p>Registra el diagnóstico y justifica los costos asociados al vehículo.</p>
                        </div>
                    </div>

                    <div className="form-row">
                        <div>
                            <label className="form-label">Vehículo / Placa</label>
                            <input type="text" defaultValue="Mazda 3 (ABC-123)" disabled className="form-input" />
                        </div>
                        <div>
                            <label className="form-label">Estado del Proceso</label>
                            <select className="form-select" defaultValue="En Reparación (Amarillo)">
                                <option>Recibido</option>
                                <option>En Diagnóstico</option>
                                <option>En Reparación (Amarillo)</option>
                                <option>Servicio Finalizado (Verde)</option>
                            </select>
                        </div>
                    </div>

                    <div style={{ marginTop: "14px" }}>
                        <label className="form-label">Diagnóstico Inicial Técnico</label>
                        <textarea rows="2" className="form-textarea" defaultValue="Vibración severa en el tren delantero al aplicar fuerza en el pedal de freno a altas velocidades." />
                    </div>

                    <div className="pieza-box">
                        <h4><i className="fa-solid fa-puzzle-piece" style={{ color: "#0284C7" }}></i> Componente o Pieza a Intervenir</h4>
                        <div className="form-row">
                            <div>
                                <label className="form-label">Nombre de la Pieza</label>
                                <input type="text" defaultValue="Discos de Freno Delanteros" className="form-input" />
                            </div>
                            <div>
                                <label className="form-label">Precio ($ COP)</label>
                                <input type="text" defaultValue="240.000" className="form-input" />
                            </div>
                        </div>
                        <div style={{ marginTop: "12px" }}>
                            <label className="form-label">Descripción y Justificación del Cambio</label>
                            <textarea rows="2" className="form-textarea" defaultValue="Desgaste térmico severo y deformación en la superficie de fricción del disco izquierdo. Requiere reemplazo inmediato para asegurar el frenado." />
                        </div>
                    </div>

                    <button
                        className="btn-primary btn-block"
                        style={{ marginTop: "18px" }}
                        onClick={() => alert("Orden guardada y actualizada.")}
                    >
                        <i className="fa-solid fa-floppy-disk"></i> Guardar Cambios de la Orden
                    </button>
                </div>

                {/* LISTA VEHÍCULOS */}
                <div className="card">
                    <div className="card-header-row">
                        <div className="card-icon-box"><i className="fa-solid fa-gauge-high"></i></div>
                        <div>
                            <h2>Monitoreo de Vehículos en Taller</h2>
                            <p>Flujo operativo y trazabilidad actual.</p>
                        </div>
                    </div>

                    <img
                        src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&h=140&fit=crop"
                        alt="Vehículos en taller"
                        style={{ width: "100%", height: "100px", objectFit: "cover", borderRadius: "8px", marginBottom: "16px" }}
                    />

                    <div className="lista-ordenes">
                        <div className="item-orden item-borde-proceso">
                            <div className="item-info">
                                <strong>Mazda 3 [ABC-123]</strong>
                                <p>Cambio de componentes de fricción</p>
                            </div>
                            <span className="status-pill pill-proceso">En Reparación</span>
                        </div>
                        <div className="item-orden item-borde-peligro">
                            <div className="item-info">
                                <strong>Chevrolet Onix [XYZ-789]</strong>
                                <p>Fallo crítico en sistema de refrigeración</p>
                            </div>
                            <span className="status-pill pill-peligro">Retrasado</span>
                        </div>
                        <div className="item-orden item-borde-exito">
                            <div className="item-info">
                                <strong>Renault Sandero [KJI-567]</strong>
                                <p>Mantenimiento preventivo general</p>
                            </div>
                            <span className="status-pill pill-exito">Finalizado</span>
                        </div>
                    </div>
                </div>
            </div>
        </PanelLayout>
    );
}
