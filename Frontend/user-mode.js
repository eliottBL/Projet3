function genUserMode() {
    document.querySelector("#login").innerHTML = "logout";
    let boutonModifier = document.querySelector(".bouton-modifier");
    boutonModifier.style.display = "flex";
    let modeEdition = document.querySelector(".mode-edition");
    modeEdition.style.display = "flex";
}

function isConnected (){
    let status = window.sessionStorage.getItem("status");
    if (status == "online") {
        console.log("online");
        genUserMode();
    } else {
        console.log("offline");
    }
}

//Process
isConnected()