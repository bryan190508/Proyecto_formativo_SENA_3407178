from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app import schemas
from app.controllers import ordenes_ctrl

router = APIRouter(prefix="/ordenes", tags=["Ordenes"])


@router.get("/", response_model=List[schemas.OrdenServicioOut])
def listar_ordenes(skip: int = 0, limit: int = 100, taller_id: Optional[int] = None,
                   estado: Optional[str] = None, es_urgente: Optional[bool] = None,
                   cliente_id: Optional[int] = None, mecanico_id: Optional[int] = None,
                   db: Session = Depends(get_db)):
    return ordenes_ctrl.get_all(db, skip, limit, taller_id, estado, es_urgente, cliente_id, mecanico_id)


@router.get("/numero/{numero_orden}", response_model=schemas.OrdenServicioOut)
def obtener_por_numero(numero_orden: str, db: Session = Depends(get_db)):
    return ordenes_ctrl.get_by_numero(db, numero_orden)


@router.get("/{orden_id}", response_model=schemas.OrdenServicioOut)
def obtener_orden(orden_id: int, db: Session = Depends(get_db)):
    return ordenes_ctrl.get_by_id(db, orden_id)


@router.post("/", response_model=schemas.OrdenServicioOut, status_code=status.HTTP_201_CREATED)
def crear_orden(data: schemas.OrdenServicioCreate, db: Session = Depends(get_db)):
    return ordenes_ctrl.create(db, data)


@router.put("/{orden_id}", response_model=schemas.OrdenServicioOut)
def actualizar_orden(orden_id: int, data: schemas.OrdenServicioUpdate, db: Session = Depends(get_db)):
    return ordenes_ctrl.update(db, orden_id, data)


@router.delete("/{orden_id}", status_code=status.HTTP_204_NO_CONTENT)
def eliminar_orden(orden_id: int, db: Session = Depends(get_db)):
    ordenes_ctrl.delete(db, orden_id)
