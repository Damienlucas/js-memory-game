// -------------------bootstrap offcanvas-------------------
var offcanvasElementList = [].slice.call(document.querySelectorAll('.offcanvas'))
var offcanvasList = offcanvasElementList.map(function (offcanvasEl) {
  return new bootstrap.Offcanvas(offcanvasEl)
})
// ----------------------------------dark-theme-----------------------
const iconMoon = document.getElementById("icon-moon");
const iconSun = document.getElementById("icon-sun");
const icon = document.getElementById("icon");


icon.onclick = function (){
    document.body.classList.toggle("dark-theme");
    if(document.body.classList.contains("dark-theme")){
        iconSun.style.display = "block";
        iconMoon.style.display = "none";
    }
    else{
        iconSun.style.display = "none";
        iconMoon.style.display = "block";
    }
}
// -------------------------------explosion confettis-----------------------------
const containerSlot = document.querySelector('.slot');
const emojis = ["⭐", "🌟", "🌠", "🏆"];

function fiesta(){

    if(isTweening()) return;

    for(let i = 0; i < 200; i++){
        const confetti = document.createElement('div');
        confetti.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        containerSlot.appendChild(confetti);
    }
    animateConfettis();
}
function animateConfettis(){
    const TLCONF = gsap.timeline();
    TLCONF
    .to('.slot div', { 
        y: "random(-300,300)",
        x: "random(-300,300)",
        z: "random(0,1000)",
        rotation: "random(-90,90)",
        duration: 2,
    })
    .to('.slot div', {autoAlpha: 0, duration: 0.4}, '-=0.2')
    .add(() => {
        containerSlot.innerHTML = "";
    })
}
function isTweening(){
    return gsap.isTweening('.slot div');
}
// -------------------------------choix difficulte--------------
const facile = document.getElementById("facile");
const moyen = document.getElementById("moyen");
const difficile = document.getElementById("difficile");
const spanFacile = document.getElementById("span-facile");
const spanMoyen = document.getElementById("span-moyen");
const spanDifficile = document.getElementById("span-difficile");
const choix = document.getElementById("choix");
const jeu = document.getElementById("jeu");
const niveauBtn = document.getElementById("niveauBtn");
const message = document.getElementById('message');
const btnRejouer = document.getElementById('rejouer');

var tabJeu = [
    // on créé un tableau de 4 lignes "[]" avec 4 colonnes (chuffres entre les parentheses)
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
];
var tabResultat = genereTableauAleatoire();

var tabJeuMoyen = [
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
];
var tabResultatMoyen = genereTableauAleatoireMoyen();

function option (){
    facile.addEventListener('click', () => {
    choix.style.display = "none";
    jeu.style.display = "block";
    spanFacile.style.display = "block";
    afficherTableau ();
    })   
    moyen.addEventListener('click', () => {
        choix.style.display = "none";
        jeu.style.display = "block";
        spanMoyen.style.display = "block";
        afficherTableauMoyen (); 
    })
    difficile.addEventListener('click', () => {
        choix.style.display = "none";
        jeu.style.display = "block";
        spanDifficile.style.display = "block";
    })
}
option();

// ---------------------jeu------------------------
// ----------------------------------choix facile---------------------------------------
const divResultat = document.querySelector("#resultat");
divResultat.innerHTML = "coucou";


var paire = 0;
// pour me permettre de déterminer si la partie est gagnée


// var tabResultat = [
//     [1,4,3,4],
//     [1,2,3,2],
//     [7,8,6,5],
//     [8,7,5,6],
// ];

var oldSelection = [];
var nbAffiche = 0;
// cela va permettre de comparer les paires
// var oldSelection permet de garder en memoire les positions precedentes
// var nbAffiche nous servira en l incrementant de 1 de demander la fonction verification quand on arrivera a 2 boutons retournés

var ready = true;
// on créé cette valeur pour que quand c'est true on peut appuyer sur le bouton


