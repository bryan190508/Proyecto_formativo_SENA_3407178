from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app import schemas
from app.controllers import reportes_ctrl

router = APIRouter(prefix="/reportes-ingresos", tags=["Reportes"])


@router.get("/", response_model=List[schemas.ReporteIngresoOut])
def listar_reportes(skip: int = 0, limit: int = 100, taller_id: Optional[int] = None,
                    anio: Optional[int] = None, db: Session = Depends(get_db)):
    return reportes_ctrl.get_all(db, skip, limit, taller_id, anio)


@router.get("/taller/{taller_id}/periodo/{anio}/{mes}", response_model=schemas.ReporteIngresoOut)
def obtener_por_periodo(taller_id: int, anio: int, mes: int, db: Session = Depends(get_db)):
    return reportes_ctrl.get_by_taller_periodo(db, taller_id, anio, mes)


@router.get("/{reporte_id}", response_model=schemas.ReporteIngresoOut)
def obtener_reporte(reporte_id: int, db: Session = Depends(get_db)):
    return reportes_ctrl.get_by_id(db, reporte_id)


@router.post("/", response_model=schemas.ReporteIngresoOut, status_code=status.HTTP_201_CREATED)
def crear_reporte(data: schemas.ReporteIngresoCreate, db: Session = Depends(get_db)):
    return reportes_ctrl.create(db, data)


@router.put("/{reporte_id}", response_model=schemas.ReporteIngresoOut)
def actualizar_reporte(reporte_id: int, data: schemas.ReporteIngresoUpdate, db: Session = Depends(get_db)):
    return reportes_ctrl.update(db, reporte_id, data)


@router.delete("/{reporte_id}", status_code=status.HTTP_204_NO_CONTENT)
def eliminar_reporte(reporte_id: int, db: Session = Depends(get_db)):
    reportes_ctrl.delete(db, reporte_id)
