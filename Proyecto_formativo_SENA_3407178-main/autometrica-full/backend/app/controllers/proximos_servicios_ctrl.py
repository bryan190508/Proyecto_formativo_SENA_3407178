from sqlalchemy.orm import Session
from typing import Optional
from app import models, schemas, exceptions


def get_all(db: Session, skip=0, limit=100, vehiculo_id: Optional[int] = None,
            taller_id: Optional[int] = None, completado: Optional[bool] = None):
    q = db.query(models.ProximoServicio)
    if vehiculo_id is not None:
        q = q.filter(models.ProximoServicio.vehiculo_id == vehiculo_id)
    if taller_id is not None:
        q = q.filter(models.ProximoServicio.taller_id == taller_id)
    if completado is not None:
        q = q.filter(models.ProximoServicio.completado == completado)
    return q.offset(skip).limit(limit).all()


def get_by_id(db: Session, servicio_id: int):
    s = db.query(models.ProximoServicio).filter(models.ProximoServicio.id == servicio_id).first()
    if s is None:
        raise exceptions.not_found("ProximoServicio", servicio_id)
    return s


def create(db: Session, data: schemas.ProximoServicioCreate):
    vehiculo = db.query(models.Vehiculo).filter(models.Vehiculo.id == data.vehiculo_id).first()
    if vehiculo is None:
        raise exceptions.not_found("Vehiculo", data.vehiculo_id)
    taller = db.query(models.Taller).filter(models.Taller.id == data.taller_id).first()
    if taller is None:
        raise exceptions.not_found("Taller", data.taller_id)
    s = models.ProximoServicio(**data.model_dump())
    db.add(s)
    db.commit()
    db.refresh(s)
    return s


def update(db: Session, servicio_id: int, data: schemas.ProximoServicioUpdate):
    s = get_by_id(db, servicio_id)
    cambios = data.model_dump(exclude_unset=True)
    for campo in cambios:
        setattr(s, campo, cambios[campo])
    db.commit()
    db.refresh(s)
    return s


def delete(db: Session, servicio_id: int):
    s = get_by_id(db, servicio_id)
    db.delete(s)
    db.commit()
