//gen-artcile-projet
// créer [i] projets (figure>img>h5) in .gallery

const reponse = await fetch("http://localhost:5678/api/works");
const projets = await reponse.json();

function genererArticles(projets){
    for (let i = 0; i < projets.length; i++) {
const article = projets[i];
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

genererArticles (projets);

