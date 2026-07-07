from sqlalchemy.orm import Session
from typing import Optional
from app import models, schemas, exceptions

roles_validos = ["admin", "mecanico", "cliente"]


def get_all(db: Session, skip=0, limit=100, rol: Optional[str] = None):
    query = db.query(models.Usuario)
    if rol is not None:
        query = query.filter(models.Usuario.rol == rol)
    return query.offset(skip).limit(limit).all()


def get_by_id(db: Session, usuario_id: int):
    u = db.query(models.Usuario).filter(models.Usuario.id == usuario_id).first()
    if u is None:
        raise exceptions.not_found("Usuario", usuario_id)
    return u


def get_by_correo(db: Session, correo: str):
    u = db.query(models.Usuario).filter(models.Usuario.correo == correo).first()
    if u is None:
        raise exceptions.not_found("Usuario", correo)
    return u


def login(db: Session, correo: str, password: str):
    u = db.query(models.Usuario).filter(models.Usuario.correo == correo).first()
    if u is None or u.contrasena_hash != password:
        raise exceptions.bad_request("Correo o contraseña incorrectos")
    return u


def create(db: Session, data: schemas.UsuarioCreate):
    if data.rol not in roles_validos:
        raise exceptions.valor_invalido("rol", roles_validos)
    existe = db.query(models.Usuario).filter(models.Usuario.correo == data.correo).first()
    if existe:
        raise exceptions.already_exists("correo", data.correo)
    u = models.Usuario(**data.model_dump())
    db.add(u)
    db.commit()
    db.refresh(u)
    return u


def update(db: Session, usuario_id: int, data: schemas.UsuarioUpdate):
    u = get_by_id(db, usuario_id)
    cambios = data.model_dump(exclude_unset=True)
    if "rol" in cambios:
        if cambios["rol"] not in roles_validos:
            raise exceptions.valor_invalido("rol", roles_validos)
    for campo in cambios:
        setattr(u, campo, cambios[campo])
    db.commit()
    db.refresh(u)
    return u


def delete(db: Session, usuario_id: int):
    u = get_by_id(db, usuario_id)
    db.delete(u)
    db.commit()
