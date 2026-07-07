from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app import schemas
from app.controllers import talleres_ctrl

router = APIRouter(prefix="/talleres", tags=["Talleres"])


@router.get("/", response_model=List[schemas.TallerOut])
def listar_talleres(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return talleres_ctrl.get_all(db, skip, limit)


@router.get("/{taller_id}", response_model=schemas.TallerOut)
def obtener_taller(taller_id: int, db: Session = Depends(get_db)):
    return talleres_ctrl.get_by_id(db, taller_id)


@router.post("/", response_model=schemas.TallerOut, status_code=status.HTTP_201_CREATED)
def crear_taller(data: schemas.TallerCreate, db: Session = Depends(get_db)):
    return talleres_ctrl.create(db, data)


@router.put("/{taller_id}", response_model=schemas.TallerOut)
def actualizar_taller(taller_id: int, data: schemas.TallerUpdate, db: Session = Depends(get_db)):
    return talleres_ctrl.update(db, taller_id, data)


@router.delete("/{taller_id}", status_code=status.HTTP_204_NO_CONTENT)
def eliminar_taller(taller_id: int, db: Session = Depends(get_db)):
    talleres_ctrl.delete(db, taller_id)
