// ----- RECUPERATION DE DIVERS CONTENUS DE LA PAGE -----
var btnSearch = document.querySelector("#btnSearch");
var searchInput = document.querySelector("#searchInput");

var infoAuteur = document.querySelector("#infoAuteur");
var infoTitre = document.querySelector("#infoTitre");
var infoSerie = document.querySelector("#infoSerie");
var infoIsbn = document.querySelector("#infoIsbn");
var infoCode = document.querySelector("#infoCode");
var infoNbrBd = document.querySelector("#infoNbrBd");
var infoStock = document.querySelector("#infoStock");

var btnValiderEmprunt = document.querySelector("#btnValiderEmprunt");
var btnAnnulerEmprunt = document.querySelector("#btnAnnulerEmprunt");

var bEmpruntPossible = false;

var afficheUser = document.querySelector("span#user");
var afficheAbonnement = document.querySelector("span#abonnement");
var afficheEmprunt = document.querySelector("span#bdEmprunt");
var afficheRetard = document.querySelector("span#bdRetard");

// ----- focus sur zone de recherche
searchUser.focus();



// -------------------------------------------------------------------------------------------------------
// -------- ZONE RECHERCHE UTILISATEUR -------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------

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

// Action au bouton recherche utilisateur
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

// Action au bouton annuler utilisateur
btnAnnulerUser.onclick = function(){
    afficheUser.textContent = "Nom Prénom";
    afficheAbonnement.textContent = "";
    afficheEmprunt.textContent = "";
    afficheRetard.textContent = "";
};



// -------------------------------------------------------------------------------------------------------
// -------- ZONE RECHERCHE BD ----------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------

// effacer input si changement de type de recherche
var choixOption = document.getElementById("option");
var nbrClick =0;

choixOption.onclick = function() {
    nbrClick++
    if(nbrClick == 2) {
        nbrClick = 0;
        console.log("input effacé")
        searchInput.value = "";
        searchInput.focus();
    }
}


// ----- Récupération de l'option choisie (titre, auteur ou série)
function selectOption() {
    var select = document.getElementById("option");
    var choice = select.selectedIndex;
    var option = select.options[choice].value;
    //console.log(option);

    return option;
}

// ----- focus sur zone de recherche
searchInput.focus();

// FONCTION DE RECHERCHE ET SUGGESTION
// ----- mise à jour à chaque touche entrée dans la zone de recherche
searchInput.addEventListener('keyup', function(){
    var optionSelect = selectOption(); // recherche de l'option choisie


// Affichage des suggestions en fonction de l'option choisie
//---- SI TITRE ----
    if(optionSelect == "titre") {
        console.log("option ->>> Titre");
        var input = searchInput.value;
        var resultTitre = tInfos.filter(item => item.titre.toLocaleLowerCase().includes(input.toLocaleLowerCase()));
        var suggestion = '';
        
        if(input !='') {
        resultTitre.forEach(resultTitre =>
            suggestion +=`
            <option id="suggestions" value="${resultTitre.infosTitre}"></option>
            `
            )
            document.getElementById('suggestions').innerHTML = suggestion;
        }
//---- SI AUTEUR ----
    } else if(optionSelect == "auteur") {
        console.log("option ->>> Auteur");
        var input = searchInput.value;
        var resultAuteur = tInfos.filter(item => item.nomAuteur.toLocaleLowerCase().includes(input.toLocaleLowerCase()));
        var suggestion = '';
        
        if(input !='') {
            resultAuteur.forEach(resultAuteur =>
            suggestion +=`
            <option id="suggestions" value="${resultAuteur.infosAuteur}"></option>
            `
            )
            document.getElementById('suggestions').innerHTML = suggestion;
        }
//---- SI SERIE ----
    } else {
        console.log("option ->>> Série");
        var input = searchInput.value;
        var resultSerie = tInfos.filter(item => item.nomSerie.toLocaleLowerCase().includes(input.toLocaleLowerCase()));
        var suggestion = '';
        
        if(input !='') {
            resultSerie.forEach(resultSerie =>
            suggestion +=`
            <option id="suggestions" value="${resultSerie.infosSerie}"></option>
            `
            )
            document.getElementById('suggestions').innerHTML = suggestion;
        }
    }
})

