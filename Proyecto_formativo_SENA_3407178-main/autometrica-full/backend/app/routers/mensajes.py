from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app import schemas
from app.controllers import mensajes_ctrl

router = APIRouter(prefix="/mensajes", tags=["Mensajes"])


@router.get("/", response_model=List[schemas.MensajeOut])
def listar_mensajes(skip: int = 0, limit: int = 100, taller_id: Optional[int] = None,
                    leido: Optional[bool] = None, remitente_id: Optional[int] = None,
                    db: Session = Depends(get_db)):
    return mensajes_ctrl.get_all(db, skip, limit, taller_id, leido, remitente_id)


@router.get("/{mensaje_id}", response_model=schemas.MensajeOut)
def obtener_mensaje(mensaje_id: int, db: Session = Depends(get_db)):
    return mensajes_ctrl.get_by_id(db, mensaje_id)


@router.post("/", response_model=schemas.MensajeOut, status_code=status.HTTP_201_CREATED)
def enviar_mensaje(data: schemas.MensajeCreate, db: Session = Depends(get_db)):
    return mensajes_ctrl.create(db, data)


@router.put("/{mensaje_id}", response_model=schemas.MensajeOut)
def actualizar_mensaje(mensaje_id: int, data: schemas.MensajeUpdate, db: Session = Depends(get_db)):
    return mensajes_ctrl.update(db, mensaje_id, data)


@router.delete("/{mensaje_id}", status_code=status.HTTP_204_NO_CONTENT)
def eliminar_mensaje(mensaje_id: int, db: Session = Depends(get_db)):
    mensajes_ctrl.delete(db, mensaje_id)
