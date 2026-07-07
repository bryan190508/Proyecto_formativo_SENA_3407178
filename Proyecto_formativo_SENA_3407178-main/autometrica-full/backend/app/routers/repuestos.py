from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app import schemas
from app.controllers import repuestos_ctrl

router = APIRouter(prefix="/repuestos", tags=["Repuestos"])


@router.get("/", response_model=List[schemas.RepuestoOrdenOut])
def listar_repuestos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return repuestos_ctrl.get_all(db, skip, limit)


@router.get("/orden/{orden_id}", response_model=List[schemas.RepuestoOrdenOut])
def repuestos_por_orden(orden_id: int, db: Session = Depends(get_db)):
    return repuestos_ctrl.get_by_orden(db, orden_id)


@router.get("/{repuesto_id}", response_model=schemas.RepuestoOrdenOut)
def obtener_repuesto(repuesto_id: int, db: Session = Depends(get_db)):
    return repuestos_ctrl.get_by_id(db, repuesto_id)


@router.post("/", response_model=schemas.RepuestoOrdenOut, status_code=status.HTTP_201_CREATED)
def agregar_repuesto(data: schemas.RepuestoOrdenCreate, db: Session = Depends(get_db)):
    return repuestos_ctrl.create(db, data)


@router.put("/{repuesto_id}", response_model=schemas.RepuestoOrdenOut)
def actualizar_repuesto(repuesto_id: int, data: schemas.RepuestoOrdenUpdate, db: Session = Depends(get_db)):
    return repuestos_ctrl.update(db, repuesto_id, data)


@router.delete("/{repuesto_id}", status_code=status.HTTP_204_NO_CONTENT)
def eliminar_repuesto(repuesto_id: int, db: Session = Depends(get_db)):
    repuestos_ctrl.delete(db, repuesto_id)