function afficherTableau (){
    niveauBtn.addEventListener('click', () => {
        document.location.reload(true);
    })
    var txt = "";
    for(var i = 0; i < tabJeu.length; i++){
        // tabJeu.length pour dire que ça s'arrête après toutes les lignes du tableau (donc ici 4 éléments car 4 lignes)
        txt += "<div>";
        // on demande de générer une div
        for(var j = 0; j < tabJeu[i].length; j++){
            // là on refait pour chaque elements à l'intérieur des lignes (ici 4)
            if(tabJeu[i][j] === 0){
     // si i et j sont valeur 0 on affiche le bouton
                txt += "<button onClick='verif(\""+i+"-"+j+"\")'></button>"
                // la on demande de créer 4 boutons avec les classes bootstrap dans les lignes
                // avec onClick on demande que quand on clique sur le bouton cela execute la fonction vefif et renvoie la position du bouton (ce qu'il y a entre () donc nos variables i et j puisqu on les a definis comme ça dans notre tableau)
                // "+i+"-"+j+" renvoie des chiffres et cela va generer des erreurs il faut donc les transformer en chaine de caractere en rajoutant au debut et à la fin \" car \ va desactiver les " que l on a mis avant la balise button (txt += "<button)
            // je prefere creer un fichier css mais on peut aussi intégrer du style directement comme ceci txt += "<button class='btn btn-primary m-2' style='width:100px;height:100px'>Afficher</button>" 
            }
            else{
                txt += "<img src='"+getImage(tabJeu[i][j])+"'>";
            }
    // sinon on génère une image qui correspondra au valeur i et j et en fonction du switch dans la fonction getImage
        }
        txt += "<div>";
        // on ferme notre boucle for afin d'avoir 4 lignes donc 4 div
    }
    divResultat.innerHTML = txt;
} 
function getImage(valeur){
    var imgTxt = "./images/facile/";
    // on donne comme valeur à la variable l'image que l'on veut afficher. Comme on utilise += on peut mettre la racine par default dans la valeur pour ne pas la réédrire à chaque fois
    switch(valeur){     
        case 1 : imgTxt += "elephant.png";
            break;
        case 2 : imgTxt += "giraffe.png";
            break;
        case 3 : imgTxt += "hippo.png";
            break;
        case 4 : imgTxt += "monkey.png";
            break;
        case 5 : imgTxt += "panda.png";
            break;
        case 6 : imgTxt += "parrot.png";
            break;
        case 7 : imgTxt += "penguin.png";
            break;
        case 8 : imgTxt += "pig.png";
            break;
        default: console.log("cas non pris en compte")
    }
    return imgTxt;
}
function verif(bouton){
    if(ready){
        // si ready est true alors on peut faire ça sinon non
        nbAffiche++;
        // la a chaque carte retournée on incrémente nbAffiche de 1 
        var ligne = bouton.substr(0,1);
        // substr c est substring donc je découpe ma chaine de caractère et je veux récupérer mon premier caractère donc dans (0,1) 0 correspond à mon premier caractère affiché dans ce que renvoie la position du bouton. par exemple le bouton de la deuxième ligne et de la deuxième colonne va renvoyé (1,1) donc le 0 de substr va récupérer le premier 1 il faut donc créer une autre variable et on dira 2 pour récupérer le deuxième caractère. Le deuxième chiffre après la virgule est le nombre d'éléments que l'on souhaite
        var colonne = bouton.substr(2,1);

        tabJeu[ligne][colonne] = tabResultat[ligne][colonne];
        afficherTableau();

        if(nbAffiche > 1){
            // quand nbAffiche > 1 c est qu'on a 2 cartes retournées donc on lancera la verification
            ready = false;
            // la on est plus pret a appuyer sur un bouton car on a déjà appuyer sur deux boutons
            setTimeout(() => {
                // c est une fonction asynchrone qui fonctionne avec une fonction anonyme pour ça juste les parenthèses
                // vérification
                if(tabJeu[ligne][colonne] !== tabResultat[oldSelection[0]][oldSelection[1]]){
                    // est ce que le resultat de tabJeu est différent au resultat tabResultat présent dans oldSelection[ligne][colonne]
                        tabJeu[ligne][colonne] = 0;
                        tabJeu[oldSelection[0]][oldSelection[1]] = 0;
                        // on réinitialise les valeurs donc le tableau
                }
                else{
                    paire++;
                    if(paire == 8){
                        jeu.style.display="none";
                        message.style.display="block";
                        fiesta();
                    }
                }
                afficherTableau();
                ready = true;
                // pour dire à l'utilisateur maintenant tu peux rappuyer sur un autre bouton
                nbAffiche = 0;
            // là on remet nbAffiche à 0
                    oldSelection = [ligne,colonne];
            },500)   
            // on indique combien de millisecondes aprés le setTimeout réalisera la fonction fléchée 
        }
        else {
            oldSelection = [ligne,colonne];
        }
    }
    btnRejouer.addEventListener('click', () => {
        document.location.reload(true);
        // la on lui demande de relancer la page donc redemarrage du jeu
    })
}
function genereTableauAleatoire(){
    var tab = [];
    var nbImagePosition = [0,0,0,0,0,0,0,0];
    // cette variable contient le nombre d'images que l'on a mis dans le tableau

    for(var i = 0 ; i < 4 ; i++){
        var ligne = [];
        for(var j = 0 ; j < 4 ; j++){
            var fin = false;
            // on créé cette variable pour générer une fin à notre création d'images
            while(!fin){
            // tant que non fin donc tant que while n'est pas différent de false on continue à générer une image
                var randomImage = Math.floor(Math.random() * 8);
                // on genere un chiffre aleatoire entre 0 et 1 avec Math.random que l on multiplie par 8 car 8 images ici et Math.floor permet d'arondir à l'entier inférieur (ici on aura 7 et non 8 mais c'est normal car nos images sont dans un tableau donc commence à 0 et non 1)
                if(nbImagePosition[randomImage] < 2){
                    // si la valeur randomImage est inférieur à 2 (donc si on a moins de 2 images) dans notre tableau nbImagePosition
                    ligne.push(randomImage+1);
                    // ici on rajoute 1 car dans notre switch les case commence à 1 et non 0
                    nbImagePosition[randomImage]++;
                    // j'incrémente ma valeur de nbImagePosition donc je passe à la virgule suivante
                    fin = true;
                }
            }
        }
        tab.push(ligne);
        // permet de générer une ligne à mon tableau
    }
    return tab;
}
// ---------------------------------------choix moyen-------------------------
function afficherTableauMoyen (){
    niveauBtn.addEventListener('click', () => {
        document.location.reload(true);
    })
    var txt = "";
    for(var i = 0; i < tabJeuMoyen.length; i++){
        txt += "<div>";
        for(var j = 0; j < tabJeuMoyen[i].length; j++){
            if(tabJeuMoyen[i][j] === 0){
                txt += "<button onClick='verifMoyen(\""+i+"-"+j+"\")'></button>" 
            }
            else{
                txt += "<img src='"+getImageMoyen(tabJeuMoyen[i][j])+"'>";
            }
        }
        txt += "<div>";
    }
    divResultat.innerHTML = txt;
} 

