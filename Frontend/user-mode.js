function genUserMode() {
    document.querySelector("#login").innerHTML = "logout";
    let boutonModifier = document.querySelector(".bouton-modifier");
    boutonModifier.style.display = "flex";
    let modeEdition = document.querySelector(".mode-edition");
    modeEdition.style.display = "flex";
    document.querySelector(".filter-bar").style.visibility = "hidden";
}
// en ms 1h = 3600000
function sessionExpire (duree){
    setTimeout(()=> {
        window.sessionStorage.setItem("status", "offline");
        window.location.replace("index.html");
    }, duree)
}

function isConnected (){
    let status = window.sessionStorage.getItem("status");
    if (status == "online") {
        console.log("online");
        genUserMode();
        sessionExpire(3600000);
    } else {
        console.log("offline");
    }
}

//Process
isConnected()