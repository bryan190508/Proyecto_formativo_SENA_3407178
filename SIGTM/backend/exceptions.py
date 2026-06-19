from fastapi import HTTPException
from exceptions import usuario_no_encontrado

def usuario_no_encontrado():

    raise HTTPException(
        status_code=404,
        detail="Usuario no encontrado"
    )


def credenciales_invalidas():

    raise HTTPException(
        status_code=401,
        detail="Correo o contraseña incorrectos"
    )

