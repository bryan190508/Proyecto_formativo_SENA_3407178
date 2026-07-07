from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app import schemas
from app.controllers import contactos_ctrl

router = APIRouter(prefix="/contactos-web", tags=["ContactosWeb"])


@router.get("/", response_model=List[schemas.ContactoWebOut])
def listar_contactos(skip: int = 0, limit: int = 100, atendido: Optional[bool] = None,
                     db: Session = Depends(get_db)):
    return contactos_ctrl.get_all(db, skip, limit, atendido)


@router.get("/{contacto_id}", response_model=schemas.ContactoWebOut)
def obtener_contacto(contacto_id: int, db: Session = Depends(get_db)):
    return contactos_ctrl.get_by_id(db, contacto_id)


@router.post("/", response_model=schemas.ContactoWebOut, status_code=status.HTTP_201_CREATED)
def crear_contacto(data: schemas.ContactoWebCreate, db: Session = Depends(get_db)):
    return contactos_ctrl.create(db, data)


@router.put("/{contacto_id}", response_model=schemas.ContactoWebOut)
def actualizar_contacto(contacto_id: int, data: schemas.ContactoWebUpdate, db: Session = Depends(get_db)):
    return contactos_ctrl.update(db, contacto_id, data)


@router.delete("/{contacto_id}", status_code=status.HTTP_204_NO_CONTENT)
def eliminar_contacto(contacto_id: int, db: Session = Depends(get_db)):
    contactos_ctrl.delete(db, contacto_id)
