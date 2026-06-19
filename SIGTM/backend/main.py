from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import engine
from models import Base

from routers import usuarios
from routers import vehiculos
from routers import ordenes
from routers import piezas
from routers import historial

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AutoMetrica API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(usuarios.router)
app.include_router(vehiculos.router)
app.include_router(ordenes.router)
app.include_router(piezas.router)
app.include_router(historial.router)