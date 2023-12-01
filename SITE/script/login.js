var tMediatheque = [

    {username: "Sarah Connor", mdp : "MBiblio001", role: "biblio"},
    {username: "John Wick", mdp : "MBiblio002", role: "biblio"},
    {username: "James Bond", mdp : "MResponsable001", role: "resp"},
    {username: "Pamela Rose", mdp : "MAdmin001", role: "admin"},

]

function getInfo() {
    var username = document.getElementById("username").value;
    var mdp = document.getElementById("mdp").value;

    for(i = 0; i < tMediatheque.length; i++) {
        if (username == tMediatheque[i].username && mdp == tMediatheque[i].mdp) {
            console.log(username + ", vous êtes connecté");
            return
        } else {
            console.log ("Identifiant ou mot de passe incorrect")
        }
    }
}