const reponse = await fetch("http://localhost:5678/api/works");
const projets = await reponse.json();
var projetsVisbiles = projets
var projetsFiltres = projets

function genererArticles(projetsVisbiles){
    document.querySelector(".gallery").innerHTML = " ";
    for (let i = 0; i < projetsVisbiles.length; i++) {
        const article = projetsVisbiles[i];
        const sectionGallery = document.querySelector(".gallery");
        const projetElement = document.createElement("figure");
        const imageElement = document.createElement("img");
            imageElement.src = article.imageUrl
        const nomElement = document.createElement("figcaptation");
            nomElement.innerText = article.title;
        sectionGallery.appendChild(projetElement)
        projetElement.appendChild(imageElement);
        projetElement.appendChild(nomElement);
    }
} 

function filtrerProjets (projets, i) {
    projetsFiltres = projets.filter(function(projets){
        //console.log(i)
        return projets.categoryId === i;
    });
    projetsVisbiles = projetsFiltres;
}


//PROCESS
genererArticles (projets);
document.querySelector(".filter-bar").addEventListener("click", function(event){
    const id = event.target.id;
    if (id == "tous"){
        projetsVisbiles = projets;
        genererArticles (projetsVisbiles);
    } else if (id == "objets") {
        let i = 1;
        filtrerProjets(projets, i);
        genererArticles (projetsVisbiles);
    } else if (id == "appartements") {
        let i = 2;
        filtrerProjets(projets, i);
        genererArticles (projetsVisbiles);
    }  else if (id == "hotels&restaurants") {
        let i = 3
        filtrerProjets(projets, i);
        genererArticles (projetsVisbiles);
    } else {
        console.log("unknow")
    }
})
document.querySelector("#login").addEventListener("click", function (event){
    window.sessionStorage.setItem("status", "offline")
    window.location.replace("index.html");
})