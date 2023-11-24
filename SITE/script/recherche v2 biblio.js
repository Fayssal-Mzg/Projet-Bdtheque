// ----- RECUPERATION DE DIVERS CONTENUS DE LA PAGE -----

var btnSearch = document.querySelector("#btnSearch");
var carte = document.querySelector("#carte");
var carteCache = document.querySelector("#carteCache");
var searchInput = document.querySelector("#searchInput");

var infoAuteur = document.querySelector("#infoAuteur");
var infoTitre = document.querySelector("#infoTitre");
var infoSerie = document.querySelector("#infoSerie");
var infoIsbn = document.querySelector("#infoIsbn");
var infoCode = document.querySelector("#infoCode");
var infoNbrBd = document.querySelector("#infoNbrBd");
var infoStock = document.querySelector("#infoStock");


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
        carteCache.innerHTML = "";
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

        infoAuteur.innerHTML = result[0].nomAuteur;
        infoTitre.innerHTML = result[0].titre;
        infoSerie.innerHTML = result[0].nomSerie;
        //infoIsbn.innerHTML = result[0].nomAuteur;
        infoCode.innerHTML = result[0].idAlbum;
        //infoNbrBd.innerHTML = result[0].nomAuteur;
        //infoStock.innerHTML = result[0].nomAuteur;
        

    } else if(optionSelect == "auteur") {
        var searchUser = document.querySelector("#searchInput").value;
        var result = tInfos.filter(item => item.infosAuteur.toLocaleLowerCase().includes(searchUser.toLocaleLowerCase()));

        var cheminImg = result[0].nomSerie + "-" + result[0].numero + "-" + result[0].titre;
        
        cheminImg = cheminImg.replace(':', '');
        cheminImg = cheminImg.replace("'", '');
        
        carteCache.innerHTML =
        "<div class='card m-2' style='width: 18rem;'>" +
        "<img src='../ressources/albums/" + cheminImg + ".jpg' class='card-img-top' alt='...'>" +
        
        "<div class='card-body'>" +
        "<h4 class='card-title'>"+result[0].titre+"</h4>" +
        "<p class='card-text my-1'>Série : <b>"+result[0].nomSerie+"</b></p>" +
        "<p class='card-text my-1'>Numéro : <b>"+result[0].numero+"</b></p>" +
        "<p class='card-text my-1'>Auteur : <b>"+result[0].nomAuteur+"</b></p>" +
        "<p class='card-text my-1'>Prix : "+result[0].prix+" €</p>" +
        
        "<p class='card-text my-1 mt-3'>id Série : "+result[0].idSerie+"</p>" +   
        "<p class='card-text my-1'>id Auteur : "+result[0].idAuteur+"</p>" +
        
        "<a href='#' class='btn btn-primary'>En savoir plus...</a>" +
        "</div>" +
        "</div>";

    } else {
        var searchUser = document.querySelector("#searchInput").value;
        var result = tInfos.filter(item => item.infosSerie.toLocaleLowerCase().includes(searchUser.toLocaleLowerCase()));

        var cheminImg = result[0].nomSerie + "-" + result[0].numero + "-" + result[0].titre;
        
        cheminImg = cheminImg.replace(':', '');
        cheminImg = cheminImg.replace("'", '');
        
        carteCache.innerHTML =
        "<div class='card m-2' style='width: 18rem;'>" +
        "<img src='../ressources/albums/" + cheminImg + ".jpg' class='card-img-top' alt='...'>" +
        
        "<div class='card-body'>" +
        "<h4 class='card-title'>"+result[0].titre+"</h4>" +
        "<p class='card-text my-1'>Série : <b>"+result[0].nomSerie+"</b></p>" +
        "<p class='card-text my-1'>Numéro : <b>"+result[0].numero+"</b></p>" +
        "<p class='card-text my-1'>Auteur : <b>"+result[0].nomAuteur+"</b></p>" +
        "<p class='card-text my-1'>Prix : "+result[0].prix+" €</p>" +
        
        "<p class='card-text my-1 mt-3'>id Série : "+result[0].idSerie+"</p>" +   
        "<p class='card-text my-1'>id Auteur : "+result[0].idAuteur+"</p>" +
        
        "<a href='#' class='btn btn-primary'>En savoir plus...</a>" +
        "</div>" +
        "</div>";
    }

}