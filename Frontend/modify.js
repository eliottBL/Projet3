const reponse = await fetch("http://localhost:5678/api/works");
const projets = await reponse.json();

function genererGalleryModal(projetsVisbiles){
    document.querySelector(".modal-subcontainer-projets").innerHTML = " ";
    for (let i = 0; i < projetsVisbiles.length; i++) {
        const article = projetsVisbiles[i];
        const sectionGallery = document.querySelector(".modal-subcontainer-projets");
        const projetElement = document.createElement("figure");
        const imageElement = document.createElement("img");
            imageElement.src = article.imageUrl
        const containerBoutonElement = document.createElement("div");
        const boutonElement = document.createElement("i");
            boutonElement.className = "fa-solid fa-trash-can";
        sectionGallery.appendChild(projetElement);
        projetElement.appendChild(imageElement);
        projetElement.appendChild(containerBoutonElement);
        containerBoutonElement.appendChild(boutonElement);
    }
} 

//button 
document.querySelector(".bouton-modifier").addEventListener("click", function(event){
    document.querySelector("#retour").style.visibility = "hidden";  
    document.querySelector(".modal-form").style.display = "none";
    document.querySelector(".modal-titre").innerHTML = "Galerie photo";
    document.querySelector(".modal-subcontainer-projets").style.display = "flex";
    document.querySelector("modal").style.display = "flex";
    genererGalleryModal(projets);
    document.querySelector("body").ariaHidden = "false";

    const demilum = "brightness(50%)"
    document.querySelector("body").style.backgroundColor = "grey";
    document.querySelector("header").style.filter = demilum;
    document.querySelector("main").style.filter = demilum;
    document.querySelector("footer").style.filter = demilum;
});
document.getElementById("xmark").addEventListener("click", function(event){
    document.querySelector("modal").style.display = "none";
    document.querySelector("body").ariaHidden = "true";
    
    const lum = "brightness(100%)"
    document.querySelector("body").style.backgroundColor = "white";
    document.querySelector("header").style.filter = lum;
    document.querySelector("main").style.filter = lum;
    document.querySelector("footer").style.filter = lum;
});
document.getElementById("retour").addEventListener("click", function(event){
    document.querySelector(".modal-form").style.display = "none";
    document.querySelector(".modal-titre").innerHTML = "Galerie photo";
    document.querySelector(".modal-subcontainer-projets").style.display = "flex";
    document.querySelector("#retour").style.visibility = "hidden";    
});
document.querySelector(".bouton-ajouter").addEventListener("click", function(event){
    document.querySelector("#retour").style.visibility = "visible";
    document.querySelector(".modal-titre").innerHTML = "Ajout photo";
    document.querySelector(".modal-subcontainer-projets").style.display = "none";
    document.querySelector(".modal-form").style.display = "flex";
});


