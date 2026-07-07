from sqlalchemy.orm import Session
from typing import Optional
from app import models, schemas, exceptions


def get_all(db: Session, skip=0, limit=100, taller_id: Optional[int] = None,
            leido: Optional[bool] = None, remitente_id: Optional[int] = None):
    q = db.query(models.Mensaje)
    if taller_id is not None:
        q = q.filter(models.Mensaje.taller_id == taller_id)
    if leido is not None:
        q = q.filter(models.Mensaje.leido == leido)
    if remitente_id is not None:
        q = q.filter(models.Mensaje.remitente_id == remitente_id)
    return q.order_by(models.Mensaje.fecha_envio.desc()).offset(skip).limit(limit).all()


def get_by_id(db: Session, mensaje_id: int):
    m = db.query(models.Mensaje).filter(models.Mensaje.id == mensaje_id).first()
    if m is None:
        raise exceptions.not_found("Mensaje", mensaje_id)
    return m


def create(db: Session, data: schemas.MensajeCreate):
    taller = db.query(models.Taller).filter(models.Taller.id == data.taller_id).first()
    if taller is None:
        raise exceptions.not_found("Taller", data.taller_id)
    remitente = db.query(models.Usuario).filter(models.Usuario.id == data.remitente_id).first()
    if remitente is None:
        raise exceptions.not_found("Usuario", data.remitente_id)
    m = models.Mensaje(**data.model_dump())
    db.add(m)
    db.commit()
    db.refresh(m)
    return m


def update(db: Session, mensaje_id: int, data: schemas.MensajeUpdate):
    m = get_by_id(db, mensaje_id)
    cambios = data.model_dump(exclude_unset=True)
    for campo in cambios:
        setattr(m, campo, cambios[campo])
    db.commit()
    db.refresh(m)
    return m


def delete(db: Session, mensaje_id: int):
    m = get_by_id(db, mensaje_id)
    db.delete(m)
    db.commit()
