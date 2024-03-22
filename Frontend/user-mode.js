function isConnected() {
    let status = window.sessionStorage.getItem("token");
    status && genUserMode();
}

function genUserMode() {
    document.querySelector("#login").innerHTML = "logout";
    document.querySelector("#login").id = "logout";
    let boutonModifier = document.querySelector(".bouton-modifier");
    boutonModifier.style.display = "flex";
    let modeEdition = document.querySelector(".mode-edition");
    modeEdition.style.display = "flex";
    document.querySelector(".filter-bar").style.visibility = "hidden";
}

//Process
isConnected()
if (document.querySelector("#logout")) {
    document.querySelector("#logout").addEventListener("click", function (event) {
        window.sessionStorage.removeItem("token");
        location.reload("index.html");
    });
}