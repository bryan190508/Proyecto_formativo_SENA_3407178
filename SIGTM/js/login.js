document.getElementById("loginForm")
.addEventListener("submit", async function(event){

    event.preventDefault();

    const correo =
    document.getElementById("email").value;

    const password =
    document.getElementById("password").value;

    const rolSeleccionado =
    document.getElementById("login-rol").value;

    try{

        const response = await fetch(
            `http://127.0.0.1:8000/usuarios/login?correo=${correo}&password=${password}`,
            {
                method:"POST"
            }
        );

        if(!response.ok){

            alert("Correo o contraseña incorrectos");
            return;
        }

        const usuario =
        await response.json();

        if(usuario.rol !== rolSeleccionado){

            alert("El rol seleccionado no coincide");
            return;
        }

        localStorage.setItem(
            "usuario",
            JSON.stringify(usuario)
        );

        if(usuario.rol === "mecanico"){

            window.location.href =
            "panel-mecanico.html";

        }else{

            window.location.href =
            "portal-cliente.html";
        }

    }catch(error){

        console.error(error);

        alert(
            "No se pudo conectar con el servidor"
        );
    }
});