from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session

from database import SessionLocal
from models import Vehiculo
from schemas import VehiculoCreate

router=APIRouter(
    prefix="/vehiculos",
    tags=["Vehiculos"]
)

def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/")
def crear(vehiculo:VehiculoCreate,
db:Session=Depends(get_db)):

    nuevo=Vehiculo(**vehiculo.dict())

    db.add(nuevo)
    db.commit()

    return nuevo

@router.get("/")
def listar(db:Session=Depends(get_db)):
    return db.query(Vehiculo).all()