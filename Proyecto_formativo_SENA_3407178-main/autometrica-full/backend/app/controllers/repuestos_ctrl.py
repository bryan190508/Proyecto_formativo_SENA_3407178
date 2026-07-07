from sqlalchemy.orm import Session
from app import models, schemas, exceptions


def get_all(db: Session, skip=0, limit=100):
    return db.query(models.RepuestoOrden).offset(skip).limit(limit).all()


def get_by_id(db: Session, repuesto_id: int):
    r = db.query(models.RepuestoOrden).filter(models.RepuestoOrden.id == repuesto_id).first()
    if r is None:
        raise exceptions.not_found("Repuesto", repuesto_id)
    return r


def get_by_orden(db: Session, orden_id: int):
    orden = db.query(models.OrdenServicio).filter(models.OrdenServicio.id == orden_id).first()
    if orden is None:
        raise exceptions.not_found("OrdenServicio", orden_id)
    return db.query(models.RepuestoOrden).filter(models.RepuestoOrden.orden_id == orden_id).all()


def create(db: Session, data: schemas.RepuestoOrdenCreate):
    orden = db.query(models.OrdenServicio).filter(models.OrdenServicio.id == data.orden_id).first()
    if orden is None:
        raise exceptions.not_found("OrdenServicio", data.orden_id)
    if data.cantidad < 1:
        raise exceptions.bad_request("La cantidad minima es 1")
    if data.precio_unitario <= 0:
        raise exceptions.bad_request("El precio debe ser mayor a 0")
    r = models.RepuestoOrden(**data.model_dump())
    db.add(r)
    db.commit()
    db.refresh(r)
    return r


def update(db: Session, repuesto_id: int, data: schemas.RepuestoOrdenUpdate):
    r = get_by_id(db, repuesto_id)
    cambios = data.model_dump(exclude_unset=True)
    if "cantidad" in cambios and cambios["cantidad"] < 1:
        raise exceptions.bad_request("La cantidad minima es 1")
    if "precio_unitario" in cambios and cambios["precio_unitario"] <= 0:
        raise exceptions.bad_request("El precio debe ser mayor a 0")
    for campo in cambios:
        setattr(r, campo, cambios[campo])
    db.commit()
    db.refresh(r)
    return r


def delete(db: Session, repuesto_id: int):
    r = get_by_id(db, repuesto_id)
    db.delete(r)
    db.commit()