function getImageMoyen(valeur){
    var imgTxt = "./images/moyen/";
    switch(valeur){     
        case 1 : imgTxt += "buffalo.png";
            break;
        case 2 : imgTxt += "chick.png";
            break;
        case 3 : imgTxt += "chicken.png";
            break;
        case 4 : imgTxt += "cow.png";
            break;
        case 5 : imgTxt += "crocodile.png";
            break;
        case 6 : imgTxt += "dog.png";
            break;
        case 7 : imgTxt += "elephant.png";
            break;
        case 8 : imgTxt += "frog.png";
            break;
        case 9 : imgTxt += "giraffe.png";
            break;
        case 10 : imgTxt += "hippo.png";
            break;
        case 11 : imgTxt += "horse.png";
            break;
        case 12 : imgTxt += "monkey.png";
            break;
        case 13 : imgTxt += "owl.png";
            break;
        case 14 : imgTxt += "pig.png";
            break;
        case 15 : imgTxt += "rhino.png";
            break;
        case 16 : imgTxt += "whale.png";
            break;
        case 17 : imgTxt += "snake.png";
            break;
        case 18 : imgTxt += "walrus.png";
            break;
        default: console.log("cas non pris en compte")
    }
    return imgTxt;
}

function verifMoyen(bouton){
    if(ready){
        nbAffiche++;
        var ligne = bouton.substr(0,1);
        var colonne = bouton.substr(2,1);

        tabJeuMoyen[ligne][colonne] = tabResultatMoyen[ligne][colonne];
        afficherTableauMoyen();

        if(nbAffiche > 1){
            ready = false;
            setTimeout(() => {
                if(tabJeuMoyen[ligne][colonne] !== tabResultatMoyen[oldSelection[0]][oldSelection[1]]){
                        tabJeuMoyen[ligne][colonne] = 0;
                        tabJeuMoyen[oldSelection[0]][oldSelection[1]] = 0;
                }
                else{
                    paire++;
                    if(paire == 18){
                        jeu.style.display="none";
                        message.style.display="block";
                        fiesta();
                    }
                }
                afficherTableauMoyen();
                ready = true;
                nbAffiche = 0;
                    oldSelection = [ligne,colonne];
            },500)   
        }
        else {
            oldSelection = [ligne,colonne];
        }
    }
    btnRejouer.addEventListener('click', () => {
        document.location.reload(true);
    })
}

function genereTableauAleatoireMoyen(){
    var tab = [];
    var nbImagePositionMoyen = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

    for(var i = 0 ; i < 6 ; i++){
        var ligne = [];
        for(var j = 0 ; j < 6 ; j++){
            var fin = false;
            while(!fin){
                var randomImage = Math.floor(Math.random() * 18);
                if(nbImagePositionMoyen[randomImage] < 2){
                    ligne.push(randomImage+1);
                    nbImagePositionMoyen[randomImage]++;
                    fin = true;
                }
            }
        }
        tab.push(ligne);
    }
    return tab;
}