from models import Vehiculo

def crear_vehiculo(db, data):

    nuevo = Vehiculo(
        placa=data.placa,
        marca=data.marca,
        modelo=data.modelo,
        usuario_id=data.usuario_id
    )

    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)

    return nuevo


def listar_vehiculos(db):

    return db.query(Vehiculo).all()


def eliminar_vehiculo(db, id):

    vehiculo = db.query(Vehiculo).filter(
        Vehiculo.id == id
    ).first()

    if vehiculo:

        db.delete(vehiculo)
        db.commit()

    return vehiculo