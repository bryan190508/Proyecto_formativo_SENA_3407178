from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session

from database import SessionLocal
from models import OrdenServicio
from schemas import OrdenCreate

router=APIRouter(
    prefix="/ordenes",
    tags=["Ordenes"]
)

def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/")
def crear(orden:OrdenCreate,
db:Session=Depends(get_db)):

    nueva=OrdenServicio(**orden.dict())

    db.add(nueva)
    db.commit()

    return nueva

@router.get("/")
def listar(db:Session=Depends(get_db)):
    return db.query(OrdenServicio).all()