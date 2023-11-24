// ------ CONVERTION DES DONNEES EN TABLEAU -----
// récupère le contenue
let tAlbums = [...albums.values()];
console.log(tAlbums);
// récupère l'id
let tAlbumsId = [...albums.keys()];


// récupère le contenue
let tSeries = [...series.values()];
// récupère l'id
let tSeriesId = [...series.keys()];

// récupère le contenue
let tAuteur = [...auteurs.values()];
// récupère l'id
let tAuteurId = [...auteurs.keys()];
console.log(tAuteur);
console.log(tAuteurId);



// ----- RECUPERATION DE DIVERS CONTENUS DE LA PAGE -----
// var option = document.querySelector(".option").selectedIndex.options[choice].value;
// console.log(option);

var btnSearch = document.querySelector("#btnSearch");
var carte = document.querySelector("#carte");
var carteCache = document.querySelector("#carteCache");
var searchInput = document.querySelector("#searchInput");


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



// ----- mise à jour à chaque touche entrée dans la zone de recherche
searchInput.addEventListener('keyup', function(){
    var optionSelect = selectOption(); // recherche de l'option choisie


// Affichage des suggestions en fonction de l'option choisie
//---- SI TITRE ----
    if(optionSelect == "titre") {
        var input = searchInput.value;
        var resultTitre = tAlbums.filter(item => item.titre.toLocaleLowerCase().includes(input.toLocaleLowerCase()));
        var suggestion = '';
        
        if(input !='') {
        resultTitre.forEach(resultTitre =>
            suggestion +=`
            <option id="suggestions" value="${resultTitre.titre}"></option>
            `
            )
            document.getElementById('suggestions').innerHTML = suggestion;
        }
//---- SI AUTEUR ----
    } else if(optionSelect == "auteur") {
        var input = searchInput.value;
        var resultAuteur = tAuteur.filter(item => item.nom.toLocaleLowerCase().includes(input.toLocaleLowerCase()));
        var suggestion = '';
        
        if(input !='') {
            resultAuteur.forEach(resultAuteur =>
            suggestion +=`
            <option id="suggestions" value="${resultAuteur.nom}"></option>
            `
            )
            document.getElementById('suggestions').innerHTML = suggestion;
        }
//---- SI SERIE ----
    } else {
        var input = searchInput.value;
        var resultSerie = tSeries.filter(item => item.nom.toLocaleLowerCase().includes(input.toLocaleLowerCase()));
        var suggestion = '';
        
        if(input !='') {
            resultSerie.forEach(resultSerie =>
            suggestion +=`
            <option id="suggestions" value="${resultSerie.nom}"></option>
            `
            )
            document.getElementById('suggestions').innerHTML = suggestion;
        }
    }
})


btnSearch.onclick = function(){
    var optionSelect = selectOption(); // recherche de l'option choisie

    if(optionSelect == "titre") {
        var searchUser = document.querySelector("#searchInput").value;
        var result = tAlbums.filter(item => item.titre.toLocaleLowerCase().includes(searchUser.toLocaleLowerCase()));
        console.log(result);

        var IdSerie = tSeriesId.indexOf(result[0].idSerie);
        var serie = tSeries[IdSerie].nom;
        var IdAuteur = tAuteurId.indexOf(result[0].idAuteur);
        var auteur = tAuteur[IdAuteur].nom;
        var cheminImg = serie + "-" + result[0].numero + "-" + result[0].titre;
        
        cheminImg = cheminImg.replace(':', '');
        cheminImg = cheminImg.replace("'", '');
        
        carteCache.innerHTML =
        "<div class='card m-2' style='width: 18rem;'>" +
        "<img src='../ressources/albums/" + cheminImg + ".jpg' class='card-img-top' alt='...'>" +
        
        "<div class='card-body'>" +
        "<h4 class='card-title'>"+result[0].titre+"</h4>" +
        "<p class='card-text my-1'>Série : <b>"+serie+"</b></p>" +
        "<p class='card-text my-1'>Numéro : <b>"+result[0].numero+"</b></p>" +
        "<p class='card-text my-1'>Auteur : <b>"+auteur+"</b></p>" +
        "<p class='card-text my-1'>Prix : "+result[0].prix+" €</p>" +
        
        "<p class='card-text my-1 mt-3'>id Série : "+result[0].idSerie+"</p>" +   
        "<p class='card-text my-1'>id Auteur : "+result[0].idAuteur+"</p>" +
        
        "<a href='#' class='btn btn-primary'>En savoir plus...</a>" +
        "</div>" +
        "</div>";

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        console.log(result[0].titre); // Destins
        console.log(result[0].idAuteur); // 39 id auteur
        console.log(tAuteurId.includes(result[0].idAuteur)); // true id auteur trouvé dans le tabeau idAuteur
        // récuperer l'emplacement de l'id Auteur


        console.log(tAlbums[0].titre.includes(result[0].titre));
        console.log("mon index : " + tAlbums.find((index) => index == "Croc vert"));



    } else if(optionSelect == "auteur") {
        var searchUser = document.querySelector("#searchInput").value;
        var result = tAuteur.filter(item => item.nom.toLocaleLowerCase().includes(searchUser.toLocaleLowerCase()));

        var test = tAuteur.filter(item => item.nom.toLocaleLowerCase().includes(searchUser.toLocaleLowerCase()));

        console.log(result);
        console.log(test.keys);
        //console.log(resultId[0].IdAuteur);
        
        // var cheminImg = serie + "-" + result[0].numero + "-" + result[0].titre;
        // cheminImg = cheminImg.replace(':', '');
        // cheminImg = cheminImg.replace("'", '');
        
        var nbrAuteur = tAlbums.filter(item => item.idAuteur.includes(idAuteur));
        console.log(nbrAuteur.length)
        console.log(idAuteur)


        var input = searchInput.value;
        var resultSearch = tAlbums.filter(item => item.idAuteur.includes(input.toLocaleLowerCase()));
        var suggestion = '';
        
        if(input !='') {
            resultSearch.forEach(resultSearch =>
            suggestion +=`
            <option id="suggestions" value="${resultSearch.titre}"></option>
            `
            )
            document.getElementById('suggestions').innerHTML = suggestion;
        }


        carteCache.innerHTML =
        "<div class='card m-2' style='width: 18rem;'>" +
        "<img src='../ressources/albums/" + cheminImg + ".jpg' class='card-img-top' alt='...'>" +
        
        "<div class='card-body'>" +
        "<h4 class='card-title'>"+result[0].titre+"</h4>" +
        "<p class='card-text my-1'>Série : <b>"+serie+"</b></p>" +
        "<p class='card-text my-1'>Numéro : <b>"+result[0].numero+"</b></p>" +
        "<p class='card-text my-1'>Auteur : <b>"+auteur+"</b></p>" +
        "<p class='card-text my-1'>Prix : "+result[0].prix+" €</p>" +
        
        "<p class='card-text my-1 mt-3'>id Série : "+result[0].idSerie+"</p>" +   
        "<p class='card-text my-1'>id Auteur : "+result[0].idAuteur+"</p>" +
        
        "<a href='#' class='btn btn-primary'>En savoir plus...</a>" +
        "</div>" +
        "</div>";
    } else {

    }

}