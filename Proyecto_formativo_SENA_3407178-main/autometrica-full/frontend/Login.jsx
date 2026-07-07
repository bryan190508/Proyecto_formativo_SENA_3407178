import React from "react";
import PanelLayout from "../components/PanelLayout";
import "./Historial.css";

export default function Historial() {
    return (
        <PanelLayout>
<div className="page-header">
                <div className="page-header-text"><p className="eyebrow">Panel de control</p><h1>Historial de Servicios</h1></div>
                <button className="btn-primary"><i className="fa-solid fa-file-export"></i> Exportar</button>
            </div>

            <img src="https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=1200&h=280&fit=crop" alt="Historial taller" className="section-banner" />

            <div className="stats-row">
                <div className="stat-card"><div className="stat-icon azul"><i className="fa-solid fa-file-lines"></i></div><div><div className="stat-value">847</div><div className="stat-label">Total Registros</div></div></div>
                <div className="stat-card"><div className="stat-icon verde"><i className="fa-solid fa-calendar-check"></i></div><div><div className="stat-value">56</div><div className="stat-label">Este Mes</div></div></div>
                <div className="stat-card"><div className="stat-icon amarillo"><i className="fa-solid fa-coins"></i></div><div><div className="stat-value">$18.4M</div><div className="stat-label">Facturado (mes)</div></div></div>
                <div className="stat-card"><div className="stat-icon rojo"><i className="fa-solid fa-car"></i></div><div><div className="stat-value">143</div><div className="stat-label">Vehículos Atendidos</div></div></div>
            </div>

            <div className="card">
                <div className="card-header-row">
                    <div className="card-icon-box"><i className="fa-solid fa-magnifying-glass"></i></div>
                    <div><h2>Buscar en el Historial</h2><p>Filtra por vehículo, cliente o tipo de servicio.</p></div>
                </div>

                <div className="search-box">
                    <i className="fa-solid fa-search"></i>
                    <input type="text" placeholder="Buscar por placa, cliente o servicio..." />
                </div>

                <div className="filter-bar">
                    <button className="filter-btn active">Todos</button>
                    <button className="filter-btn">Mantenimiento</button>
                    <button className="filter-btn">Frenos</button>
                    <button className="filter-btn">Motor</button>
                    <button className="filter-btn">Eléctrico</button>
                    <button className="filter-btn">Transmisión</button>
                </div>

                {/* Entradas del historial */}
                <div>
                    <div className="historial-entry">
                        <div className="h-dot-col"><div className="h-dot h-dot-verde"></div><div className="h-line"></div></div>
                        <img src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=160&h=120&fit=crop" alt="Mazda 3" className="h-vehicle-thumb" />
                        <div className="h-content">
                            <h4>Cambio de Discos de Freno Delanteros — Mazda 3 [ABC-123]</h4>
                            <p>Se reemplazaron discos y pastillas delanteras por desgaste térmico severo. Se realizó sangrado del sistema de frenos y prueba de ruta.</p>
                            <div className="h-meta">
                                <span><i className="fa-solid fa-calendar"></i> 25 Jun 2026</span>
                                <span><i className="fa-solid fa-user-gear"></i> Carlos Mendoza</span>
                                <span><i className="fa-solid fa-user"></i> Juan Pérez</span>
                                <span className="h-cost"><i className="fa-solid fa-coins"></i> $240.000 COP</span>
                                <span className="badge badge-finalizado">Finalizado</span>
                            </div>
                        </div>
                    </div>

                    <div className="historial-entry">
                        <div className="h-dot-col"><div className="h-dot h-dot-verde"></div><div className="h-line"></div></div>
                        <img src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=160&h=120&fit=crop" alt="Renault Sandero" className="h-vehicle-thumb" />
                        <div className="h-content">
                            <h4>Mantenimiento Preventivo General — Renault Sandero [KJI-567]</h4>
                            <p>Cambio de aceite 5W-30 sintético, filtro de aire, filtro de combustible y revisión completa de niveles. Cambio de bujías.</p>
                            <div className="h-meta">
                                <span><i className="fa-solid fa-calendar"></i> 24 Jun 2026</span>
                                <span><i className="fa-solid fa-user-gear"></i> Carlos Mendoza</span>
                                <span><i className="fa-solid fa-user"></i> Ana Torres</span>
                                <span className="h-cost"><i className="fa-solid fa-coins"></i> $180.000 COP</span>
                                <span className="badge badge-finalizado">Finalizado</span>
                            </div>
                        </div>
                    </div>

                    <div className="historial-entry">
                        <div className="h-dot-col"><div className="h-dot h-dot-amarillo"></div><div className="h-line"></div></div>
                        <img src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=160&h=120&fit=crop" alt="Chevrolet Onix" className="h-vehicle-thumb" />
                        <div className="h-content">
                            <h4>Diagnóstico Sistema de Refrigeración — Chevrolet Onix [XYZ-789]</h4>
                            <p>Fallo crítico detectado: pérdida de refrigerante por fisura en manguera superior. Diagnóstico inicial completado, reparación en curso.</p>
                            <div className="h-meta">
                                <span><i className="fa-solid fa-calendar"></i> 26 Jun 2026</span>
                                <span><i className="fa-solid fa-user-gear"></i> José Martínez</span>
                                <span><i className="fa-solid fa-user"></i> Luis Ramírez</span>
                                <span className="h-cost"><i className="fa-solid fa-coins"></i> $580.000 COP (est.)</span>
                                <span className="badge badge-reparacion">En Proceso</span>
                            </div>
                        </div>
                    </div>

                    <div className="historial-entry">
                        <div className="h-dot-col"><div className="h-dot h-dot-azul"></div></div>
                        <img src="https://images.unsplash.com/photo-1617531653332-bd46c16f4d68?w=160&h=120&fit=crop" alt="Toyota Corolla" className="h-vehicle-thumb" />
                        <div className="h-content">
                            <h4>Revisión Eléctrica General — Toyota Corolla [LMN-321]</h4>
                            <p>Revisión de alternador, batería y sistema de luces. Se detectó alternador con bajo rendimiento. Se realizó recarga de batería preventiva.</p>
                            <div className="h-meta">
                                <span><i className="fa-solid fa-calendar"></i> 22 Jun 2026</span>
                                <span><i className="fa-solid fa-user-gear"></i> Pedro Suárez</span>
                                <span><i className="fa-solid fa-user"></i> María Gómez</span>
                                <span className="h-cost"><i className="fa-solid fa-coins"></i> $95.000 COP</span>
                                <span className="badge badge-finalizado">Finalizado</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PanelLayout>
    );
}
