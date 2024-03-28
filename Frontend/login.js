function getResponse(event) {
    const connexion = {
        email: event.target.querySelector("[name=email]").value,
        password: event.target.querySelector("[name=password]").value
    };
    const chargeUtile = JSON.stringify(connexion);
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "accept": "application/json", "Content-Type": "application/json" },
        body: chargeUtile
    }).then(function (response) {
        return response.json();
    }).then(function (response) {
        if (response.token) {
            window.sessionStorage.setItem("token", response.token);
            window.location.replace("index.html");
        } else {
            alert("Erreur dans l’identifiant ou le mot de passe");
        }
    }).catch(function () {
        alert("erreur survenue");
    });
};

const formulaireConnexion = document.querySelector(".connexion");
formulaireConnexion.addEventListener("submit", function (event) {
    event.preventDefault();
    getResponse(event);
});
