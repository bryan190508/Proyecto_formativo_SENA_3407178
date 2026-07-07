from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app import schemas
from app.controllers import tipos_reparacion_ctrl

router = APIRouter(prefix="/tipos-reparacion", tags=["TiposReparacion"])


@router.get("/", response_model=List[schemas.TipoReparacionOut])
def listar_tipos(skip: int = 0, limit: int = 100, taller_id: Optional[int] = None, db: Session = Depends(get_db)):
    return tipos_reparacion_ctrl.get_all(db, skip, limit, taller_id)


@router.get("/{tipo_id}", response_model=schemas.TipoReparacionOut)
def obtener_tipo(tipo_id: int, db: Session = Depends(get_db)):
    return tipos_reparacion_ctrl.get_by_id(db, tipo_id)


@router.post("/", response_model=schemas.TipoReparacionOut, status_code=status.HTTP_201_CREATED)
def crear_tipo(data: schemas.TipoReparacionCreate, db: Session = Depends(get_db)):
    return tipos_reparacion_ctrl.create(db, data)


@router.put("/{tipo_id}", response_model=schemas.TipoReparacionOut)
def actualizar_tipo(tipo_id: int, data: schemas.TipoReparacionUpdate, db: Session = Depends(get_db)):
    return tipos_reparacion_ctrl.update(db, tipo_id, data)


@router.delete("/{tipo_id}", status_code=status.HTTP_204_NO_CONTENT)
def eliminar_tipo(tipo_id: int, db: Session = Depends(get_db)):
    tipos_reparacion_ctrl.delete(db, tipo_id)
