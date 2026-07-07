from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app import schemas
from app.controllers import historial_ctrl

router = APIRouter(prefix="/historial-estados", tags=["Historial"])


@router.get("/", response_model=List[schemas.HistorialEstadoOut])
def listar_historial(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return historial_ctrl.get_all(db, skip, limit)


@router.get("/orden/{orden_id}", response_model=List[schemas.HistorialEstadoOut])
def historial_por_orden(orden_id: int, db: Session = Depends(get_db)):
    return historial_ctrl.get_by_orden(db, orden_id)


@router.get("/{historial_id}", response_model=schemas.HistorialEstadoOut)
def obtener_historial(historial_id: int, db: Session = Depends(get_db)):
    return historial_ctrl.get_by_id(db, historial_id)


@router.post("/", response_model=schemas.HistorialEstadoOut, status_code=status.HTTP_201_CREATED)
def registrar_cambio(data: schemas.HistorialEstadoCreate, db: Session = Depends(get_db)):
    return historial_ctrl.create(db, data)


@router.put("/{historial_id}", response_model=schemas.HistorialEstadoOut)
def actualizar_historial(historial_id: int, data: schemas.HistorialEstadoUpdate, db: Session = Depends(get_db)):
    return historial_ctrl.update(db, historial_id, data)


@router.delete("/{historial_id}", status_code=status.HTTP_204_NO_CONTENT)
def eliminar_historial(historial_id: int, db: Session = Depends(get_db)):
    historial_ctrl.delete(db, historial_id)
