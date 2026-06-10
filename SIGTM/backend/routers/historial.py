from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import SessionLocal
from models import HistorialServicio
from schemas import HistorialCreate

router = APIRouter(
    prefix="/historial",
    tags=["Historial"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/")
def crear(historial: HistorialCreate, db: Session = Depends(get_db)):

    nuevo = HistorialServicio(**historial.dict())

    db.add(nuevo)
    db.commit()

    return nuevo

@router.get("/")
def listar(db: Session = Depends(get_db)):
    return db.query(HistorialServicio).all()