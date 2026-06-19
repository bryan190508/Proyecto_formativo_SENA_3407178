from models import Pieza

def crear_pieza(db, data):

    nueva = Pieza(
        nombre=data.nombre,
        descripcion=data.descripcion,
        precio=data.precio,
        justificacion=data.justificacion,
        orden_id=data.orden_id
    )

    db.add(nueva)
    db.commit()
    db.refresh(nueva)

    return nueva


def listar_piezas(db):

    return db.query(Pieza).all()


def eliminar_pieza(db, id):

    pieza = db.query(Pieza).filter(
        Pieza.id == id
    ).first()

    if pieza:

        db.delete(pieza)
        db.commit()

    return pieza