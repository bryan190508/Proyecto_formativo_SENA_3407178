import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Sidebar.css";

const menuItems = [
    { to: "/panel-mecanico", icon: "fa-clipboard-list", label: "Órdenes de Servicio" },
    { to: "/gestion-vehiculos", icon: "fa-car", label: "Vehículos" },
    { to: "/clientes", icon: "fa-users", label: "Clientes" },
    { to: "/reparaciones", icon: "fa-screwdriver-wrench", label: "Reparaciones" },
    { to: "/historial", icon: "fa-clock-rotate-left", label: "Historial" },
    { to: "/reportes", icon: "fa-chart-line", label: "Reportes" },
];

export default function Sidebar() {
    const { usuario, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <aside className="sidebar-cliente">
            <div className="sidebar-logo">
                <div className="logo-text">
                    <i className="fa-solid fa-square-poll-vertical"></i>
                    Auto<span>Métrica</span>
                </div>
            </div>

            <div className="perfil-cliente">
                <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=face"
                    alt="Foto de perfil"
                    className="perfil-avatar"
                />
                <h3>{usuario?.nombre_completo || "Usuario"}</h3>
                <span>Mecánico Principal</span>
            </div>

            <nav className="menu-cliente">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) => (isActive ? "activo" : "")}
                    >
                        <i className={`fa-solid ${item.icon}`}></i>
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            <div className="logout-cliente">
                <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }}>
                    <i className="fa-solid fa-right-from-bracket"></i> Cerrar Sesión
                </a>
            </div>
        </aside>
    );
}
