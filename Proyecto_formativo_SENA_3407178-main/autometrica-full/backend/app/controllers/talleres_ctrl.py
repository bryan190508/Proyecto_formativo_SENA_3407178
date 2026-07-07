from sqlalchemy.orm import Session
from app import models, schemas, exceptions


def get_all(db: Session, skip=0, limit=100):
    talleres = db.query(models.Taller).offset(skip).limit(limit).all()
    return talleres


def get_by_id(db: Session, taller_id: int):
    taller = db.query(models.Taller).filter(models.Taller.id == taller_id).first()
    if taller is None:
        raise exceptions.not_found("Taller", taller_id)
    return taller


def create(db: Session, data: schemas.TallerCreate):
    if data.correo is not None:
        existe = db.query(models.Taller).filter(models.Taller.correo == data.correo).first()
        if existe:
            raise exceptions.already_exists("correo", data.correo)
    if data.nit is not None:
        existe_nit = db.query(models.Taller).filter(models.Taller.nit == data.nit).first()
        if existe_nit:
            raise exceptions.already_exists("NIT", data.nit)
    nuevo = models.Taller(**data.model_dump())
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo


def update(db: Session, taller_id: int, data: schemas.TallerUpdate):
    taller = get_by_id(db, taller_id)
    cambios = data.model_dump(exclude_unset=True)
    for key in cambios:
        setattr(taller, key, cambios[key])
    db.commit()
    db.refresh(taller)
    return taller


def delete(db: Session, taller_id: int):
    taller = get_by_id(db, taller_id)
    db.delete(taller)
    db.commit()
