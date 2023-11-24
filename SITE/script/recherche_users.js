

// ----- RECUPERATION DE DIVERS CONTENUS DE LA PAGE -----
// var option = document.querySelector(".option").selectedIndex.options[choice].value;
// console.log(option);

var btnSearchUser = document.querySelector("#btnSearchUser");
var btnAnnulerUser = document.querySelector("#btnAnnulerUser");
var searchUser = document.querySelector("#searchUser");

// récupération des span pour affichage
var afficheUser = document.querySelector("span#user");
var afficheAbonnement = document.querySelector("span#abonnement");
var afficheEmprunt = document.querySelector("span#bdEmprunt");
var afficheRetard = document.querySelector("span#bdRetard");

var afficheAuteur = document.querySelector("span#infoAuteur");
var afficheTitre = document.querySelector("span#infoTitre");
var afficheSerie = document.querySelector("span#infoSerie");

var afficheIsbn = document.querySelector("span#infoIsbn");
var afficheCode = document.querySelector("span#infoCode");
var afficheNbrBd = document.querySelector("span#infoNbrBd");

var afficheStock = document.querySelector("span#infoStock");

// ----- focus sur zone de recherche
searchUser.focus();

// ----- mise à jour à chaque touche entrée dans la zone de recherche
searchUser.addEventListener('keyup', function(){
    var input = searchUser.value;
    var result = tUsers.filter(item => item.nom.toLocaleLowerCase().includes(input.toLocaleLowerCase()));
    var suggestion = '';


    if(input !='') {
        result.forEach(result =>
            suggestion +=`
            <option id="suggestions" value="${result.nom}"></option>
            `
            )
            document.getElementById('suggestions').innerHTML = suggestion;
        }
});

btnSearchUser.onclick = function(){
    var search = document.querySelector("#searchUser").value;
    var input = searchUser.value;
    var result = tUsers.filter(item => item.nom.toLocaleLowerCase().includes(input.toLocaleLowerCase()));

    // afficher les infos utilisateur
    afficheUser.textContent = result[0].nom;

    // Abonné ?
    if(result[0].abonne == "non") {
        afficheAbonnement.style.color = "red"
        afficheAbonnement.textContent = result[0].abonne;
    } else {
        afficheAbonnement.style.color = "green"
        afficheAbonnement.textContent = result[0].abonne;
    }

    // BD emprunté à 3 ?
    if(result[0].bdEmprunt == "3") {
        afficheEmprunt.style.color = "red"
        afficheEmprunt.textContent = result[0].bdEmprunt;
    } else {
        afficheEmprunt.style.color = "green"
        afficheEmprunt.textContent = result[0].bdEmprunt;
    }

    // BD en retard ?
    if(result[0].bdRetard > "0") {
        afficheRetard.style.color = "red"
        afficheRetard.textContent = result[0].bdRetard;
    } else {
        afficheRetard.style.color = "green"
        afficheRetard.textContent = result[0].bdRetard;
    }
    controleUser()
};

btnAnnulerUser.onclick = function(){
    afficheUser.textContent = "Nom Prénom";
    afficheAbonnement.textContent = "";
    afficheEmprunt.textContent = "";
    afficheRetard.textContent = "";
};

function controleUser() {
    var abonne = document.getElementById("abonnement").innerHTML;
    var emprunt = document.getElementById("bdEmprunt").innerHTML;
    var retard = document.getElementById("bdRetard").innerHTML;

    var btnValiderEmprunt = document.querySelector("#btnValiderEmprunt");

    var bEmpruntPossible = false;

    console.log("emprunt : " + emprunt)
    console.log("retard : " + retard)

    if(abonne == "oui" && emprunt < 3 && retard == 0) {
        bEmpruntPossible = true;
    } else {
        bEmpruntPossible = false;
    }
    
    if(bEmpruntPossible) {
        console.log("emprunt possible")
        //btnValiderEmprunt.style.border = "solid blue";
        btnValiderEmprunt.style.background = "var(--orange)";
        btnValiderEmprunt.style.color = "black";
        //btnValiderEmprunt.textContent = "Valider Emprunt";
    } else {
        console.log("emprunt pas possible")
        //btnValiderEmprunt.style.border = "solid blue";
        btnValiderEmprunt.style.background = "red";
        btnValiderEmprunt.style.color = "white";
        //btnValiderEmprunt.textContent = "Emprunt Impossible";
    }
}
    
    btnValiderEmprunt.onclick = function() {
        
    }
    
    btnAnnulerEmprunt.onclick = function() {
        document.location.reload();
    }