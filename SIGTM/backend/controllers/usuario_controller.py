from models import Usuario

def crear_usuario(db, data):

    nuevo = Usuario(
        nombre=data.nombre,
        correo=data.correo,
        password=data.password,
        rol=data.rol
    )

    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)

    return nuevo


def listar_usuarios(db):

    return db.query(Usuario).all()


def eliminar_usuario(db, id):

    usuario = db.query(Usuario).filter(
        Usuario.id == id
    ).first()

    if usuario:

        db.delete(usuario)
        db.commit()

    return usuario