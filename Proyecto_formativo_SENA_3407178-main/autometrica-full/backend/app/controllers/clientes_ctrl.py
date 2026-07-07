from sqlalchemy.orm import Session
from app import models, schemas, exceptions


def get_all(db: Session, skip=0, limit=100):
    return db.query(models.Cliente).offset(skip).limit(limit).all()


def get_by_id(db: Session, cliente_id: int):
    cliente = db.query(models.Cliente).filter(models.Cliente.id == cliente_id).first()
    if cliente is None:
        raise exceptions.not_found("Cliente", cliente_id)
    return cliente


def get_by_usuario(db: Session, usuario_id: int):
    cliente = db.query(models.Cliente).filter(models.Cliente.usuario_id == usuario_id).first()
    if cliente is None:
        raise exceptions.not_found("Cliente", usuario_id)
    return cliente


def create(db: Session, data: schemas.ClienteCreate):
    ya_existe = db.query(models.Cliente).filter(models.Cliente.usuario_id == data.usuario_id).first()
    if ya_existe:
        raise exceptions.already_exists("usuario_id", data.usuario_id)
    if data.cedula is not None:
        cedula_usada = db.query(models.Cliente).filter(models.Cliente.cedula == data.cedula).first()
        if cedula_usada:
            raise exceptions.already_exists("cedula", data.cedula)
    usuario = db.query(models.Usuario).filter(models.Usuario.id == data.usuario_id).first()
    if usuario is None:
        raise exceptions.not_found("Usuario", data.usuario_id)
    if usuario.rol != "cliente":
        raise exceptions.bad_request("El usuario debe tener rol cliente")
    cliente = models.Cliente(**data.model_dump())
    db.add(cliente)
    db.commit()
    db.refresh(cliente)
    return cliente


def update(db: Session, cliente_id: int, data: schemas.ClienteUpdate):
    cliente = get_by_id(db, cliente_id)
    cambios = data.model_dump(exclude_unset=True)
    for k in cambios:
        setattr(cliente, k, cambios[k])
    db.commit()
    db.refresh(cliente)
    return cliente


def delete(db: Session, cliente_id: int):
    cliente = get_by_id(db, cliente_id)
    db.delete(cliente)
    db.commit()
