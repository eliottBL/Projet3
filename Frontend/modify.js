const reponse = await fetch("http://localhost:5678/api/works");
const projets = await reponse.json();
console.log(reponse);

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
function opacite50 (){
    const demilum = "brightness(50%)"
    document.querySelector("body").style.backgroundColor = "grey";
    document.querySelector("header").style.filter = demilum;
    document.querySelector("main").style.filter = demilum;
    document.querySelector("footer").style.filter = demilum;
}
function opacite100(){
    const lum = "brightness(100%)"
    document.querySelector("body").style.backgroundColor = "white";
    document.querySelector("header").style.filter = lum;
    document.querySelector("main").style.filter = lum;
    document.querySelector("footer").style.filter = lum;
}
function initModal(){
    document.querySelector("#retour").style.visibility = "hidden";
    document.querySelector(".bouton-ajouter").style.display = "flex";
    document.querySelector(".bouton-envoyer").style.display = "none";  
    document.querySelector(".modal-form").style.display = "none";
    document.querySelector(".modal-titre").innerHTML = "Galerie photo";
    document.querySelector(".modal-subcontainer-projets").style.display = "flex";
}
document.querySelector(".bouton-modifier").addEventListener("click", function(event){
    initModal();
    document.querySelector("modal").style.display = "flex";
    genererGalleryModal(projets);
    document.querySelector("body").ariaHidden = "false";
    opacite50();
});
document.getElementById("xmark").addEventListener("click", function(event){
    document.querySelector("modal").style.display = "none";
    document.querySelector("body").ariaHidden = "true";
    opacite100();
});
document.getElementById("retour").addEventListener("click", function(event){
        initModal();   
});
document.querySelector(".bouton-ajouter").addEventListener("click", function(event){
    document.querySelector("#retour").style.visibility = "visible";
    document.querySelector(".bouton-ajouter").style.display = "none";
    document.querySelector(".bouton-envoyer").style.display = "flex";
    document.querySelector(".modal-titre").innerHTML = "Ajout photo";
    document.querySelector(".modal-subcontainer-projets").style.display = "none";
    document.querySelector(".modal-form").style.display = "flex";
});


document.querySelector("#titre").addEventListener("change", function(event){
    isFormComplet();
})
document.querySelector("#categorie").addEventListener("change", function(event){
    isFormComplet();
})
document.querySelector("#import").addEventListener("change", function(event){
    isFormComplet();
})
function isFormComplet(){
    const titre = document.querySelector("#titre").value;
    const image = document.querySelector("#import").value;
    const categorie = document.querySelector("#categorie").value;
    if (titre !=0 & image !=0 & categorie !=0) {
        document.querySelector(".bouton-envoyer").style.backgroundColor = "#1D6154";
        document.querySelector("#modal-sumbit").removeAttribute("disabled");
        console.log(document.querySelector("#modal-sumbit"))
    }; 
}
document.querySelector(".modal-form").addEventListener("submit", function(event){
    event.preventDefault();
    AjouterWork(event);
})


function AjouterWork (event){
    const formulaireAjout = {
        imageUrl : event.target.querySelector("[name=image]").value,
        title : event.target.querySelector("[name=titre]").value,
        categoryId : event.target.querySelector("[name=categorie]").value,
    };
    const chargeUtile = JSON.stringify(formulaireAjout);
    console.log(chargeUtile);
    const login = fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers : {"accept": "application/json", "Content-Type":"multipart/form-data"}, 
        body: chargeUtile
        }).then(function(){
            console.log(login);
            console.log(projets);  
        });
        //.catch       
}
