from sqlalchemy.orm import Session
from typing import Optional
from app import models, schemas, exceptions


def get_all(db: Session, skip=0, limit=100, taller_id: Optional[int] = None):
    q = db.query(models.TipoReparacion)
    if taller_id is not None:
        q = q.filter(
            (models.TipoReparacion.taller_id == taller_id) |
            (models.TipoReparacion.taller_id == None)
        )
    return q.offset(skip).limit(limit).all()


def get_by_id(db: Session, tipo_id: int):
    t = db.query(models.TipoReparacion).filter(models.TipoReparacion.id == tipo_id).first()
    if t is None:
        raise exceptions.not_found("TipoReparacion", tipo_id)
    return t


def create(db: Session, data: schemas.TipoReparacionCreate):
    t = models.TipoReparacion(**data.model_dump())
    db.add(t)
    db.commit()
    db.refresh(t)
    return t


def update(db: Session, tipo_id: int, data: schemas.TipoReparacionUpdate):
    t = get_by_id(db, tipo_id)
    cambios = data.model_dump(exclude_unset=True)
    for campo in cambios:
        setattr(t, campo, cambios[campo])
    db.commit()
    db.refresh(t)
    return t


def delete(db: Session, tipo_id: int):
    t = get_by_id(db, tipo_id)
    db.delete(t)
    db.commit()
