from models import HistorialServicio

def crear_historial(db, data):

    nuevo = HistorialServicio(
        descripcion=data.descripcion,
        fecha=data.fecha,
        orden_id=data.orden_id
    )

    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)

    return nuevo


def listar_historial(db):

    return db.query(
        HistorialServicio
    ).all()