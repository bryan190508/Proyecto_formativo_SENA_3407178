from datetime import date, datetime
from decimal import Decimal
from typing import Optional
from pydantic import BaseModel


class TallerBase(BaseModel):
    nombre: str
    nit: Optional[str] = None
    telefono: Optional[str] = None
    correo: Optional[str] = None
    direccion: Optional[str] = None
    ciudad: Optional[str] = None
    logo_url: Optional[str] = None
    activo: bool = True

class TallerCreate(TallerBase):
    pass

class TallerUpdate(BaseModel):
    nombre: Optional[str] = None
    nit: Optional[str] = None
    telefono: Optional[str] = None
    correo: Optional[str] = None
    direccion: Optional[str] = None
    ciudad: Optional[str] = None
    logo_url: Optional[str] = None
    activo: Optional[bool] = None

class TallerOut(TallerBase):
    id: int
    fecha_creacion: datetime
    model_config = {"from_attributes": True}


class UsuarioBase(BaseModel):
    taller_id: Optional[int] = None
    nombre_completo: str
    correo: str
    rol: str
    telefono: Optional[str] = None
    activo: bool = True

class UsuarioCreate(UsuarioBase):
    contrasena_hash: str

class UsuarioUpdate(BaseModel):
    taller_id: Optional[int] = None
    nombre_completo: Optional[str] = None
    correo: Optional[str] = None
    contrasena_hash: Optional[str] = None
    rol: Optional[str] = None
    telefono: Optional[str] = None
    activo: Optional[bool] = None
    ultimo_acceso: Optional[datetime] = None

class UsuarioOut(UsuarioBase):
    id: int
    fecha_registro: datetime
    ultimo_acceso: Optional[datetime] = None
    model_config = {"from_attributes": True}


class ClienteBase(BaseModel):
    usuario_id: int
    cedula: Optional[str] = None
    es_vip: bool = False
    notas: Optional[str] = None

class ClienteCreate(ClienteBase):
    pass

class ClienteUpdate(BaseModel):
    cedula: Optional[str] = None
    es_vip: Optional[bool] = None
    notas: Optional[str] = None

class ClienteOut(ClienteBase):
    id: int
    model_config = {"from_attributes": True}


class VehiculoBase(BaseModel):
    cliente_id: int
    placa: str
    tipo: str = "carro"
    marca: Optional[str] = None
    modelo: Optional[str] = None
    anio: Optional[int] = None
    color: Optional[str] = None
    kilometraje_actual: int = 0
    activo: bool = True

class VehiculoCreate(VehiculoBase):
    pass

class VehiculoUpdate(BaseModel):
    placa: Optional[str] = None
    tipo: Optional[str] = None
    marca: Optional[str] = None
    modelo: Optional[str] = None
    anio: Optional[int] = None
    color: Optional[str] = None
    kilometraje_actual: Optional[int] = None
    activo: Optional[bool] = None

class VehiculoOut(VehiculoBase):
    id: int
    fecha_registro: datetime
    model_config = {"from_attributes": True}


class MecanicoBase(BaseModel):
    usuario_id: int
    taller_id: int
    especialidad: Optional[str] = None
    activo: bool = True

class MecanicoCreate(MecanicoBase):
    pass

class MecanicoUpdate(BaseModel):
    taller_id: Optional[int] = None
    especialidad: Optional[str] = None
    activo: Optional[bool] = None

class MecanicoOut(MecanicoBase):
    id: int
    model_config = {"from_attributes": True}


class TipoReparacionBase(BaseModel):
    taller_id: Optional[int] = None
    nombre: str
    descripcion: Optional[str] = None

class TipoReparacionCreate(TipoReparacionBase):
    pass

class TipoReparacionUpdate(BaseModel):
    taller_id: Optional[int] = None
    nombre: Optional[str] = None
    descripcion: Optional[str] = None

class TipoReparacionOut(TipoReparacionBase):
    id: int
    model_config = {"from_attributes": True}


class OrdenServicioBase(BaseModel):
    taller_id: int
    vehiculo_id: int
    cliente_id: int
    mecanico_id: Optional[int] = None
    tipo_reparacion_id: Optional[int] = None
    numero_orden: str
    estado: str = "Recibido"
    descripcion_problema: Optional[str] = None
    diagnostico_tecnico: Optional[str] = None
    costo_estimado: Optional[Decimal] = None
    costo_final: Optional[Decimal] = None
    kilometraje_ingreso: Optional[int] = None
    es_urgente: bool = False
    fecha_estimada_entrega: Optional[date] = None
    fecha_finalizacion: Optional[datetime] = None
    calificacion: Optional[int] = None
    comentario_cliente: Optional[str] = None

