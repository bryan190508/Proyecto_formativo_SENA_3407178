import React, { useState } from "react";
import { Link } from "react-router-dom";
import contactosWebService from "../services/contactosWebService";
import "./Index.css";

const contactoVacio = { nombre: "", telefono: "", correo: "", asunto: "", mensaje: "" };

export default function Index() {
    const [contacto, setContacto] = useState(contactoVacio);
    const [enviandoContacto, setEnviandoContacto] = useState(false);
    const [contactoEnviado, setContactoEnviado] = useState(false);

    const handleContactoChange = (e) => {
        const { name, value } = e.target;
        setContacto((prev) => ({ ...prev, [name]: value }));
    };

    const handleContactoSubmit = async (e) => {
        e.preventDefault();
        setEnviandoContacto(true);
        setContactoEnviado(false);
        try {
            await contactosWebService.create(contacto);
            setContacto(contactoVacio);
            setContactoEnviado(true);
        } catch (err) {
            console.error(err);
            alert("No se pudo enviar el mensaje. Intenta de nuevo.");
        } finally {
            setEnviandoContacto(false);
        }
    };

    return (
        <>
<nav className="navbar">
        <div className="logo">
            <i className="fa-solid fa-square-poll-vertical text-electrico"></i> Auto<span>Métrica</span>
        </div>
        <ul className="nav-links">
            <li><a href="#beneficios">Beneficios</a></li>
            <li><a href="#funcionalidades">Módulos</a></li>
            <li><a href="#contactos">Contacto</a></li>
        </ul>
        <div className="nav-auth">
            <Link to="/login" className="btn btn-texto">Iniciar Sesión</Link>
            <Link to="/registro" className="btn btn-electrico">Registrar Taller</Link>
        </div>
    </nav>

    <header className="hero">
        <div className="hero-content">
            <span className="badge-sena">Automatización</span>
            <h1>Trazabilidad y Transparencia para tu Taller Mecánico</h1>
            <p>Digitaliza tus órdenes de servicio, gestiona el reemplazo de piezas con justificaciones claras y permite a tus clientes conocer el estado de su vehículo en tiempo real.</p>
            <div className="hero-actions">
                <Link to="/registro" className="btn btn-electrico btn-grande">Comenzar Ahora</Link>
                <a href="#funcionalidades" className="btn btn-secundario btn-grande">Explorar Módulos</a>
            </div>
        </div>
    </header>

    <section className="banner-secundario">
        <div className="banner-info">
            <h2>Tecnología para Talleres Modernos</h2>
            <p>Controla cada reparación y mejora la confianza de tus clientes.</p>
        </div>
    </section>

    <section id="beneficios" className="seccion">
        <div className="seccion-header">
            <h2>Adiós a la desconfianza. <span className="text-electrico">Hola a la trazabilidad.</span></h2>
            <p>Resolvemos la falta de información e incertidumbre en los costos mediante procesos 100% digitalizados.</p>
        </div>
        <div className="grid-3">
            <div className="tarjeta-beneficio">
                <img className="tarjeta-beneficio-img" src="https://images.unsplash.com/photo-1504222490345-c075b6008014?w=600&q=80" alt="Transparencia en el taller" />
                <div className="tarjeta-beneficio-body">
                    <i className="fa-solid fa-eye icono-beneficio"></i>
                    <h3>Transparencia Total</h3>
                    <p>El cliente final puede consultar desde su móvil el avance real del mantenimiento de su coche.</p>
                </div>
            </div>
            <div className="tarjeta-beneficio">
                <img className="tarjeta-beneficio-img" src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80" alt="Evidencia digital de reparaciones" />
                <div className="tarjeta-beneficio-body">
                    <i className="fa-solid fa-file-shield icono-beneficio"></i>
                    <h3>Evidencia Digital</h3>
                    <p>Registra y justifica el cambio de cada pieza con descripciones precisas y costos claros antes de reparar.</p>
                </div>
            </div>
            <div className="tarjeta-beneficio">
                <img className="tarjeta-beneficio-img" src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=600&q=80" alt="Historial digital sin papel" />
                <div className="tarjeta-beneficio-body">
                    <i className="fa-solid fa-folder-open icono-beneficio"></i>
                    <h3>Cero Papel</h3>
                    <p>Centraliza el historial de servicios por placa vehicular. Olvídate de las hojas sueltas y chats perdidos.</p>
                </div>
            </div>
        </div>
    </section>

    <section id="funcionalidades" className="seccion fondo-blanco">
        <div className="seccion-header">
            <h2>Módulos del Sistema <span className="text-electrico">AutoMétrica</span></h2>
            <p>Diseñado bajo la arquitectura de software analizada para cubrir las etapas críticas del proceso mecánico.</p>
        </div>
        <div className="seccion-modulos-inner">
            <div className="seccion-modulos-img">
                <img src="https://images.unsplash.com/photo-1563207153-f403bf289096?w=900&q=85" alt="Mecánico trabajando en el taller AutoMétrica" />
            </div>
            <div className="seccion-modulos-lista grid-2">
            <div className="modulo-item">
                <div className="modulo-icon"><i className="fa-solid fa-id-card-clip"></i></div>
                <div>
                    <h3>Control de Usuarios y Roles</h3>
                    <p>Módulos diferenciados con seguridad y confidencialidad para Clientes y Administradores/Mecánicos.</p>
                </div>
            </div>
            <div className="modulo-item">
                <div className="modulo-icon"><i className="fa-solid fa-file-lines"></i></div>
                <div>
                    <h3>Órdenes de Servicio</h3>
                    <p>Apertura de registros con fecha de ingreso, kilometraje actual, datos del vehículo y diagnóstico inicial.</p>
                </div>
            </div>
            <div className="modulo-item">
                <div className="modulo-icon"><i className="fa-solid fa-gears"></i></div>
                <div>
                    <h3>Gestión de Piezas e Intervenciones</h3>
                    <p>Desglose técnico: nombre de la pieza, descripción, precio y la respectiva justificación del cambio.</p>
                </div>
            </div>
            <div className="modulo-item">
                <div className="modulo-icon"><i className="fa-solid fa-route"></i></div>
                <div>
                    <h3>Línea de Tiempo de Estados</h3>
                    <p>Flujo de trabajo de estados: <span className="badge-inline">Recibido</span> → <span className="badge-inline">En Diagnóstico</span> → <span className="badge-inline">En Reparación</span> → <span className="badge-inline">Finalizado</span>.</p>
                </div>
            </div>
            </div>
        </div>
    </section>

    <section className="seccion barra-autoridad">
        <p className="sub-titulo-autoridad">SOFTWARE DE GESTIÓN ADOPTADO POR TALLERES LÍDERES</p>
        <div className="logos-autoridad">
            <span><i className="fa-solid fa-warehouse"></i> AutoTecnik Bogotá</span>
            <span><i className="fa-solid fa-car-burst"></i> Taller Central S.A.</span>
            <span><i className="fa-solid fa-screwdriver-wrench"></i> InyeCore Motores</span>
        </div>
    </section>

    <footer className="footer">
        <div className="footer-content">
        </div>
    </footer>

    <a href="https://wa.me/#" target="_blank" className="boton-flotante" title="¿Soporte o Dudas del Sistema?">
        <i className="fa-brands fa-whatsapp"></i>
    </a>

    

    <section id="contactos" className="seccion" style={{backgroundColor: '#F8FAFC'}}>
        <div className="seccion-header">
            <h2>En que podemos ayudarte. <span className="text-electrico">Contactanos.</span></h2>
        </div>
        <div className="contacto-grid">

            <div className="tarjeta-form">
                <h3><i className="fa-solid fa-paper-plane text-electrico"></i> Envíanos un mensaje</h3>
                <p className="subtitulo">Completa el formulario y nos pondremos en contacto contigo a la brevedad.</p>

                <form className="contacto-form" onSubmit={handleContactoSubmit}>
                    <div className="form-row-2">
                        <div className="form-group">
                            <label htmlFor="nombre"><i className="fa-solid fa-user"></i> Nombre</label>
                            <input type="text" id="nombre" name="nombre" placeholder="Ej. Carlos Mendoza" value={contacto.nombre} onChange={handleContactoChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="telefono"><i className="fa-solid fa-phone"></i> Teléfono</label>
                            <input type="tel" id="telefono" name="telefono" placeholder="+57 300 000 0000" value={contacto.telefono} onChange={handleContactoChange} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="correo_c"><i className="fa-solid fa-envelope"></i> Correo Electrónico</label>
                        <input type="email" id="correo_c" name="correo" placeholder="contacto@tutaller.com" value={contacto.correo} onChange={handleContactoChange} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="asunto"><i className="fa-solid fa-tag"></i> Asunto</label>
                        <select id="asunto" name="asunto" value={contacto.asunto} onChange={handleContactoChange} required>
                            <option value="" disabled>Selecciona el motivo de contacto</option>
                            <option value="demo">Solicitar demo del sistema</option>
                            <option value="soporte">Soporte técnico</option>
                            <option value="facturacion">Facturación y planes</option>
                            <option value="integracion">Integración con otros sistemas</option>
                            <option value="otro">Otro</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="mensaje"><i className="fa-solid fa-comment-dots"></i> Mensaje</label>
                        <textarea id="mensaje" name="mensaje" rows="5" placeholder="Cuéntanos tu consulta con el mayor detalle posible..." value={contacto.mensaje} onChange={handleContactoChange} required></textarea>
                    </div>

                    <div className="form-check">
                        <input type="checkbox" id="terms_c" required />
                        <label htmlFor="terms_c">Acepto el tratamiento de mis datos personales conforme a la política de privacidad de AutoMétrica.</label>
                    </div>

                    <button type="submit" className="btn-enviar" disabled={enviandoContacto}>
                        <i className="fa-solid fa-paper-plane"></i> {enviandoContacto ? "Enviando..." : "Enviar Mensaje"}
                    </button>

                    {contactoEnviado && (
                        <div className="mensaje-exito visible">
                            <i className="fa-solid fa-circle-check"></i>
                            ¡Mensaje enviado correctamente! Te contactaremos en menos de 24 horas.
                        </div>
                    )}
                </form>
            </div>

            <div className="col-info">

                <div className="tarjeta-canal">
                    <h3><i className="fa-solid fa-headset text-electrico"></i> Canales de Atención</h3>
                    <div className="lista-canales">

                        <a href="tel:+576012345678" className="canal-item">
                            <div className="canal-icono electrico"><i className="fa-solid fa-phone"></i></div>
                            <div className="canal-texto">
                                <strong>Línea de Soporte</strong>
                                <span>+57 (601) 234-5678 — Lun a Vie</span>
                            </div>
                        </a>

                        <a href="https://wa.me/573001234567" target="_blank" className="canal-item">
                            <div className="canal-icono whatsapp"><i className="fa-brands fa-whatsapp"></i></div>
                            <div className="canal-texto">
                                <strong>WhatsApp Business</strong>
                                <span>Respuesta en menos de 2 horas</span>
                            </div>
                        </a>

                        <a href="mailto:soporte@autometrica.co" className="canal-item">
                            <div className="canal-icono email"><i className="fa-solid fa-envelope"></i></div>
                            <div className="canal-texto">
                                <strong>Correo Corporativo</strong>
                                <span>soporte@autometrica.co</span>
                            </div>
                        </a>

                        <div className="canal-item" style={{cursor: 'default'}}>
                            <div className="canal-icono ubicacion"><i className="fa-solid fa-location-dot"></i></div>
                            <div className="canal-texto">
                                <strong>Sede Principal</strong>
                                <span>Calle 100 # 19-61, Bogotá D.C.</span>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="tarjeta-mapa">
                    <div className="mapa-header">
                        <h3><i className="fa-solid fa-map-location-dot text-electrico"></i> Ubicación del Centro de Soporte</h3>
                    </div>
                    <div className="mapa-placeholder">
                        <i className="fa-solid fa-map-pin"></i>
                        <p>Bogotá D.C., Colombia</p>
                        <span>Calle 100 # 19-61, Chapinero</span>
                    </div>
                </div>

            </div>
        </div>
    </section>

    <section className="seccion-horarios">
        <div className="seccion-header" style={{marginBottom: '40px'}}>
            <h2>Horarios de Atención</h2>
            <p>Estamos disponibles para ayudarte cuando lo necesites.</p>
        </div>
        <div className="grid-horarios">
            <div className="tarjeta-horario">
                <i className="fa-solid fa-calendar-week"></i>
                <h4>Lunes a Viernes</h4>
                <p>8:00 a.m. — 6:00 p.m.</p>
                <span className="badge-disponible">Disponible ahora</span>
            </div>
            <div className="tarjeta-horario">
                <i className="fa-solid fa-calendar-day"></i>
                <h4>Sábados</h4>
                <p>8:00 a.m. — 12:00 m.</p>
                <span className="badge-disponible">Solo WhatsApp</span>
            </div>
            <div className="tarjeta-horario">
                <i className="fa-brands fa-whatsapp"></i>
                <h4>Soporte Digital</h4>
                <p>24/7 vía chat y formulario</p>
                <span className="badge-disponible">Siempre activo</span>
            </div>
        </div>
    </section>

    <footer className="footer">
        <div className="footer-content">
            <p className="footer-subtext">Proyecto Formativo desarrollado bajo metodología de análisis de requerimientos de software. SENA - ADSO.</p>
        </div>
    </footer>

    <a href="https://wa.me/573001234567" target="_blank" className="boton-flotante" title="¿Soporte o Dudas del Sistema?">
        <i className="fa-brands fa-whatsapp"></i>
    </a>
        </>
    );
}
