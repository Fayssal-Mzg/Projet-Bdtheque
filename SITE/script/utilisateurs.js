//console.log("tUsers chargé OK")
var tUsers = [

    {nom: "Raton Anthony", abonne: "oui", bdEmprunt: "1", bdRetard: "0", cdeUser: "001", amende: "0"},
    {nom: "Bernou Michel", abonne: "oui", bdEmprunt: "1", bdRetard: "1", cdeUser: "002", amende: "0"},
    {nom: "Virulo Sandrine", abonne: "non", bdEmprunt: "0", bdRetard: "0", cdeUser: "003", amende: "0"},
    {nom: "Virulo Margot", abonne: "oui", bdEmprunt: "3", bdRetard: "0", cdeUser: "004", amende: "0"},
    {nom: "Rami Sophie", abonne: "oui", bdEmprunt: "3", bdRetard: "1", cdeUser: "005", amende: "0"},
    

    {
        nom: "Tarten Pion", 
        cdeUser: "006",
        abonne: "oui", 
        amende: "0",
        bdEmprunt: {
            bd1: {cdeBd : "132", date: "15/10"},
            bd2: {cdeBd : "18", date: "29/11"}
        }, 
        bdRetard: {
            bd1: {cdeBd : "132", date: "15/10"},
        }},

    {
        nom: "Machin Truc", 
        cdeUser: "007",
        abonne: "oui", 
        amende: "0",
        bdEmprunt: {
            bd1: {cdeBd : "126", date: "15/10"},
            bd2: {cdeBd : "15", date: "29/11"},
            bd3: {cdeBd : "225", date: "29/11"}
        }, 
        bdRetard: {
            bd1: {cdeBd : "126", date: "15/10"},
        }},

]

// Récupère le nombre de BDs empruntés
console.log("Bds empruntées : " + Object.keys(tUsers[5].bdEmprunt).length);
// Récupère le nombre de BDs en retard
console.log("BDs en retard : " + Object.keys(tUsers[5].bdRetard).length);

// console.log(tUsers[5].nom);
// console.log(tUsers[5].bdEmprunt);
// console.log(tUsers[5].bdEmprunt.bd1);
// console.log(tUsers.length);