from sqlalchemy.orm import Session
from typing import Optional
from app import models, schemas, exceptions

tipos_validos = ["carro", "moto"]


def get_all(db: Session, skip=0, limit=100, cliente_id: Optional[int] = None):
    q = db.query(models.Vehiculo)
    if cliente_id is not None:
        q = q.filter(models.Vehiculo.cliente_id == cliente_id)
    return q.offset(skip).limit(limit).all()


def get_by_id(db: Session, vehiculo_id: int):
    v = db.query(models.Vehiculo).filter(models.Vehiculo.id == vehiculo_id).first()
    if v is None:
        raise exceptions.not_found("Vehiculo", vehiculo_id)
    return v


def get_by_placa(db: Session, placa: str):
    v = db.query(models.Vehiculo).filter(models.Vehiculo.placa == placa.upper()).first()
    if v is None:
        raise exceptions.not_found("Vehiculo con placa", placa)
    return v


def create(db: Session, data: schemas.VehiculoCreate):
    if data.tipo not in tipos_validos:
        raise exceptions.valor_invalido("tipo", tipos_validos)
    placa = data.placa.upper()
    existe = db.query(models.Vehiculo).filter(models.Vehiculo.placa == placa).first()
    if existe:
        raise exceptions.already_exists("placa", placa)
    cliente = db.query(models.Cliente).filter(models.Cliente.id == data.cliente_id).first()
    if cliente is None:
        raise exceptions.not_found("Cliente", data.cliente_id)
    v = models.Vehiculo(**data.model_dump())
    v.placa = placa
    db.add(v)
    db.commit()
    db.refresh(v)
    return v


def update(db: Session, vehiculo_id: int, data: schemas.VehiculoUpdate):
    v = get_by_id(db, vehiculo_id)
    cambios = data.model_dump(exclude_unset=True)
    if "tipo" in cambios and cambios["tipo"] not in tipos_validos:
        raise exceptions.valor_invalido("tipo", tipos_validos)
    if "placa" in cambios:
        cambios["placa"] = cambios["placa"].upper()
    for campo in cambios:
        setattr(v, campo, cambios[campo])
    db.commit()
    db.refresh(v)
    return v


def delete(db: Session, vehiculo_id: int):
    v = get_by_id(db, vehiculo_id)
    db.delete(v)
    db.commit()
