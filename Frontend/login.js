const formulaireConnexion = document.querySelector(".connexion");
formulaireConnexion.addEventListener("submit", function (event) {
event.preventDefault();
const connexion = {
    email: event.target.querySelector("[name=email]").value,
    password: event.target.querySelector("[name=password]").value
};
//const chargeUtile = JSON.stringify(connexion);
const chargeUtile = (connexion);
console.log(chargeUtile);
fetch ("http://localhost:5678/api/users/login", {
method: "POST",
header : {'accept': 'application/json', 'Content-Type':'application/json'}, 
body: chargeUtile
    });
});

 


// login 
/* 
if  fetch (httpp... /Login)) = true 
alors : d2.style.display = "flex"; (ou none)
else modal : non authorized 

const connexion = {
        "email" : event.target.querySelector("[name=email]").value,
        "password" : event.target.querySelector("[name=password]").value
    };
    const chargeUtile = JSON.stringify(connexion);
    fetch ("http://localhost:5678/api/users/login", {
    method: "POST",
    body: chargeUtile
    });
    });
    
*/