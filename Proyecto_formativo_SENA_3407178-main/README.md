AutoMétrica — Proyecto Completo (Backend + Frontend)
Este proyecto está dividido en dos carpetas independientes:
```
autometrica-full/
├── backend/     → API en FastAPI (Python)
└── frontend/    → Aplicación en React + Vite + Axios
```
---
1. Backend (FastAPI)
Instalación
```powershell
cd backend
pip install -r requirements.txt --break-system-packages
```
Configurar la base de datos
Crea una base de datos en PostgreSQL (ej. `autometrica_db`).
Importa la estructura ejecutando `autometrica_db.sql` en esa base (usando pgAdmin o `psql`).
Revisa el archivo `.env` — ya trae tu configuración anterior:
```
   DATABASE_URL=postgresql://postgres:1234@localhost:5432/autometrica_db
   ```
Ajusta usuario/contraseña/nombre de base si es necesario.
Ejecutar el servidor
```powershell
python -m uvicorn app.main:app --reload
```
El backend queda disponible en `http://127.0.0.1:8000`, con todos los endpoints bajo el prefijo `/api/v1` (ej. `http://127.0.0.1:8000/api/v1/vehiculos`).
---
2. Frontend (React + Vite)
Instalación
```powershell
cd "C:\Users\HOME\Desktop\PRUEBA DEL PROYECTO\autometrica-full\frontend"
npm install
```
Ejecutar en modo desarrollo
```powershell
npm run dev
```
Esto abre la app en `http://localhost:5173`. El backend debe estar corriendo en paralelo (`http://127.0.0.1:8000`) para que las peticiones funcionen.
Compilar para producción
```powershell
npm run build
```
Genera los archivos finales en `frontend/dist/`.
---
Estructura del frontend
```
frontend/src/
├── services/               → Una función de axios por cada recurso de la API
│   ├── api.js               (instancia base de axios)
│   ├── usuariosService.js
│   ├── clientesService.js
│   ├── vehiculosService.js
│   ├── mecanicosService.js
│   ├── talleresService.js
│   ├── ordenesService.js
│   ├── repuestosService.js
│   ├── historialEstadosService.js
│   ├── tiposReparacionService.js
│   ├── mensajesService.js
│   ├── proximosServiciosService.js
│   ├── reportesIngresosService.js
│   └── contactosWebService.js
│
├── context/
│   └── AuthContext.jsx     → Guarda el usuario logueado (reemplaza el localStorage manual)
│
├── components/
│   ├── Sidebar.jsx / .css       → Menú lateral del panel de mecánico
│   ├── SidebarCliente.jsx       → Menú lateral del portal de cliente
│   └── PanelLayout.jsx          → Envoltorio Sidebar + contenido
│
├── pages/                  → Una página por cada .html original
│   ├── Index.jsx    / Index.css       (antes index.html)
│   ├── Login.jsx    / Login.css       (antes login.html)
│   ├── Registro.jsx / Registro.css    (antes registro.html)
│   ├── PortalCliente.jsx / .css       (antes portal-cliente.html)
│   ├── PanelMecanico.jsx / .css       (antes panel-mecanico.html)
│   ├── GestionVehiculos.jsx / .css    (antes gestion-vehiculos.html)
│   ├── Clientes.jsx / .css            (antes clientes.html)
│   ├── Reparaciones.jsx / .css        (antes reparaciones.html)
│   ├── Historial.jsx / .css           (antes historial.html)
│   └── Reportes.jsx / .css            (antes reportes.html)
│
├── App.jsx          → Configuración de rutas (React Router)
├── main.jsx         → Punto de entrada
└── global.css        → Reset global mínimo
```
Cómo funciona la navegación (React Router)
En vez de archivos `.html` sueltos que se abren con `<a href="archivo.html">`, todas las páginas viven en una sola aplicación y React Router cambia de vista sin recargar el navegador.
Cada ruta está definida en `App.jsx`:
Ruta	                 Página
`/`                    Index(landing)
`/login`               Login
`/registro`            Registro
`/portal-cliente`      Portal del cliente
`/panel-mecanico`      Panel del mecánico
`/gestion-vehiculos`   Gestión de vehículos
`/clientes`            Clientes
`/reparaciones`        Reparaciones
`/historial`           Historial
`/reportes`            Reportes
Para navegar entre páginas dentro de un componente, usa `<Link to="/ruta">` (en vez de `<a href="...">`) o el hook `useNavigate()` cuando necesitas redirigir tras una acción (como hacemos en `Login.jsx` tras iniciar sesión).

Qué páginas están conectadas a la API real

Login / Registro: conectadas 100% (usan `usuariosService`).
Gestión de Vehículos: lista y crea vehículos reales desde `vehiculosService`.
Clientes: lista y crea clientes reales desde `clientesService`.
Portal del Cliente: la sección "Mis Vehículos" funciona con datos de ejemplo en memoria (se pueden agregar vehículos desde el modal, pero no persisten al recargar — para conectarlo a la base de datos real, se usaría `vehiculosService` igual que en Gestión de Vehículos).
Reparaciones / Historial / Reportes: mantienen los datos de demostración del diseño original (no estaban conectados a un backend específico en la versión HTML).
Todos los servicios ya existen y están listos en `src/services/` por si quieres conectar cualquiera de estas páginas a datos reales — solo hay que importarlos y reemplazar los datos estáticos por un `useEffect` + `useState`, tal como se hizo en `GestionVehiculos.jsx`.
