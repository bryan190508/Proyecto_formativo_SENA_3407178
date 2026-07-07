import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import usuariosService from "../services/usuariosService";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

export default function Login() {
    const navigate = useNavigate();
    const { setUsuario } = useAuth();

    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [rol, setRol] = useState("mecanico");
    const [mostrarPassword, setMostrarPassword] = useState(false);
    const [aceptaTerminos, setAceptaTerminos] = useState(false);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setCargando(true);
        try {
            const usuario = await usuariosService.login(correo, password);
            setUsuario(usuario);

            if (usuario.rol === "cliente" || rol === "cliente") {
                navigate("/portal-cliente");
            } else {
                navigate("/panel-mecanico");
            }
        } catch (err) {
            console.error(err);
            setError("Correo o contraseña incorrectos.");
        } finally {
            setCargando(false);
        }
    };

    const aceptarYCerrar = () => {
        setAceptaTerminos(true);
        setModalAbierto(false);
    };

    return (
        <div className="auth-wrapper">
            {/* Imagen lateral */}
            <div className="auth-banner">
                <img
                    src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200&q=80"
                    alt="Taller mecánico"
                />
                <div className="banner-text">
                    <p>
                        Sistema de gestión para talleres mecánicos.
                        <br />
                        Controla órdenes, vehículos y clientes en un solo lugar.
                    </p>
                    <Link to="/" className="auth-logo">
                        <div className="logo-icon">
                            <span></span><span></span><span></span>
                            <div className="logo-dot"></div>
                        </div>
                        <span className="logo-text">AutoMétrica</span>
                    </Link>
                </div>
            </div>

            {/* Formulario */}
            <div className="auth-card">
                <div className="auth-header">
                    <Link to="/" className="link-volver"><i className="fa-solid fa-arrow-left"></i> Volver</Link>
                    <h2>Bienvenido de nuevo</h2>
                    <p>Ingresa tus credenciales para continuar.</p>
                </div>

                <div className="auth-tabs">
                    <Link to="/login" className="tab-link active">Iniciar sesión</Link>
                    <Link to="/registro" className="tab-link">Registrarse</Link>
                </div>

                {error && <div className="auth-error">{error}</div>}

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email"><i className="fa-solid fa-envelope"></i> Correo electrónico</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="nombre@taller.com"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password"><i className="fa-solid fa-lock"></i> Contraseña</label>
                        <div className="input-password-wrapper">
                            <input
                                type={mostrarPassword ? "text" : "password"}
                                id="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={() => setMostrarPassword((prev) => !prev)}
                            >
                                <i className={`fa-solid ${mostrarPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                            </button>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="login-rol"><i className="fa-solid fa-user-gear"></i> Tipo de cuenta</label>
                        <select id="login-rol" value={rol} onChange={(e) => setRol(e.target.value)} required>
                            <option value="mecanico">Mecánico</option>
                            <option value="cliente">Cliente</option>
                        </select>
                    </div>

                    <div className="form-check">
                        <input
                            type="checkbox"
                            id="terms-login"
                            checked={aceptaTerminos}
                            onChange={(e) => setAceptaTerminos(e.target.checked)}
                        />
                        <label htmlFor="terms-login">
                            Al iniciar sesión aceptas nuestros{" "}
                            <a href="#" className="text-link" onClick={(e) => { e.preventDefault(); setModalAbierto(true); }}>
                                Términos y Condiciones
                            </a>.
                        </label>
                    </div>

                    <button type="submit" className="btn btn-electrico btn-block" disabled={cargando}>
                        {cargando ? "Ingresando..." : "Ingresar"}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>¿No tienes cuenta? <Link to="/registro" className="text-link">Regístrate aquí</Link></p>
                </div>
            </div>

            {/* Modal Términos */}
            <div
                className={`modal-backdrop ${modalAbierto ? "open" : ""}`}
                onClick={(e) => { if (e.target === e.currentTarget) setModalAbierto(false); }}
            >
                <div className="modal">
                    <div className="modal-header">
                        <h3>Términos y Condiciones</h3>
                        <button className="modal-close" onClick={() => setModalAbierto(false)}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>Última actualización: junio de 2025</p>

                        <h4>1. Aceptación de los términos</h4>
                        <p>Al acceder y utilizar el sistema AutoMétrica, el usuario acepta cumplir con los presentes términos. Si no está de acuerdo, debe abstenerse de usar la plataforma.</p>

                        <h4>2. Uso del sistema</h4>
                        <p>AutoMétrica es una herramienta de gestión interna para talleres mecánicos. El acceso está restringido a usuarios registrados y autorizados. Queda prohibido el uso del sistema para fines distintos a los de gestión operativa del taller.</p>

                        <h4>3. Responsabilidad del usuario</h4>
                        <p>El usuario es responsable de mantener la confidencialidad de sus credenciales de acceso. Cualquier actividad realizada desde su cuenta es de su entera responsabilidad. Debe notificar de inmediato al administrador ante cualquier acceso no autorizado.</p>

                        <h4>4. Protección de datos</h4>
                        <p>La información registrada en el sistema (clientes, vehículos, órdenes de trabajo) es tratada con estricta confidencialidad. No se comparte con terceros sin autorización expresa del taller. Los datos se almacenan de forma segura conforme a la normativa vigente.</p>

                        <h4>5. Propiedad intelectual</h4>
                        <p>El software, diseño y contenido de AutoMétrica son propiedad de sus desarrolladores. No se permite reproducir, distribuir ni modificar el sistema sin autorización.</p>

                        <h4>6. Modificaciones</h4>
                        <p>AutoMétrica se reserva el derecho de actualizar estos términos en cualquier momento. El uso continuado del sistema implica la aceptación de los cambios.</p>

                        <h4>7. Contacto</h4>
                        <p>Para dudas o solicitudes, contacta al administrador del sistema a través de los canales oficiales del taller.</p>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-electrico" onClick={aceptarYCerrar}>Entendido</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
