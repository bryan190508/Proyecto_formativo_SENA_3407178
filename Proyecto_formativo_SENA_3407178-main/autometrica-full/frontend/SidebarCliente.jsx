/* ===== SHARED SIDEBAR STYLES ===== */
:root {
    --contenedor-blanco: #FFFFFF;
    --estructura-menus: #0F172A;
    --texto-principal: #334155;
    --accion-electrico: #0284C7;
    --accion-hover: #0369a1;
    --gris-suave: #E2E8F0;
    --estado-exito: #16A34A;
    --estado-proceso: #EAB308;
    --estado-peligro: #DC2626;
    --fondo-general: #F1F5F9;
}

* { margin: 0; padding: 0; box-sizing: border-box; }
body { background: var(--fondo-general); color: var(--texto-principal); font-family: 'Roboto', sans-serif; }

h1,h2,h3 { font-family: 'Montserrat', sans-serif; }
h4,h5,h6 { font-family: 'Poppins', sans-serif; }
p,label,input,textarea,select,a { font-family: 'Roboto', sans-serif; }

.layout-cliente { display: flex; min-height: 100vh; }

/* SIDEBAR */
.sidebar-cliente {
    width: 280px;
    background: #07132d;
    color: white;
    display: flex;
    flex-direction: column;
    padding: 0;
    flex-shrink: 0;
}

.sidebar-logo {
    padding: 22px 24px;
    border-bottom: 1px solid rgba(255,255,255,0.07);
}

.sidebar-logo .logo-text {
    font-family: 'Montserrat', sans-serif;
    font-size: 20px;
    font-weight: 700;
    color: white;
    display: flex;
    align-items: center;
    gap: 10px;
}

.sidebar-logo .logo-text i { color: #0284C7; }
.sidebar-logo .logo-text span { color: #0284C7; }

/* PERFIL con foto */
.perfil-cliente {
    padding: 24px 20px;
    border-bottom: 1px solid rgba(255,255,255,0.07);
    text-align: center;
}

.perfil-avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid #0284C7;
    margin: 0 auto 12px;
    display: block;
}

.perfil-avatar-placeholder {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: linear-gradient(135deg, #0284C7, #0d1d45);
    border: 3px solid #0284C7;
    margin: 0 auto 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 34px;
    color: white;
}

.perfil-cliente h3 { color: white; font-size: 16px; font-weight: 600; margin-bottom: 4px; }
.perfil-cliente span { color: #b8c5d6; font-size: 12px; }

/* MENÚ */
.menu-cliente { padding: 16px 12px; flex: 1; display: flex; flex-direction: column; gap: 4px; }

.menu-cliente a {
    display: flex;
    align-items: center;
    gap: 12px;
    color: #94a3b8;
    text-decoration: none;
    padding: 11px 14px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.18s;
}

.menu-cliente a i { width: 18px; text-align: center; font-size: 15px; }
.menu-cliente a:hover { background: rgba(2,132,199,0.15); color: white; }
.menu-cliente a.activo { background: #0284C7; color: white; box-shadow: 0 4px 12px rgba(2,132,199,0.3); }

.logout-cliente {
    padding: 16px 12px;
    border-top: 1px solid rgba(255,255,255,0.07);
}
.logout-cliente a {
    display: flex; align-items: center; gap: 10px;
    color: #f87171; text-decoration: none; font-size: 13px; padding: 10px 14px; border-radius: 8px;
    transition: background 0.18s;
}
.logout-cliente a:hover { background: rgba(248,113,113,0.12); }

/* MAIN CONTENT */
.contenido-cliente {
    flex: 1;
    background: var(--fondo-general);
    overflow-y: auto;
}

.main-content { padding: 36px 40px; max-width: 1100px; }

.page-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 30px;
}

.page-header-text .eyebrow {
    font-size: 12px;
    font-weight: 600;
    color: #0284C7;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 6px;
}

.page-header-text h1 {
    font-size: 26px;
    color: var(--estructura-menus);
    font-weight: 700;
}

/* CARDS */
.card {
    background: white;
    border-radius: 12px;
    padding: 24px;
    border: 1px solid var(--gris-suave);
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    margin-bottom: 24px;
}

.card-header-row {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 20px;
}

.card-icon-box {
    width: 44px; height: 44px;
    background: #e0f2fe;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
    color: #0284C7;
    flex-shrink: 0;
}

.card-header-row h2 { font-size: 18px; color: var(--estructura-menus); margin-bottom: 2px; }
.card-header-row p { font-size: 13px; color: #64748b; }

/* BTNS */
.btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    background: #0284C7; color: white;
    border: none; padding: 10px 20px; border-radius: 8px;
    font-size: 14px; font-weight: 600; cursor: pointer; text-decoration: none;
    transition: background 0.18s;
}
.btn-primary:hover { background: #0369a1; }

.btn-block { width: 100%; justify-content: center; margin-top: 8px; }

/* FORM */
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px; }
.form-group { display: flex; flex-direction: column; gap: 6px; }
.form-group label { font-size: 12px; font-weight: 600; color: var(--estructura-menus); display: flex; align-items: center; gap: 6px; }
.form-group label i { color: #0284C7; font-size: 11px; }
.form-group input, .form-group select, .form-group textarea {
    padding: 10px 12px; border: 1px solid var(--gris-suave); border-radius: 8px;
    font-size: 14px; color: var(--estructura-menus); outline: none;
    background: #f8fafc; transition: border-color 0.18s;
}
.form-group input:focus, .form-group select:focus, .form-group textarea:focus {
    border-color: #0284C7; background: white;
}
.form-group textarea { resize: vertical; }

/* TABLE */
table { width: 100%; border-collapse: collapse; }
thead tr { border-bottom: 2px solid var(--gris-suave); }
th { padding: 12px 14px; text-align: left; font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; }
td { padding: 14px; font-size: 14px; color: var(--texto-principal); border-bottom: 1px solid #f1f5f9; }
tbody tr:hover td { background: #f8fafc; }
tbody tr:last-child td { border-bottom: none; }

/* BADGES */
.badge { padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; text-transform: uppercase; }
.badge-activo { background: #dcfce7; color: #166534; }
.badge-reparacion { background: #fef9c3; color: #854d0e; }
.badge-retrasado { background: #fee2e2; color: #991b1b; }
.badge-finalizado { background: #e0f2fe; color: #0369a1; }

/* STATS ROW */
.stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
.stat-card {
    background: white; border-radius: 12px; padding: 20px;
    border: 1px solid var(--gris-suave);
    display: flex; align-items: center; gap: 14px;
}
.stat-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
.stat-icon.azul { background: #e0f2fe; color: #0284C7; }
.stat-icon.verde { background: #dcfce7; color: #16A34A; }
.stat-icon.amarillo { background: #fef9c3; color: #EAB308; }
.stat-icon.rojo { background: #fee2e2; color: #DC2626; }
.stat-value { font-size: 24px; font-weight: 700; color: var(--estructura-menus); font-family: 'Montserrat', sans-serif; }
.stat-label { font-size: 12px; color: #64748b; margin-top: 2px; }

/* VEHICLE CARD */
.vehicle-img-box {
    width: 100%;
    height: 120px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 12px;
    background: #e2e8f0;
}

/* IMAGE BANNER */
.section-banner {
    width: 100%;
    height: 160px;
    object-fit: cover;
    border-radius: 12px;
    margin-bottom: 24px;
    display: block;
}
