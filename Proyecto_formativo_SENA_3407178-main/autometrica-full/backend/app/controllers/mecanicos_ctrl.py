from sqlalchemy.orm import Session
from typing import Optional
from app import models, schemas, exceptions


def get_all(db: Session, skip=0, limit=100, taller_id: Optional[int] = None):
    q = db.query(models.Mecanico)
    if taller_id is not None:
        q = q.filter(models.Mecanico.taller_id == taller_id)
    return q.offset(skip).limit(limit).all()


def get_by_id(db: Session, mecanico_id: int):
    m = db.query(models.Mecanico).filter(models.Mecanico.id == mecanico_id).first()
    if m is None:
        raise exceptions.not_found("Mecanico", mecanico_id)
    return m


def create(db: Session, data: schemas.MecanicoCreate):
    ya_existe = db.query(models.Mecanico).filter(models.Mecanico.usuario_id == data.usuario_id).first()
    if ya_existe:
        raise exceptions.already_exists("usuario_id", data.usuario_id)
    usuario = db.query(models.Usuario).filter(models.Usuario.id == data.usuario_id).first()
    if usuario is None:
        raise exceptions.not_found("Usuario", data.usuario_id)
    if usuario.rol != "mecanico":
        raise exceptions.bad_request("El usuario necesita rol mecanico")
    taller = db.query(models.Taller).filter(models.Taller.id == data.taller_id).first()
    if taller is None:
        raise exceptions.not_found("Taller", data.taller_id)
    m = models.Mecanico(**data.model_dump())
    db.add(m)
    db.commit()
    db.refresh(m)
    return m


def update(db: Session, mecanico_id: int, data: schemas.MecanicoUpdate):
    m = get_by_id(db, mecanico_id)
    cambios = data.model_dump(exclude_unset=True)
    for campo in cambios:
        setattr(m, campo, cambios[campo])
    db.commit()
    db.refresh(m)
    return m


def delete(db: Session, mecanico_id: int):
    m = get_by_id(db, mecanico_id)
    db.delete(m)
    db.commit()
