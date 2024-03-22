const reponse = await fetch("http://localhost:5678/api/works");
const projets = await reponse.json();
const preview = () => {
    const file = document.querySelector("#import").files;
    if (file) {
        const fileReader = new FileReader();
        const preview = document.getElementById('preview');
        fileReader.onload = event => {
            preview.setAttribute('src', event.target.result);
        };
        fileReader.readAsDataURL(file[0]);
    };
    document.querySelector(".import-label-container").style.visibility = "hidden";
    document.querySelector(".import-label-img-container").style.visibility = "visible";
};

function genererArticles(projetsVisbiles) {
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
genererArticles(projets);

function filtrerProjets(projets, y) {
    // projetsFiltres = projets.filter(function(projets){
    //     //console.log(i)
    //     return projets.categoryId === i;
    // });
    // projetsVisbiles = projetsFiltres;
    let projetsFiltres = projets.filter(function (projets) {
        return projets.category.name === y;
    });
    genererArticles(projetsFiltres)
}
document.querySelector(".filter-bar").addEventListener("click", function (event) {
    let categoryName = event.target.dataset.category
    if (categoryName == "tous") {
        genererArticles(projets);
    } else {
        filtrerProjets(projets, categoryName);
    }
})

function genererGalleryModal(projetsVisbiles) {
    document.querySelector(".modal-subcontainer-projets").innerHTML = " ";
    for (let i = 0; i < projetsVisbiles.length; i++) {
        const article = projetsVisbiles[i];
        const sectionGallery = document.querySelector(".modal-subcontainer-projets");
        const projetElement = document.createElement("figure");
        const imageElement = document.createElement("img");
        imageElement.src = article.imageUrl
        const containerBoutonElement = document.createElement("div");
        containerBoutonElement.className = "trash-container";
        const boutonElement = document.createElement("i");
        boutonElement.className = "fa-solid fa-trash-can";
        boutonElement.dataset.number = article.id;
        sectionGallery.appendChild(projetElement);
        projetElement.appendChild(imageElement);
        projetElement.appendChild(containerBoutonElement);
        containerBoutonElement.appendChild(boutonElement);
    };
}
function opacite50() {
    const demilum = "brightness(50%)"
    document.querySelector("body").style.backgroundColor = "grey";
    document.querySelector("header").style.filter = demilum;
    document.querySelector("main").style.filter = demilum;
    document.querySelector("footer").style.filter = demilum;
}
function opacite100() {
    const lum = "brightness(100%)"
    document.querySelector("body").style.backgroundColor = "white";
    document.querySelector("header").style.filter = lum;
    document.querySelector("main").style.filter = lum;
    document.querySelector("footer").style.filter = lum;
}
function initModal() {
    document.querySelector("#retour").style.visibility = "hidden";
    document.querySelector(".bouton-ajouter").style.display = "flex";
    document.querySelector(".bouton-envoyer").style.display = "none";
    document.querySelector(".modal-form").style.display = "none";
    document.querySelector(".modal-titre").innerHTML = "Galerie photo";
    document.querySelector(".modal-subcontainer-projets").style.display = "flex";
    document.querySelector(".import-label-container").style.visibility = "visible";
    document.querySelector(".import-label-img-container").style.visibility = "hidden";
}
function supprimerWork(id) {
    const url = "http://localhost:5678/api/works/" + id;
    fetch(url, {
        method: "DELETE",
        headers: { "accept": "*/*", "Authorization": "Bearer " + window.sessionStorage.getItem("token") },
    });
    fetch("http://localhost:5678/api/works").then(function (response) {
        return response.json();
    }).then(function (response) {
        genererGalleryModal(response);
    });
}
function fermerModal() {
}
document.addEventListener("click", function (event) {
    const modal = document.querySelector("modal");
    if (!modal.contains(event.target) && modal.style.display == "flex") {
        console.log("clic modal");
    }
});
document.querySelector(".bouton-modifier").addEventListener("click", function (event) {
    initModal();
    document.querySelector("modal").style.display = "flex";
    genererGalleryModal(projets);
    document.querySelector("body").ariaHidden = "true";
    opacite50();
    document.querySelector(".modal-subcontainer-projets").addEventListener("click", function (event) {
        let rang = event.target.dataset.number;
        rang && supprimerWork(rang);
    });
});
document.getElementById("xmark").addEventListener("click", function (event) {
    document.querySelector("modal").style.display = "none";
    document.querySelector("body").ariaHidden = "false";
    opacite100();
    window.location.replace("index.html");
});
document.getElementById("retour").addEventListener("click", function (event) {
    initModal();
});
document.querySelector(".bouton-ajouter").addEventListener("click", function (event) {
    document.querySelector("#retour").style.visibility = "visible";
    document.querySelector(".bouton-ajouter").style.display = "none";
    document.querySelector(".bouton-envoyer").style.display = "flex";
    document.querySelector(".modal-titre").innerHTML = "Ajout photo";
    document.querySelector(".modal-subcontainer-projets").style.display = "none";
    document.querySelector(".modal-form").style.display = "flex";
});

function isFormComplet() {
    const titre = document.querySelector("#titre").value;
    const image = document.querySelector("#import").value;
    const categorie = document.querySelector("#categorie").value;
    if (titre != 0 & image != 0 & categorie != 0) {
        document.querySelector(".bouton-envoyer").style.backgroundColor = "#1D6154";
        document.querySelector(".bouton-envoyer").style.cursor = "pointer";
        document.querySelector("#modal-sumbit").removeAttribute("disabled");
    };
}
document.querySelector("#titre").addEventListener("change", function (event) {
    isFormComplet();
})
document.querySelector("#categorie").addEventListener("change", function (event) {
    isFormComplet();
})
document.querySelector("#import").addEventListener("change", function (event) {
    isFormComplet();
})
document.querySelector("#import").addEventListener('change', preview);

document.querySelector(".modal-form").addEventListener("submit", function (event) {
    event.preventDefault();
    ajouterWork(event);
})

function ajouterWork(event) {
    const form = new FormData
    form.append("image", event.target.querySelector("[name=image]").files[0]);
    form.append("title", event.target.querySelector("[name=titre]").value);
    form.append("category", event.target.querySelector("[name=categorie]").value);
    fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: { "accept": "application/json", "Authorization": "Bearer " + window.sessionStorage.getItem("token") },
        body: form
    }).then(function (response) {
        console.log(response);
    }).then(function () {
        initModal();
        fetch("http://localhost:5678/api/works").then(function (response) {
            return response.json();
        }).then(function (response) {
            genererGalleryModal(response);
        });
    }).catch(function () {
        alert("Erreur contenue ou communication API")
    });
}
