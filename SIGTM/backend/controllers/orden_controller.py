from models import OrdenServicio

def crear_orden(db, data):

    nueva = OrdenServicio(
        fecha_ingreso=data.fecha_ingreso,
        estado=data.estado,
        diagnostico=data.diagnostico,
        vehiculo_id=data.vehiculo_id
    )

    db.add(nueva)
    db.commit()
    db.refresh(nueva)

    return nueva


def listar_ordenes(db):

    return db.query(OrdenServicio).all()


def actualizar_estado(db, id, estado):

    orden = db.query(
        OrdenServicio
    ).filter(
        OrdenServicio.id == id
    ).first()

    if orden:

        orden.estado = estado
        db.commit()

    return orden