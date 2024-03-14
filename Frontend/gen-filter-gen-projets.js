const reponse = await fetch("http://localhost:5678/api/works");
const projets = await reponse.json();

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

function filtrerProjets (projets, y) {
    // projetsFiltres = projets.filter(function(projets){
    //     //console.log(i)
    //     return projets.categoryId === i;
    // });
    // projetsVisbiles = projetsFiltres;
    let projetsFiltres = projets.filter(function(projets){
    return projets.category.name === y;
    });
    genererArticles(projetsFiltres)
}

//PROCESS
genererArticles (projets);
document.querySelector(".filter-bar").addEventListener("click", function(event){
    let categoryName = event.target.dataset.category
    if (categoryName == "tous"){
        genererArticles(projets);
    } else {
        filtrerProjets(projets, categoryName);
    }
})
document.querySelector("#login").addEventListener("click", function (event){
    window.sessionStorage.setItem("status", "offline");
    window.location.replace("index.html");
})