class OrdenServicioCreate(OrdenServicioBase):
    pass

class OrdenServicioUpdate(BaseModel):
    mecanico_id: Optional[int] = None
    tipo_reparacion_id: Optional[int] = None
    estado: Optional[str] = None
    descripcion_problema: Optional[str] = None
    diagnostico_tecnico: Optional[str] = None
    costo_estimado: Optional[Decimal] = None
    costo_final: Optional[Decimal] = None
    kilometraje_ingreso: Optional[int] = None
    es_urgente: Optional[bool] = None
    fecha_estimada_entrega: Optional[date] = None
    fecha_finalizacion: Optional[datetime] = None
    calificacion: Optional[int] = None
    comentario_cliente: Optional[str] = None

class OrdenServicioOut(OrdenServicioBase):
    id: int
    fecha_ingreso: datetime
    model_config = {"from_attributes": True}


class RepuestoOrdenBase(BaseModel):
    orden_id: int
    nombre_pieza: str
    cantidad: int = 1
    precio_unitario: Decimal

class RepuestoOrdenCreate(RepuestoOrdenBase):
    pass

class RepuestoOrdenUpdate(BaseModel):
    nombre_pieza: Optional[str] = None
    cantidad: Optional[int] = None
    precio_unitario: Optional[Decimal] = None

class RepuestoOrdenOut(RepuestoOrdenBase):
    id: int
    model_config = {"from_attributes": True}


class HistorialEstadoBase(BaseModel):
    orden_id: int
    usuario_id: Optional[int] = None
    estado_anterior: Optional[str] = None
    estado_nuevo: str
    observacion: Optional[str] = None

class HistorialEstadoCreate(HistorialEstadoBase):
    pass

class HistorialEstadoUpdate(BaseModel):
    observacion: Optional[str] = None

class HistorialEstadoOut(HistorialEstadoBase):
    id: int
    fecha_cambio: datetime
    model_config = {"from_attributes": True}


class MensajeBase(BaseModel):
    taller_id: int
    orden_id: Optional[int] = None
    remitente_id: int
    asunto: Optional[str] = None
    contenido: str
    leido: bool = False

class MensajeCreate(MensajeBase):
    pass

class MensajeUpdate(BaseModel):
    leido: Optional[bool] = None
    asunto: Optional[str] = None
    contenido: Optional[str] = None

class MensajeOut(MensajeBase):
    id: int
    fecha_envio: datetime
    model_config = {"from_attributes": True}


class ProximoServicioBase(BaseModel):
    vehiculo_id: int
    taller_id: int
    descripcion: str
    kilometraje_sugerido: Optional[int] = None
    fecha_sugerida: Optional[date] = None
    completado: bool = False

class ProximoServicioCreate(ProximoServicioBase):
    pass

class ProximoServicioUpdate(BaseModel):
    descripcion: Optional[str] = None
    kilometraje_sugerido: Optional[int] = None
    fecha_sugerida: Optional[date] = None
    completado: Optional[bool] = None

class ProximoServicioOut(ProximoServicioBase):
    id: int
    fecha_creacion: datetime
    model_config = {"from_attributes": True}


class ReporteIngresoBase(BaseModel):
    taller_id: int
    anio: int
    mes: int
    total_ingresos: Decimal = Decimal("0")
    total_ordenes: int = 0
    tiempo_promedio_horas: Optional[Decimal] = None
    satisfaccion_promedio: Optional[Decimal] = None

class ReporteIngresoCreate(ReporteIngresoBase):
    pass

class ReporteIngresoUpdate(BaseModel):
    total_ingresos: Optional[Decimal] = None
    total_ordenes: Optional[int] = None
    tiempo_promedio_horas: Optional[Decimal] = None
    satisfaccion_promedio: Optional[Decimal] = None

class ReporteIngresoOut(ReporteIngresoBase):
    id: int
    fecha_calculo: datetime
    model_config = {"from_attributes": True}


class ContactoWebBase(BaseModel):
    nombre: str
    telefono: Optional[str] = None
    correo: str
    asunto: Optional[str] = None
    mensaje: str
    atendido: bool = False

class ContactoWebCreate(ContactoWebBase):
    pass

class ContactoWebUpdate(BaseModel):
    atendido: Optional[bool] = None
    asunto: Optional[str] = None

class ContactoWebOut(ContactoWebBase):
    id: int
    fecha: datetime
    model_config = {"from_attributes": True}
