document.getElementById("vehiculoForm")
.addEventListener("submit", async function(e){

    e.preventDefault();

    const vehiculo = {

        placa:
        document.getElementById("placa").value,

        marca:
        document.getElementById("marca").value,

        modelo:
        document.getElementById("modelo").value,

        usuario_id:
        parseInt(
            document.getElementById("usuario_id").value
        )
    };

    try{

        const response = await fetch(

            "http://127.0.0.1:8000/vehiculos/",

            {

                method:"POST",

                headers:{
                    "Content-Type":
                    "application/json"
                },

                body:
                JSON.stringify(vehiculo)
            }
        );

        if(response.ok){

            alert(
                "Vehículo registrado correctamente"
            );

            document.getElementById("vehiculoForm")
            .reset();
        }

    }catch(error){

        console.error(error);

        alert(
            "Error al registrar vehículo"
        );
    }
});