// AFFICHAGE DE LA CARTE APRES CLICK SUR RECHERCHER
btnSearch.onclick = function(){
    var optionSelect = selectOption(); // recherche de l'option choisie

    if(optionSelect == "titre") {
        var searchUser = document.querySelector("#searchInput").value;
        var result = tInfos.filter(item => item.infosTitre.toLocaleLowerCase().includes(searchUser.toLocaleLowerCase()));

        var cheminImg = result[0].nomSerie + "-" + result[0].numero + "-" + result[0].titre;
        
        cheminImg = cheminImg.replace(':', '');
        cheminImg = cheminImg.replace("'", '');

        infoAuteur.textContent = result[0].nomAuteur;
        infoTitre.textContent = result[0].titre;
        infoSerie.textContent = result[0].nomSerie;
        infoIsbn.innerHTML = "HPCM-2456";
        infoCode.textContent = result[0].idAlbum;
        infoNbrBd.innerHTML = "3";
        infoStock.innerHTML = "1";

        if (infoStock.innerHTML > 0) infoStock.style.color = "green";
        else infoStock.style.color = "red";
        

    } else if(optionSelect == "auteur") {
        var searchUser = document.querySelector("#searchInput").value;
        var result = tInfos.filter(item => item.infosAuteur.toLocaleLowerCase().includes(searchUser.toLocaleLowerCase()));

        var cheminImg = result[0].nomSerie + "-" + result[0].numero + "-" + result[0].titre;
        
        cheminImg = cheminImg.replace(':', '');
        cheminImg = cheminImg.replace("'", '');
        
        infoAuteur.textContent = result[0].nomAuteur;
        infoTitre.textContent = result[0].titre;
        infoSerie.textContent = result[0].nomSerie;
        infoIsbn.innerHTML = "HPCM-2456";
        infoCode.textContent = result[0].idAlbum;
        infoNbrBd.innerHTML = "3";
        infoStock.innerHTML = "1";

        if (infoStock.innerHTML > 0) infoStock.style.color = "green";
        else infoStock.style.color = "red";

    } else {
        var searchUser = document.querySelector("#searchInput").value;
        var result = tInfos.filter(item => item.infosSerie.toLocaleLowerCase().includes(searchUser.toLocaleLowerCase()));

        var cheminImg = result[0].nomSerie + "-" + result[0].numero + "-" + result[0].titre;
        
        cheminImg = cheminImg.replace(':', '');
        cheminImg = cheminImg.replace("'", '');
        
        infoAuteur.textContent = result[0].nomAuteur;
        infoTitre.textContent = result[0].titre;
        infoSerie.textContent = result[0].nomSerie;
        infoIsbn.innerHTML = "HPCM-2456";
        infoCode.textContent = result[0].idAlbum;
        infoNbrBd.innerHTML = "3";
        infoStock.innerHTML = "1";

        if (infoStock.innerHTML > 0) infoStock.style.color = "green";
        else infoStock.style.color = "red";
    }
    controleEmprunt();
}




// -------------------------------------------------------------------------------------------------------
// -------- BOUTONS VALIDER OU ANNULER -------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------

btnValiderEmprunt.onclick = function() {
    
}

btnAnnulerEmprunt.onclick = function() {
    document.location.reload();
}



// -------------------------------------------------------------------------------------------------------
// -------- FONCTIONS CONTROLE ---------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------

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
        btnValiderEmprunt.style.background = "var(--orange)";
        btnValiderEmprunt.style.color = "black";
        btnValiderEmprunt.textContent = "Valider Dépôt";
    } else {
        console.log("emprunt pas possible")
        btnValiderEmprunt.style.background = "red";
        btnValiderEmprunt.style.color = "white";
        btnValiderEmprunt.textContent = "Dépôt Impossible";
    }
}


function controleEmprunt() {
    
    var stock = infoStock.innerHTML;
    var abonne = document.getElementById("abonnement").innerHTML;
    var emprunt = document.getElementById("bdEmprunt").innerHTML;
    var retard = document.getElementById("bdRetard").innerHTML;

    console.log("stock : " + stock);
    console.log("emprunt : " + emprunt)
    console.log("retard : " + retard)

    if(abonne == "oui" && stock > 0 && emprunt < 3 && retard == 0) {
        bEmpruntPossible = true;
    } else {
        bEmpruntPossible = false;
    }
    
    if(abonne != "") {
        if(bEmpruntPossible) {
            console.log("emprunt possible")
            //btnValiderEmprunt.style.border = "solid blue";
            btnValiderEmprunt.style.background = "var(--orange)";
            btnValiderEmprunt.style.color = "black";
            btnValiderEmprunt.textContent = "Valider Dépôt";
        } else {
            console.log("emprunt pas possible")
            //btnValiderEmprunt.style.border = "solid blue";
            btnValiderEmprunt.style.background = "red";
            btnValiderEmprunt.style.color = "white";
            btnValiderEmprunt.textContent = "Dépôt Impossible";
        }
    } else {
        btnValiderEmprunt.style.background = "red";
        btnValiderEmprunt.style.color = "white";
        btnValiderEmprunt.textContent = "Selectionnez un abonné";
    }
}
