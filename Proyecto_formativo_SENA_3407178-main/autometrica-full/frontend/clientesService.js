import React from "react";
import PanelLayout from "../components/PanelLayout";
import "./Reparaciones.css";

export default function Reparaciones() {
    return (
        <PanelLayout>
<div className="page-header">
                <div className="page-header-text"><p className="eyebrow">Panel de control</p><h1>Centro de Reparaciones</h1></div>
                <button className="btn-primary"><i className="fa-solid fa-plus"></i> Nueva Reparación</button>
            </div>

            <img src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200&h=300&fit=crop" alt="Mecánico trabajando" className="section-banner" />

            {/* Stats */}
            <div className="stats-row">
                <div className="stat-card"><div className="stat-icon azul"><i className="fa-solid fa-screwdriver-wrench"></i></div><div><div className="stat-value">31</div><div className="stat-label">En Proceso</div></div></div>
                <div className="stat-card"><div className="stat-icon verde"><i className="fa-solid fa-check-double"></i></div><div><div className="stat-value">189</div><div className="stat-label">Completadas (mes)</div></div></div>
                <div className="stat-card"><div className="stat-icon amarillo"><i className="fa-solid fa-clock"></i></div><div><div className="stat-value">4.2h</div><div className="stat-label">Promedio Duración</div></div></div>
                <div className="stat-card"><div className="stat-icon rojo"><i className="fa-solid fa-triangle-exclamation"></i></div><div><div className="stat-value">5</div><div className="stat-label">Urgentes Hoy</div></div></div>
            </div>

            {/* Reparaciones en curso (tarjetas visuales) */}
            <div className="card">
                <div className="card-header-row">
                    <div className="card-icon-box"><i className="fa-solid fa-gauge-high"></i></div>
                    <div><h2>Reparaciones en Curso</h2><p>Estado actual de los trabajos activos en taller.</p></div>
                </div>
                <div className="repair-grid">
                    <div className="repair-card">
                        <img src="https://images.unsplash.com/photo-1609619385002-f40f1df9b7eb?w=400&h=260&fit=crop" alt="Frenos" />
                        <div className="repair-card-body">
                            <h4>Cambio de Discos de Freno</h4>
                            <p>Desgaste térmico severo en disco izquierdo. Reemplazo de discos delanteros y pastillas.</p>
                            <div className="progress-bar-wrap"><div className="progress-bar-fill fill-proceso"></div></div>
                            <div className="technician-row">
                                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face" alt="Mecánico" />
                                Carlos Mendoza · 60% completado
                            </div>
                        </div>
                        <div className="repair-card-footer">
                            <span className="price-tag">$240.000</span>
                            <span className="badge badge-reparacion">En Proceso</span>
                        </div>
                    </div>
                    <div className="repair-card">
                        <img src="https://images.unsplash.com/photo-1617531653332-bd46c16f4d68?w=400&h=260&fit=crop" alt="Motor" />
                        <div className="repair-card-body">
                            <h4>Revisión Sistema de Refrigeración</h4>
                            <p>Fallo crítico: pérdida de refrigerante y sobrecalentamiento. Revisión de bomba de agua y termostato.</p>
                            <div className="progress-bar-wrap"><div className="progress-bar-fill fill-inicio"></div></div>
                            <div className="technician-row">
                                <div style={{width: '24px', height: '24px', borderRadius: '50%', background: '#0284C7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: 'white', fontWeight: '700'}}>JM</div>
                                José Martínez · 20% completado
                            </div>
                        </div>
                        <div className="repair-card-footer">
                            <span className="price-tag">$580.000</span>
                            <span className="badge badge-retrasado">Urgente</span>
                        </div>
                    </div>
                    <div className="repair-card">
                        <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=260&fit=crop" alt="Mantenimiento" />
                        <div className="repair-card-body">
                            <h4>Mantenimiento Preventivo General</h4>
                            <p>Cambio de aceite, filtros de aire y combustible. Revisión de batería y niveles generales.</p>
                            <div className="progress-bar-wrap"><div className="progress-bar-fill fill-finalizado"></div></div>
                            <div className="technician-row">
                                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face" alt="Mecánico" />
                                Carlos Mendoza · 100% completado
                            </div>
                        </div>
                        <div className="repair-card-footer">
                            <span className="price-tag">$180.000</span>
                            <span className="badge badge-finalizado">Finalizado</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Nueva reparación form */}
            <div className="card">
                <div className="card-header-row">
                    <div className="card-icon-box"><i className="fa-solid fa-plus"></i></div>
                    <div><h2>Registrar Nueva Reparación</h2><p>Ingresa los detalles de la intervención técnica.</p></div>
                </div>
                <div className="form-grid">
                    <div className="form-group"><label><i className="fa-solid fa-car"></i> Vehículo / Placa</label><input type="text" placeholder="Ej. ABC-123" /></div>
                    <div className="form-group"><label><i className="fa-solid fa-user"></i> Técnico Asignado</label><select><option>Carlos Mendoza</option><option>José Martínez</option><option>Pedro Suárez</option></select></div>
                    <div className="form-group"><label><i className="fa-solid fa-wrench"></i> Tipo de Reparación</label><select><option>Frenos</option><option>Motor</option><option>Transmisión</option><option>Eléctrico</option><option>Mantenimiento Preventivo</option></select></div>
                    <div className="form-group"><label><i className="fa-solid fa-dollar-sign"></i> Costo Estimado ($ COP)</label><input type="text" placeholder="Ej. 350.000" /></div>
                </div>
                <div className="form-group" style={{marginBottom: '16px'}}><label><i className="fa-solid fa-file-lines"></i> Descripción del Diagnóstico</label><textarea rows="3" placeholder="Describe el problema identificado y el trabajo a realizar..."></textarea></div>
                <button className="btn-primary" onClick={() => alert('Reparación registrada.')}><i className="fa-solid fa-floppy-disk"></i> Registrar Reparación</button>
            </div>

            {/* Timeline de actividad */}
            <div className="card">
                <div className="card-header-row">
                    <div className="card-icon-box"><i className="fa-solid fa-timeline"></i></div>
                    <div><h2>Actividad Reciente del Taller</h2><p>Últimas acciones registradas hoy.</p></div>
                </div>
                <div className="timeline-repair">
                    <div className="timeline-item">
                        <div className="timeline-dot-col"><div className="tl-dot tl-dot-proceso"></div><div className="tl-line"></div></div>
                        <div className="timeline-content"><h4>Inicio de revisión — Chevrolet Onix XYZ-789</h4><p>José Martínez comenzó la inspección del sistema de refrigeración.</p><span className="tl-meta"><i className="fa-solid fa-clock"></i> Hace 35 min</span></div>
                    </div>
                    <div className="timeline-item">
                        <div className="timeline-dot-col"><div className="tl-dot tl-dot-finalizado"></div><div className="tl-line"></div></div>
                        <div className="timeline-content"><h4>Reparación completada — Renault Sandero KJI-567</h4><p>Mantenimiento preventivo finalizado. Cliente notificado para retiro.</p><span className="tl-meta"><i className="fa-solid fa-clock"></i> Hace 2 horas</span></div>
                    </div>
                    <div className="timeline-item">
                        <div className="timeline-dot-col"><div className="tl-dot tl-dot-inicio"></div></div>
                        <div className="timeline-content"><h4>Pieza solicitada — Discos de freno delanteros</h4><p>Carlos Mendoza solicitó repuesto para Mazda 3 ABC-123. Precio: $240.000 COP.</p><span className="tl-meta"><i className="fa-solid fa-clock"></i> Hace 3 horas</span></div>
                    </div>
                </div>
            </div>
        </PanelLayout>
    );
}
