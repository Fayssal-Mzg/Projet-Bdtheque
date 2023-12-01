// ----- RECUPERATION DE DIVERS CONTENUS DE LA PAGE -----

var btnSearch = document.querySelector("#btnSearch");
var carte = document.querySelector("#carte");
var carteCache = document.querySelector("#carteCache");
var searchInput = document.querySelector("#searchInput");

var choixOption = document.getElementById("option");
var nbrClick =0;


// Action au changmeent de type de recherche
choixOption.onclick = function() {
    nbrClick++
    if(nbrClick == 2) {
        nbrClick = 0;
        console.log("input effacé")
        searchInput.value = "";
        searchInput.focus();
        carteCache.innerHTML = "";
        document.getElementById('suggestions').innerHTML = "";
    }
}

// ----- focus sur zone de recherche
searchInput.focus();


// -----------------------------------------------------------------------------------------------
// FONCTION DE RECHERCHE ET SUGGESTION
// -----------------------------------------------------------------------------------------------

// Mise à jour à chaque touche entrée dans la zone de recherche
searchInput.addEventListener('keyup', function(){
    var optionSelect = selectOption(); // recherche de l'option choisie
    var input = searchInput.value;


// Affichage des suggestions en fonction de l'option choisie
//---- SI TITRE ----
    if(optionSelect == "titre" && input.length > 2) {
        console.log("option ->>> Titre");
        var resultTitre = tInfos.filter(item => item.infosTitre.toLocaleLowerCase().includes(input.toLocaleLowerCase()));
        var suggestion = '';

        var tResult = [];
        
        for(let i=0; i < resultTitre.length; i++) {       
            var nom = resultTitre[i].infosTitre;
            if(tResult.includes(nom));
            else tResult.push(nom);
        }
        for(let i=0; i < tResult.length; i++) {   
            suggestion += '<option id="suggestions" value="' + tResult[i] + '"></option>';
        }
        document.getElementById('suggestions').innerHTML = suggestion;
//---- SI AUTEUR ----
    } else if(optionSelect == "auteur" && input.length > 1) {
        console.log("option ->>> Auteur");
        var resultAuteur = tInfos.filter(item => item.nomAuteur.toLocaleLowerCase().includes(input.toLocaleLowerCase()));
        var suggestion = '';

        var tResult = [];
        
        for(let i=0; i < resultAuteur.length; i++) {       
            var nom = resultAuteur[i].nomAuteur;
            if(tResult.includes(nom));
            else tResult.push(nom);
        }
        for(let i=0; i < tResult.length; i++) {   
            suggestion += '<option id="suggestions" value="' + tResult[i] + '"></option>';
        }
        document.getElementById('suggestions').innerHTML = suggestion;

    } else if(optionSelect == "serie" && input.length > 2) {
        console.log("option ->>> Série");
        var resultSerie = tInfos.filter(item => item.nomSerie.toLocaleLowerCase().includes(input.toLocaleLowerCase()));
        var suggestion = '';

        var tResult = [];
        
        for(let i=0; i < resultSerie.length; i++) {       
            var nom = resultSerie[i].nomSerie;
            if(tResult.includes(nom));
            else tResult.push(nom);
        }
        for(let i=0; i < tResult.length; i++) {   
            suggestion += '<option id="suggestions" value="' + tResult[i] + '"></option>';
        }
        document.getElementById('suggestions').innerHTML = suggestion;
    } else {
        document.getElementById('suggestions').innerHTML = "";
    }
});


// -----------------------------------------------------------------------------------------------
// ACTION AU CLICK SUR LE BOUTON RECHERCHER
// -----------------------------------------------------------------------------------------------

btnSearch.onclick = function(){
    // supprime les anciennes cartes visible
    carteCache.innerHTML = "";

    var optionSelect = selectOption(); // recherche de l'option choisie

    if(optionSelect = "serie") {
        var searchUser = document.querySelector("#searchInput").value;
        var result = tInfos.filter(item => item.infosTitre.toLocaleLowerCase().includes(searchUser.toLocaleLowerCase()));
    }

    else if(optionSelect = "auteur") {
        var searchUser = document.querySelector("#searchInput").value;
        var result = tInfos.filter(item => item.infosAuteur.toLocaleLowerCase().includes(searchUser.toLocaleLowerCase()));
    }
   
    //tri le tableau des résultat par nom puis par numéros
    result.sort(function compare(a, b) {
        if (a.nomSerie < b.nomSerie)
            return -1;
        if (a.nomSerie > b.nomSerie)
            return 1;

        else {
            if (a.numero < b.numero)
                return -1;
            if (a.numero > b.numero)
                return 1;
            else return 0;
        }
    });

    affichageCartes(result);
}


// -----------------------------------------------------------------------------------------------
// FONCTIONS
// -----------------------------------------------------------------------------------------------

// ----- Récupération de l'option choisie (titre, auteur ou série)
function selectOption() {
    var select = document.getElementById("option");
    var choice = select.selectedIndex;
    var option = select.options[choice].value;
    //console.log(option);

    return option;
}

// ----- Affichages des cartes
function affichageCartes(result) {
    // afficher autant de carte que de recherche serie inclu dans mon tableau.serie
    for(let i=0; i < result.length; i++) {
        var cheminImg = result[i].nomSerie + "-" + result[i].numero + "-" + result[i].titre;
        
        cheminImg = cheminImg.replace(':', '');
        cheminImg = cheminImg.replace("'", '');
        cheminImg = cheminImg.replace(" !", '');
        cheminImg = cheminImg.replace(" ?", '');
        cheminImg = cheminImg.replace(" !?", '');
        cheminImg = cheminImg.replace("!", '');
        cheminImg = cheminImg.replace("?", '');
        //console.log(cheminImg + "---");
        
        carteCache.innerHTML +=
        "<div class='card m-2' style='width: 18rem;'>" +
        "<img src='../ressources/albums/" + cheminImg + ".jpg' class='card-img-top m-auto mt-1' style='width: 95%;' alt='...'>" +
        
        "<div class='card-body'>" +
        "<h4 class='card-title'>"+result[i].titre+"</h4>" +
        "<p class='card-text my-1'>Série : <b>"+result[i].nomSerie+"</b></p>" +
        "<p class='card-text my-1'>Numéro : <b>"+result[i].numero+"</b></p>" +
        "<p class='card-text my-1'>Auteur : <b>"+result[i].nomAuteur+"</b></p>" +
        "<p class='card-text my-1'>Prix : "+result[i].prix+" €</p>" +    
        //"<p class='card-text my-1 mt-3'>id Série : "+result[i].idSerie+"</p>" +   
        //"<p class='card-text my-1'>id Auteur : "+result[i].idAuteur+"</p>" +
        "</div>" +
        "<a href='#' class='btn btn-primary m-1'>Emprunter</a>" +
        //"</div>" +
        "</div>";
    }
}
