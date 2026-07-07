from sqlalchemy.orm import Session
from app import models, schemas, exceptions


def get_all(db: Session, skip=0, limit=100):
    return db.query(models.HistorialEstado).offset(skip).limit(limit).all()


def get_by_id(db: Session, historial_id: int):
    h = db.query(models.HistorialEstado).filter(models.HistorialEstado.id == historial_id).first()
    if h is None:
        raise exceptions.not_found("HistorialEstado", historial_id)
    return h


def get_by_orden(db: Session, orden_id: int):
    orden = db.query(models.OrdenServicio).filter(models.OrdenServicio.id == orden_id).first()
    if orden is None:
        raise exceptions.not_found("OrdenServicio", orden_id)
    resultado = db.query(models.HistorialEstado).filter(
        models.HistorialEstado.orden_id == orden_id
    ).order_by(models.HistorialEstado.fecha_cambio.asc()).all()
    return resultado


def create(db: Session, data: schemas.HistorialEstadoCreate):
    orden = db.query(models.OrdenServicio).filter(models.OrdenServicio.id == data.orden_id).first()
    if orden is None:
        raise exceptions.not_found("OrdenServicio", data.orden_id)
    h = models.HistorialEstado(**data.model_dump())
    db.add(h)
    db.commit()
    db.refresh(h)
    return h


def update(db: Session, historial_id: int, data: schemas.HistorialEstadoUpdate):
    h = get_by_id(db, historial_id)
    cambios = data.model_dump(exclude_unset=True)
    for campo in cambios:
        setattr(h, campo, cambios[campo])
    db.commit()
    db.refresh(h)
    return h


def delete(db: Session, historial_id: int):
    h = get_by_id(db, historial_id)
    db.delete(h)
    db.commit()
