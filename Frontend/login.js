var login = {};

function SaveAndTestToken(login) {
    window.sessionStorage.setItem("token", login.token ?? null);
    if ( login.token == window.sessionStorage.getItem("token")){
        window.sessionStorage.setItem("status","online")
        window.location.replace("index.html");
    } else {
        window.sessionStorage.setItem("status","offline") 
    }
}

async function getResponse(event) {
    const connexion = {
        email: event.target.querySelector("[name=email]").value,
        password: event.target.querySelector("[name=password]").value
    };
    const chargeUtile = JSON.stringify(connexion);
    console.log(chargeUtile);

    const loginJ = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers : {"accept": "application/json", "Content-Type":"application/json"}, 
        body: chargeUtile
        });
    login = await loginJ.json();
    console.log(login);
    SaveAndTestToken(login);   
}

//PROCESS 
const formulaireConnexion = document.querySelector(".connexion");
formulaireConnexion.addEventListener("submit", function (event) {
    event.preventDefault();
    getResponse(event);
});
