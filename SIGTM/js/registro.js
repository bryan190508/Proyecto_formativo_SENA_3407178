document.getElementById("registroForm")
.addEventListener("submit", async function(event){

    event.preventDefault();

    const usuario = {

        nombre:
        document.getElementById("fullname").value,

        correo:
        document.getElementById("email_reg").value,

        password:
        document.getElementById("password_reg").value,

        rol:
        document.getElementById("rol").value
    };

    try{

        const response = await fetch(
            "http://127.0.0.1:8000/usuarios/",
            {
                method:"POST",

                headers:{
                    "Content-Type":
                    "application/json"
                },

                body:JSON.stringify(usuario)
            }
        );

        if(response.ok){

            alert(
                "Usuario registrado correctamente"
            );

            window.location.href =
            "login.html";
        }
        else{

            const error =
            await response.json();

            alert(error.detail);
        }

    }catch(error){

        console.error(error);

        alert(
            "No se pudo conectar con FastAPI"
        );
    }
});