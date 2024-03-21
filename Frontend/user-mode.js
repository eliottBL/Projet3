function genUserMode() {
    document.querySelector("#login").innerHTML = "logout";
    let boutonModifier = document.querySelector(".bouton-modifier");
    boutonModifier.style.display = "flex";
    let modeEdition = document.querySelector(".mode-edition");
    modeEdition.style.display = "flex";
    document.querySelector(".filter-bar").style.visibility = "hidden";
}
function isConnected (){
    let status = window.sessionStorage.getItem("token");
    status && genUserMode();
    }

//Process
isConnected()