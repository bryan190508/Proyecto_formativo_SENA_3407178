from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app import schemas
from app.controllers import mecanicos_ctrl

router = APIRouter(prefix="/mecanicos", tags=["Mecanicos"])


@router.get("/", response_model=List[schemas.MecanicoOut])
def listar_mecanicos(skip: int = 0, limit: int = 100, taller_id: Optional[int] = None, db: Session = Depends(get_db)):
    return mecanicos_ctrl.get_all(db, skip, limit, taller_id)


@router.get("/{mecanico_id}", response_model=schemas.MecanicoOut)
def obtener_mecanico(mecanico_id: int, db: Session = Depends(get_db)):
    return mecanicos_ctrl.get_by_id(db, mecanico_id)


@router.post("/", response_model=schemas.MecanicoOut, status_code=status.HTTP_201_CREATED)
def crear_mecanico(data: schemas.MecanicoCreate, db: Session = Depends(get_db)):
    return mecanicos_ctrl.create(db, data)


@router.put("/{mecanico_id}", response_model=schemas.MecanicoOut)
def actualizar_mecanico(mecanico_id: int, data: schemas.MecanicoUpdate, db: Session = Depends(get_db)):
    return mecanicos_ctrl.update(db, mecanico_id, data)


@router.delete("/{mecanico_id}", status_code=status.HTTP_204_NO_CONTENT)
def eliminar_mecanico(mecanico_id: int, db: Session = Depends(get_db)):
    mecanicos_ctrl.delete(db, mecanico_id)
