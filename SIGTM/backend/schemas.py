from pydantic import BaseModel

# ==================
# USUARIO
# ==================

class UsuarioCreate(BaseModel):
    nombre:str
    correo:str
    password:str
    rol:str

class UsuarioResponse(UsuarioCreate):
    id:int

    class Config:
        from_attributes=True

# ==================
# VEHICULO
# ==================

class VehiculoCreate(BaseModel):
    placa:str
    marca:str
    modelo:str
    usuario_id:int

# ==================
# ORDEN
# ==================

class OrdenCreate(BaseModel):
    fecha:str
    estado:str
    diagnostico:str
    vehiculo_id:int

# ==================
# PIEZA
# ==================

class PiezaCreate(BaseModel):
    nombre:str
    precio:int
    descripcion:str
    motivo_cambio:str
    orden_id:int

# ==================
# HISTORIAL
# ==================

class HistorialCreate(BaseModel):
    fecha:str
    detalle:str
    orden_id:int