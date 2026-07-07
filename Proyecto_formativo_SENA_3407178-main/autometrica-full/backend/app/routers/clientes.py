from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app import schemas
from app.controllers import clientes_ctrl

router = APIRouter(prefix="/clientes", tags=["Clientes"])


@router.get("/", response_model=List[schemas.ClienteOut])
def listar_clientes(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return clientes_ctrl.get_all(db, skip, limit)


@router.get("/usuario/{usuario_id}", response_model=schemas.ClienteOut)
def obtener_por_usuario(usuario_id: int, db: Session = Depends(get_db)):
    return clientes_ctrl.get_by_usuario(db, usuario_id)


@router.get("/{cliente_id}", response_model=schemas.ClienteOut)
def obtener_cliente(cliente_id: int, db: Session = Depends(get_db)):
    return clientes_ctrl.get_by_id(db, cliente_id)


@router.post("/", response_model=schemas.ClienteOut, status_code=status.HTTP_201_CREATED)
def crear_cliente(data: schemas.ClienteCreate, db: Session = Depends(get_db)):
    return clientes_ctrl.create(db, data)


@router.put("/{cliente_id}", response_model=schemas.ClienteOut)
def actualizar_cliente(cliente_id: int, data: schemas.ClienteUpdate, db: Session = Depends(get_db)):
    return clientes_ctrl.update(db, cliente_id, data)


@router.delete("/{cliente_id}", status_code=status.HTTP_204_NO_CONTENT)
def eliminar_cliente(cliente_id: int, db: Session = Depends(get_db)):
    clientes_ctrl.delete(db, cliente_id)
