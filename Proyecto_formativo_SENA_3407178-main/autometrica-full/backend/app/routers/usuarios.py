from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app import schemas
from app.controllers import usuarios_ctrl

router = APIRouter(prefix="/usuarios", tags=["Usuarios"])


@router.get("/", response_model=List[schemas.UsuarioOut])
def listar_usuarios(skip: int = 0, limit: int = 100, rol: Optional[str] = None, db: Session = Depends(get_db)):
    return usuarios_ctrl.get_all(db, skip, limit, rol)


@router.get("/correo/{correo}", response_model=schemas.UsuarioOut)
def obtener_por_correo(correo: str, db: Session = Depends(get_db)):
    return usuarios_ctrl.get_by_correo(db, correo)


@router.post("/login", response_model=schemas.UsuarioOut)
def login(correo: str, password: str, db: Session = Depends(get_db)):
    return usuarios_ctrl.login(db, correo, password)


@router.get("/{usuario_id}", response_model=schemas.UsuarioOut)
def obtener_usuario(usuario_id: int, db: Session = Depends(get_db)):
    return usuarios_ctrl.get_by_id(db, usuario_id)


@router.post("/", response_model=schemas.UsuarioOut, status_code=status.HTTP_201_CREATED)
def crear_usuario(data: schemas.UsuarioCreate, db: Session = Depends(get_db)):
    return usuarios_ctrl.create(db, data)


@router.put("/{usuario_id}", response_model=schemas.UsuarioOut)
def actualizar_usuario(usuario_id: int, data: schemas.UsuarioUpdate, db: Session = Depends(get_db)):
    return usuarios_ctrl.update(db, usuario_id, data)


@router.delete("/{usuario_id}", status_code=status.HTTP_204_NO_CONTENT)
def eliminar_usuario(usuario_id: int, db: Session = Depends(get_db)):
    usuarios_ctrl.delete(db, usuario_id)
