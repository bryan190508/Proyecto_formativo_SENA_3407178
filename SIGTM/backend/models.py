from sqlalchemy import Column,Integer,String,ForeignKey,Date
from sqlalchemy.orm import relationship

from database import Base

# USUARIOS
class Usuario(Base):
    __tablename__ = "usuarios"

    id_usuario = Column(Integer, primary_key=True, index=True)
    nombre = Column(String)
    correo = Column(String, unique=True)
    password = Column(String)
    rol = Column(String)

    vehiculos = relationship(
        "Vehiculo",
        back_populates="usuario"
    )

# VEHICULOS
class Vehiculo(Base):
    __tablename__ = "vehiculos"

    id_vehiculo = Column(Integer, primary_key=True)
    placa = Column(String, unique=True)
    marca = Column(String)
    modelo = Column(String)

    id_usuario = Column(
        Integer,
        ForeignKey("usuarios.id_usuario")
    )

    usuario = relationship(
        "Usuario",
        back_populates="vehiculos"
    )

    ordenes = relationship(
        "OrdenServicio",
        back_populates="vehiculo"
    )

# ORDEN SERVICIO
class OrdenServicio(Base):
    __tablename__ = "ordenes_servicio"

    id_orden = Column(Integer, primary_key=True)
    fecha = Column(Date)
    estado = Column(String)
    diagnostico = Column(String)

    vehiculo_id = Column(Integer, ForeignKey("vehiculos.id_vehiculo"))

    vehiculo = relationship("Vehiculo", back_populates="ordenes")
    piezas = relationship("Pieza", back_populates="orden")
    historial = relationship("HistorialServicio", back_populates="orden")

# PIEZAS
class Pieza(Base):
    __tablename__ = "piezas"

    id_pieza = Column(Integer, primary_key=True)
    nombre = Column(String)
    precio = Column(Integer)
    descripcion = Column(String)
    motivo_cambio = Column(String)

    orden_id = Column(Integer, ForeignKey("ordenes_servicio.id_orden"))

    orden = relationship("OrdenServicio", back_populates="piezas")

# HISTORIAL
class HistorialServicio(Base):
    __tablename__ = "historial_servicio"

    id_historial = Column(Integer, primary_key=True)
    fecha = Column(Date)
    detalle = Column(String)

    orden_id = Column(Integer, ForeignKey("ordenes_servicio.id_orden"))

    orden = relationship("OrdenServicio", back_populates="historial")
