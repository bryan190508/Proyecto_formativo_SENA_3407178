from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session

from database import SessionLocal
from models import Usuario
from schemas import UsuarioCreate

router = APIRouter(prefix="/usuarios", tags=["Usuarios"])

def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()

# REGISTRAR

@router.post("/")
def crear_usuario(usuario:UsuarioCreate, db:Session=Depends(get_db)):

    nuevo = Usuario(
        nombre=usuario.nombre,
        correo=usuario.correo,
        password=usuario.password,
        rol=usuario.rol
    )

    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)

    return nuevo

# LOGIN

@router.post("/login")
def login(correo:str,password:str,db:Session=Depends(get_db)):

    usuario = db.query(Usuario).filter(
        Usuario.correo==correo,
        Usuario.password==password
    ).first()

    if not usuario:
        raise HTTPException(
            status_code=401,
            detail="Credenciales incorrectas"
        )

    return usuario

# LISTAR

@router.get("/")
def listar(db:Session=Depends(get_db)):
    return db.query(Usuario).all()

# ACTUALIZAR

@router.put("/{id}")
def actualizar(id:int,usuario:UsuarioCreate,db:Session=Depends(get_db)):

    user=db.query(Usuario).filter(
        Usuario.id==id
    ).first()

    if not user:
        raise HTTPException(status_code=404)

    user.nombre=usuario.nombre
    user.correo=usuario.correo
    user.password=usuario.password
    user.rol=usuario.rol

    db.commit()

    return {"mensaje":"Actualizado"}

# ELIMINAR

@router.delete("/{id}")
def eliminar(id:int,db:Session=Depends(get_db)):

    usuario=db.query(Usuario).filter(
        Usuario.id==id
    ).first()

    if not usuario:
        raise HTTPException(status_code=404)

    db.delete(usuario)
    db.commit()

    return {"mensaje":"Usuario eliminado"}