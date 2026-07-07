from sqlalchemy.orm import Session
from typing import Optional
from app import models, schemas, exceptions


def get_all(db: Session, skip=0, limit=100, atendido: Optional[bool] = None):
    q = db.query(models.ContactoWeb)
    if atendido is not None:
        q = q.filter(models.ContactoWeb.atendido == atendido)
    return q.order_by(models.ContactoWeb.fecha.desc()).offset(skip).limit(limit).all()


def get_by_id(db: Session, contacto_id: int):
    c = db.query(models.ContactoWeb).filter(models.ContactoWeb.id == contacto_id).first()
    if c is None:
        raise exceptions.not_found("ContactoWeb", contacto_id)
    return c


def create(db: Session, data: schemas.ContactoWebCreate):
    c = models.ContactoWeb(**data.model_dump())
    db.add(c)
    db.commit()
    db.refresh(c)
    return c


def update(db: Session, contacto_id: int, data: schemas.ContactoWebUpdate):
    c = get_by_id(db, contacto_id)
    cambios = data.model_dump(exclude_unset=True)
    for campo in cambios:
        setattr(c, campo, cambios[campo])
    db.commit()
    db.refresh(c)
    return c


def delete(db: Session, contacto_id: int):
    c = get_by_id(db, contacto_id)
    db.delete(c)
    db.commit()
