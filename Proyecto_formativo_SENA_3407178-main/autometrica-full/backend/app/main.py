from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine, Base
from app.routers import (
    talleres,
    usuarios,
    clientes,
    vehiculos,
    mecanicos,
    tipos_reparacion,
    ordenes,
    repuestos,
    historial_estados,
    mensajes,
    proximos_servicios,
    reportes_ingresos,
    contactos_web,
)

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Autometrica API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

PREFIX = "/api/v1"

app.include_router(talleres.router, prefix=PREFIX)
app.include_router(usuarios.router, prefix=PREFIX)
app.include_router(clientes.router, prefix=PREFIX)
app.include_router(vehiculos.router, prefix=PREFIX)
app.include_router(mecanicos.router, prefix=PREFIX)
app.include_router(tipos_reparacion.router, prefix=PREFIX)
app.include_router(ordenes.router, prefix=PREFIX)
app.include_router(repuestos.router, prefix=PREFIX)
app.include_router(historial_estados.router, prefix=PREFIX)
app.include_router(mensajes.router, prefix=PREFIX)
app.include_router(proximos_servicios.router, prefix=PREFIX)
app.include_router(reportes_ingresos.router, prefix=PREFIX)
app.include_router(contactos_web.router, prefix=PREFIX)


@app.get("/")
def root():
    return {"mensaje": "Autometrica API funcionando", "docs": "/docs"}


@app.get("/health")
def health():
    return {"status": "ok"}
