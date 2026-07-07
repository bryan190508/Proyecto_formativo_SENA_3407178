from fastapi import HTTPException, status


def not_found(entidad, id=None):
    msg = f"{entidad} no encontrado"
    if id:
        msg += f" con id {id}"
    return HTTPException(status_code=404, detail=msg)


def already_exists(campo, valor=None):
    msg = f"Ya existe un registro con ese {campo}"
    if valor:
        msg += f": {valor}"
    return HTTPException(status_code=400, detail=msg)


def bad_request(msg):
    return HTTPException(status_code=400, detail=msg)


def valor_invalido(campo, opciones):
    return HTTPException(
        status_code=422,
        detail=f"El campo {campo} no es valido. Opciones: {opciones}"
    )


def conflict(msg):
    return HTTPException(status_code=409, detail=msg)
