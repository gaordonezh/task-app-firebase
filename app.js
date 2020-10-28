firebase.initializeApp({
    apiKey: "AIzaSyBbPuKlOY7hvtyuQ5KiubqI-1ihFNLN0z8",
    authDomain: "crud-bfceb.firebaseapp.com",
    projectId: "crud-bfceb"
});

var db = firebase.firestore();
function guardar(){
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let fecha = document.getElementById("fecha").value;

    db.collection('users').add({
        first: nombre,
        last: apellido,
        born: fecha
    })
    .then(function(docRef){
        //console.log("Document written with ID: ", docRef.id);
        document.getElementById("nombre").value = '';
        document.getElementById("apellido").value = '';
        document.getElementById("fecha").value = '';
    })
    .catch(function(error){
        console.log("Error adding document: ", error);
    })
}

// mostrar datos
let tabla = document.getElementById('tabla');
db.collection("users").onSnapshot((querySnapshot) => {
    tabla.innerHTML = "";
    querySnapshot.forEach((doc) => {
        //console.log(`${doc.id} => ${doc.data().first}`);
        tabla.innerHTML += `
            <div class="col-lg-3 my-2">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${doc.data().last}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${doc.data().first}</h6>
                        <p class="card-text">${doc.data().born}</p>
                        <a href="#" class="card-link"><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></a>
                        <a href="#" class="card-link"><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().first}','${doc.data().last}','${doc.data().born}')">Editar</button></a>
                    </div>
                </div>
            </div>
        `
    });
});

//borrar
function eliminar(id){
    db.collection("users").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

// Editar
function editar(id, nombre, apellido, fecha){

    document.getElementById("nombre").value = nombre;
    document.getElementById("apellido").value = apellido;
    document.getElementById("fecha").value = fecha;

    let boton = document.getElementById("boton");
    boton.innerHTML = "Editar";

    boton.onclick = function(){
        var usuarios = db.collection("users").doc(id);

        let nombre = document.getElementById("nombre").value;
        let apellido = document.getElementById("apellido").value;
        let fecha = document.getElementById("fecha").value;

        return usuarios.update({
            first: nombre,
            last: apellido,
            born: fecha
        })
        .then(function() {
            console.log("Document successfully updated!");
            document.getElementById("nombre").value = '';
            document.getElementById("apellido").value = '';
            document.getElementById("fecha").value = '';
            boton.innerHTML = "Guardar";
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }
}