import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import PortalCliente from "./pages/PortalCliente";
import PanelMecanico from "./pages/PanelMecanico";
import GestionVehiculos from "./pages/GestionVehiculos";
import Clientes from "./pages/Clientes";
import Reparaciones from "./pages/Reparaciones";
import Historial from "./pages/Historial";
import Reportes from "./pages/Reportes";

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Público */}
                    <Route path="/" element={<Index />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/registro" element={<Registro />} />

                    {/* Cliente */}
                    <Route path="/portal-cliente" element={<PortalCliente />} />

                    {/* Mecánico / Panel de control */}
                    <Route path="/panel-mecanico" element={<PanelMecanico />} />
                    <Route path="/gestion-vehiculos" element={<GestionVehiculos />} />
                    <Route path="/clientes" element={<Clientes />} />
                    <Route path="/reparaciones" element={<Reparaciones />} />
                    <Route path="/historial" element={<Historial />} />
                    <Route path="/reportes" element={<Reportes />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}
