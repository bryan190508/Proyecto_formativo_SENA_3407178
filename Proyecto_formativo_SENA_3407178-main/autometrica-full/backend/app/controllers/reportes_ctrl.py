from sqlalchemy.orm import Session
from typing import Optional
from app import models, schemas, exceptions


def get_all(db: Session, skip=0, limit=100, taller_id: Optional[int] = None, anio: Optional[int] = None):
    q = db.query(models.ReporteIngreso)
    if taller_id is not None:
        q = q.filter(models.ReporteIngreso.taller_id == taller_id)
    if anio is not None:
        q = q.filter(models.ReporteIngreso.anio == anio)
    return q.order_by(models.ReporteIngreso.anio.desc(), models.ReporteIngreso.mes.desc()).offset(skip).limit(limit).all()


def get_by_id(db: Session, reporte_id: int):
    r = db.query(models.ReporteIngreso).filter(models.ReporteIngreso.id == reporte_id).first()
    if r is None:
        raise exceptions.not_found("ReporteIngreso", reporte_id)
    return r


def get_by_taller_periodo(db: Session, taller_id: int, anio: int, mes: int):
    r = db.query(models.ReporteIngreso).filter(
        models.ReporteIngreso.taller_id == taller_id,
        models.ReporteIngreso.anio == anio,
        models.ReporteIngreso.mes == mes
    ).first()
    if r is None:
        raise exceptions.not_found(f"Reporte del taller {taller_id} para {anio}/{mes}")
    return r


def create(db: Session, data: schemas.ReporteIngresoCreate):
    if data.mes < 1 or data.mes > 12:
        raise exceptions.bad_request("El mes debe ser entre 1 y 12")
    taller = db.query(models.Taller).filter(models.Taller.id == data.taller_id).first()
    if taller is None:
        raise exceptions.not_found("Taller", data.taller_id)
    ya_existe = db.query(models.ReporteIngreso).filter(
        models.ReporteIngreso.taller_id == data.taller_id,
        models.ReporteIngreso.anio == data.anio,
        models.ReporteIngreso.mes == data.mes
    ).first()
    if ya_existe:
        raise exceptions.conflict(f"Ya hay un reporte para el taller {data.taller_id} en {data.anio}/{data.mes}")
    r = models.ReporteIngreso(**data.model_dump())
    db.add(r)
    db.commit()
    db.refresh(r)
    return r


def update(db: Session, reporte_id: int, data: schemas.ReporteIngresoUpdate):
    r = get_by_id(db, reporte_id)
    cambios = data.model_dump(exclude_unset=True)
    for campo in cambios:
        setattr(r, campo, cambios[campo])
    db.commit()
    db.refresh(r)
    return r


def delete(db: Session, reporte_id: int):
    r = get_by_id(db, reporte_id)
    db.delete(r)
    db.commit()
