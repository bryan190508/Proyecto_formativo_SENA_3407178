import React from "react";
import PanelLayout from "../components/PanelLayout";
import "./Reportes.css";

export default function Reportes() {
    return (
        <PanelLayout>
<div className="page-header">
                <div className="page-header-text"><p className="eyebrow">Panel de control</p><h1>Reportes y Analítica</h1></div>
                <button className="btn-primary"><i className="fa-solid fa-file-export"></i> Generar Reporte PDF</button>
            </div>

            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=280&fit=crop" alt="Analítica" className="section-banner" />

            {/* KPIs principales */}
            <div className="stats-row">
                <div className="stat-card"><div className="stat-icon verde"><i className="fa-solid fa-coins"></i></div><div><div className="stat-value">$18.4M</div><div className="stat-label">Ingresos Jun 2026</div></div></div>
                <div className="stat-card"><div className="stat-icon azul"><i className="fa-solid fa-file-invoice"></i></div><div><div className="stat-value">56</div><div className="stat-label">Órdenes Este Mes</div></div></div>
                <div className="stat-card"><div className="stat-icon amarillo"><i className="fa-solid fa-star"></i></div><div><div className="stat-value">4.8</div><div className="stat-label">Satisfacción Clientes</div></div></div>
                <div className="stat-card"><div className="stat-icon rojo"><i className="fa-solid fa-hourglass-half"></i></div><div><div className="stat-value">4.2h</div><div className="stat-label">Tiempo Promedio</div></div></div>
            </div>

            <div className="two-col">
                {/* Ingresos por mes */}
                <div className="card">
                    <div className="card-header-row">
                        <div className="card-icon-box"><i className="fa-solid fa-chart-bar"></i></div>
                        <div><h2>Ingresos por Mes</h2><p>Comparativa semestral 2026.</p></div>
                    </div>
                    <div className="chart-wrap">
                        <div className="chart-row"><span className="chart-label">Enero</span><div className="chart-bar-bg"><div className="chart-bar-fill bar-azul" style={{width: '55%'}}>$10.1M</div></div></div>
                        <div className="chart-row"><span className="chart-label">Febrero</span><div className="chart-bar-bg"><div className="chart-bar-fill bar-azul" style={{width: '60%'}}>$11.0M</div></div></div>
                        <div className="chart-row"><span className="chart-label">Marzo</span><div className="chart-bar-bg"><div className="chart-bar-fill bar-azul" style={{width: '72%'}}>$13.2M</div></div></div>
                        <div className="chart-row"><span className="chart-label">Abril</span><div className="chart-bar-bg"><div className="chart-bar-fill bar-verde" style={{width: '80%'}}>$14.7M</div></div></div>
                        <div className="chart-row"><span className="chart-label">Mayo</span><div className="chart-bar-bg"><div className="chart-bar-fill bar-verde" style={{width: '87%'}}>$16.0M</div></div></div>
                        <div className="chart-row"><span className="chart-label">Junio</span><div className="chart-bar-bg"><div className="chart-bar-fill bar-amarillo" style={{width: '100%'}}>$18.4M</div></div></div>
                    </div>
                </div>

                {/* KPIs detalle */}
                <div className="card">
                    <div className="card-header-row">
                        <div className="card-icon-box"><i className="fa-solid fa-gauge"></i></div>
                        <div><h2>Indicadores Clave</h2><p>Métricas de rendimiento del taller.</p></div>
                    </div>
                    <div className="kpi-grid">
                        <div className="kpi-box">
                            <div className="kpi-value" style={{color: '#0284C7'}}>189</div>
                            <div className="kpi-label">Reparaciones completadas</div>
                            <div className="kpi-change kpi-up"><i className="fa-solid fa-arrow-up"></i> +12% vs mayo</div>
                        </div>
                        <div className="kpi-box">
                            <div className="kpi-value" style={{color: '#16A34A'}}>96%</div>
                            <div className="kpi-label">Tasa de satisfacción</div>
                            <div className="kpi-change kpi-up"><i className="fa-solid fa-arrow-up"></i> +3% vs mayo</div>
                        </div>
                        <div className="kpi-box">
                            <div className="kpi-value" style={{color: '#EAB308'}}>4.2h</div>
                            <div className="kpi-label">Tiempo promedio</div>
                            <div className="kpi-change kpi-down"><i className="fa-solid fa-arrow-down"></i> -0.8h vs mayo</div>
                        </div>
                        <div className="kpi-box">
                            <div className="kpi-value" style={{color: '#DC2626'}}>3.1%</div>
                            <div className="kpi-label">Tasa de retorno</div>
                            <div className="kpi-change kpi-up"><i className="fa-solid fa-arrow-down"></i> -0.5% vs mayo</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="two-col">
                {/* Servicios más comunes */}
                <div className="card">
                    <div className="card-header-row">
                        <div className="card-icon-box"><i className="fa-solid fa-list-ol"></i></div>
                        <div><h2>Servicios Más Frecuentes</h2><p>Top 5 del mes de junio.</p></div>
                    </div>
                    <div className="top-services">
                        <div className="top-svc-item"><span>🔧 Mantenimiento preventivo</span><span className="badge badge-activo">48 órdenes</span></div>
                        <div className="top-svc-item"><span>🛑 Frenos (discos/pastillas)</span><span className="badge badge-reparacion">31 órdenes</span></div>
                        <div className="top-svc-item"><span>⚡ Sistema eléctrico</span><span className="badge badge-finalizado">22 órdenes</span></div>
                        <div className="top-svc-item"><span>❄️ Sistema de refrigeración</span><span className="badge badge-retrasado">18 órdenes</span></div>
                        <div className="top-svc-item"><span>⚙️ Transmisión / caja</span><span className="badge badge-activo">14 órdenes</span></div>
                    </div>
                </div>

                {/* Mecánicos por rendimiento */}
                <div className="card">
                    <div className="card-header-row">
                        <div className="card-icon-box"><i className="fa-solid fa-users-gear"></i></div>
                        <div><h2>Rendimiento por Técnico</h2><p>Órdenes completadas este mes.</p></div>
                    </div>
                    <div className="chart-wrap">
                        <div className="chart-row">
                            <span className="chart-label" style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=28&h=28&fit=crop&crop=face" style={{width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover'}} /> Carlos M.
                            </span>
                            <div className="chart-bar-bg"><div className="chart-bar-fill bar-azul" style={{width: '90%'}}>84 órd.</div></div>
                        </div>
                        <div className="chart-row">
                            <span className="chart-label" style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                                <div style={{width: '24px', height: '24px', borderRadius: '50%', background: '#0284C7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', color: 'white', fontWeight: '700'}}>JM</div> José M.
                            </span>
                            <div className="chart-bar-bg"><div className="chart-bar-fill bar-verde" style={{width: '68%'}}>63 órd.</div></div>
                        </div>
                        <div className="chart-row">
                            <span className="chart-label" style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                                <div style={{width: '24px', height: '24px', borderRadius: '50%', background: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', color: 'white', fontWeight: '700'}}>PS</div> Pedro S.
                            </span>
                            <div className="chart-bar-bg"><div className="chart-bar-fill bar-amarillo" style={{width: '45%'}}>42 órd.</div></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tipos de reporte disponibles */}
            <div className="card">
                <div className="card-header-row">
                    <div className="card-icon-box"><i className="fa-solid fa-file-chart-column"></i></div>
                    <div><h2>Generar Reportes</h2><p>Selecciona el tipo de informe que deseas generar y exportar.</p></div>
                </div>
                <div className="report-cards">
                    <div className="report-card" onClick={() => alert('Generando reporte financiero...')}>
                        <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=200&fit=crop" alt="Financiero" />
                        <div className="report-card-body"><h4>Reporte Financiero</h4><p>Ingresos, egresos y rentabilidad mensual del taller.</p></div>
                        <div className="report-card-footer"><button className="btn-primary" style={{padding: '6px 14px', fontSize: '12px'}}><i className="fa-solid fa-download"></i> Descargar</button></div>
                    </div>
                    <div className="report-card" onClick={() => alert('Generando reporte de clientes...')}>
                        <img src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=200&fit=crop" alt="Clientes" />
                        <div className="report-card-body"><h4>Reporte de Clientes</h4><p>Frecuencia de visita, clientes nuevos y retención.</p></div>
                        <div className="report-card-footer"><button className="btn-primary" style={{padding: '6px 14px', fontSize: '12px'}}><i className="fa-solid fa-download"></i> Descargar</button></div>
                    </div>
                    <div className="report-card" onClick={() => alert('Generando reporte operativo...')}>
                        <img src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=200&fit=crop" alt="Operativo" />
                        <div className="report-card-body"><h4>Reporte Operativo</h4><p>Tiempos de servicio, eficiencia y carga de trabajo.</p></div>
                        <div className="report-card-footer"><button className="btn-primary" style={{padding: '6px 14px', fontSize: '12px'}}><i className="fa-solid fa-download"></i> Descargar</button></div>
                    </div>
                </div>
            </div>
        </PanelLayout>
    );
}
