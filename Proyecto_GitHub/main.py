from fastapi import FastAPI

app = FastAPI()



clientes = [
    {"id": 1, "nombre": "Brayan" },
    {"id": 2, "nombre": "Hermenegildo" }
]

vehiculos = [
    {"id": 1, "placa": "ABC123", "modelo": "Mazda 3", "cliente_id": 1},
    {"id": 2, "placa": "XYZ789", "modelo": "Chevrolet Spark", "cliente_id": 2}
]

diagnosticos = []

mecanicos = [
    {"id": 1, "nombre": "Eustaquio", "especialidad": "Motor"},
    {"id": 2, "nombre": "Albeiro", "especialidad": "Frenos"}
]

ordenes = [
    {"id": 1, "vehiculo_id": 1, "estado": "Pendiente"},
    {"id": 2, "vehiculo_id": 2, "estado": "En proceso"}
]

repuestos = [
    {"id": 1, "nombre": "Embrague", "precio": 80000},
    {"id": 2, "nombre": "Cuello de la Transmision", "precio": 25000}
]

pagos = [
    {"id": 1, "orden_id": 1, "valor": 150000},
    {"id": 2, "orden_id": 2, "valor": 90000}
]



@app.get("/")
def inicio():
    return {"mensaje": "API Sistema de Diagnóstico Automotriz activa"}

@app.get("/clientes")
def obtener_clientes():
    return {"clientes": clientes}

@app.get("/vehiculos")
def obtener_vehiculos():
    return {"vehiculos": vehiculos}

@app.get("/diagnosticos")
def obtener_diagnosticos():
    return {"diagnosticos": diagnosticos}

@app.get("/mecanicos")
def obtener_mecanicos():
    return {"mecanicos": mecanicos}

@app.get("/ordenes")
def obtener_ordenes():
    return {"ordenes": ordenes}

@app.get("/repuestos")
def obtener_repuestos():
    return {"repuestos": repuestos}

@app.get("/pagos")
def obtener_pagos():
    return {"pagos": pagos}



@app.post("/clientes")
def crear_cliente(cliente: dict):
    clientes.append(cliente)
    return {"mensaje": "Cliente agregado", "cliente": cliente}

@app.post("/vehiculos")
def crear_vehiculo(vehiculo: dict):
    vehiculos.append(vehiculo)
    return {"mensaje": "Vehículo agregado", "vehiculo": vehiculo}

@app.post("/diagnosticos")
def crear_diagnostico(diagnostico: dict):
    diagnosticos.append(diagnostico)
    return {"mensaje": "Diagnóstico agregado", "diagnostico": diagnostico}

@app.post("/mecanicos")
def crear_mecanico(mecanico: dict):
    mecanicos.append(mecanico)
    return {"mensaje": "Mecánico agregado", "mecanico": mecanico}

@app.post("/ordenes")
def crear_orden(orden: dict):
    ordenes.append(orden)
    return {"mensaje": "Orden creada", "orden": orden}

@app.post("/repuestos")
def crear_repuesto(repuesto: dict):
    repuestos.append(repuesto)
    return {"mensaje": "Repuesto agregado", "repuesto": repuesto}

@app.post("/pagos")
def crear_pago(pago: dict):
    pagos.append(pago)
    return {"mensaje": "Pago registrado", "pago": pago}



@app.put("/vehiculos/{id}")
def actualizar_vehiculo(id: int, datos: dict):
    for v in vehiculos:
        if v["id"] == id:
            v.update(datos)
            return {"mensaje": "Vehículo actualizado", "vehiculo": v}
    return {"error": "Vehículo no encontrado"}

@app.put("/diagnosticos/{id}")
def actualizar_diagnostico(id: int, datos: dict):
    for d in diagnosticos:
        if d.get("id") == id:
            d.update(datos)
            return {"mensaje": "Diagnóstico actualizado", "diagnostico": d}
    return {"error": "Diagnóstico no encontrado"}

@app.put("/ordenes/{id}")
def actualizar_orden(id: int, datos: dict):
    for o in ordenes:
        if o["id"] == id:
            o.update(datos)
            return {"mensaje": "Orden actualizada", "orden": o}
    return {"error": "Orden no encontrada"}



@app.delete("/vehiculos/{id}")
def eliminar_vehiculo(id: int):
    for v in vehiculos:
        if v["id"] == id:
            vehiculos.remove(v)
            return {"mensaje": "Vehículo eliminado"}
    return {"error": "Vehículo no encontrado"}

@app.delete("/diagnosticos/{id}")
def eliminar_diagnostico(id: int):
    for d in diagnosticos:
        if d.get("id") == id:
            diagnosticos.remove(d)
            return {"mensaje": "Diagnóstico eliminado"}
    return {"error": "Diagnóstico no encontrado"}

@app.delete("/repuestos/{id}")
def eliminar_repuesto(id: int):
    for r in repuestos:
        if r["id"] == id:
            repuestos.remove(r)
            return {"mensaje": "Repuesto eliminado"}
    return {"error": "Repuesto no encontrado"}
