from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app import schemas
from app.controllers import vehiculos_ctrl

router = APIRouter(prefix="/vehiculos", tags=["Vehiculos"])


@router.get("/", response_model=List[schemas.VehiculoOut])
def listar_vehiculos(skip: int = 0, limit: int = 100, cliente_id: Optional[int] = None, db: Session = Depends(get_db)):
    return vehiculos_ctrl.get_all(db, skip, limit, cliente_id)


@router.get("/placa/{placa}", response_model=schemas.VehiculoOut)
def obtener_por_placa(placa: str, db: Session = Depends(get_db)):
    return vehiculos_ctrl.get_by_placa(db, placa)


@router.get("/{vehiculo_id}", response_model=schemas.VehiculoOut)
def obtener_vehiculo(vehiculo_id: int, db: Session = Depends(get_db)):
    return vehiculos_ctrl.get_by_id(db, vehiculo_id)


@router.post("/", response_model=schemas.VehiculoOut, status_code=status.HTTP_201_CREATED)
def crear_vehiculo(data: schemas.VehiculoCreate, db: Session = Depends(get_db)):
    return vehiculos_ctrl.create(db, data)


@router.put("/{vehiculo_id}", response_model=schemas.VehiculoOut)
def actualizar_vehiculo(vehiculo_id: int, data: schemas.VehiculoUpdate, db: Session = Depends(get_db)):
    return vehiculos_ctrl.update(db, vehiculo_id, data)


@router.delete("/{vehiculo_id}", status_code=status.HTTP_204_NO_CONTENT)
def eliminar_vehiculo(vehiculo_id: int, db: Session = Depends(get_db)):
    vehiculos_ctrl.delete(db, vehiculo_id)
