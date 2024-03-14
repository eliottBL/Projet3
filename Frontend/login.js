function SaveAndTestToken(x) {
    if (x == 200){
        window.sessionStorage.setItem("status","online")
        console.log(sessionStorage)
        window.location.replace("index.html");
    } else {
        window.sessionStorage.setItem("status","offline")
        alert("Erreur dans l’identifiant ou le mot de passe") 
    }
}

async function getResponse(event) {
    const connexion = {
        email: event.target.querySelector("[name=email]").value,
        password: event.target.querySelector("[name=password]").value
    };
    const chargeUtile = JSON.stringify(connexion);

    // syntax await ?? 
    //let login = fetch("http://localhost:5678/api/users/login", {
    //    method: "POST",
    //    headers : {"accept": "application/json", "Content-Type":"application/json"}, 
    //    body: chargeUtile
    //    }).then(SaveAndTestToken(login.status));

    const login = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers : {"accept": "application/json", "Content-Type":"application/json"}, 
        body: chargeUtile
        });
    SaveAndTestToken(login.status);   
}

//PROCESS 
const formulaireConnexion = document.querySelector(".connexion");
formulaireConnexion.addEventListener("submit", function (event) {
    event.preventDefault();
    getResponse(event);
});
