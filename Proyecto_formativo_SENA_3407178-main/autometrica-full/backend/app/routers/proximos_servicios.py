from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app import schemas
from app.controllers import proximos_servicios_ctrl

router = APIRouter(prefix="/proximos-servicios", tags=["ProximosServicios"])


@router.get("/", response_model=List[schemas.ProximoServicioOut])
def listar_proximos(skip: int = 0, limit: int = 100, vehiculo_id: Optional[int] = None,
                    taller_id: Optional[int] = None, completado: Optional[bool] = None,
                    db: Session = Depends(get_db)):
    return proximos_servicios_ctrl.get_all(db, skip, limit, vehiculo_id, taller_id, completado)


@router.get("/{servicio_id}", response_model=schemas.ProximoServicioOut)
def obtener_proximo(servicio_id: int, db: Session = Depends(get_db)):
    return proximos_servicios_ctrl.get_by_id(db, servicio_id)


@router.post("/", response_model=schemas.ProximoServicioOut, status_code=status.HTTP_201_CREATED)
def crear_proximo(data: schemas.ProximoServicioCreate, db: Session = Depends(get_db)):
    return proximos_servicios_ctrl.create(db, data)


@router.put("/{servicio_id}", response_model=schemas.ProximoServicioOut)
def actualizar_proximo(servicio_id: int, data: schemas.ProximoServicioUpdate, db: Session = Depends(get_db)):
    return proximos_servicios_ctrl.update(db, servicio_id, data)


@router.delete("/{servicio_id}", status_code=status.HTTP_204_NO_CONTENT)
def eliminar_proximo(servicio_id: int, db: Session = Depends(get_db)):
    proximos_servicios_ctrl.delete(db, servicio_id)
