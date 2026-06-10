from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session

from database import SessionLocal
from models import Pieza
from schemas import PiezaCreate

router=APIRouter(
    prefix="/piezas",
    tags=["Piezas"]
)

def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/")
def crear(pieza:PiezaCreate,
db:Session=Depends(get_db)):

    nueva=Pieza(**pieza.dict())

    db.add(nueva)
    db.commit()

    return nueva

@router.get("/")
def listar(db:Session=Depends(get_db)):
    return db.query(Pieza).all()