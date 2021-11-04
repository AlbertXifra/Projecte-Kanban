// Porjcte SCRUM ALBEX

//Declarar les variables
let tasca = document.getElementById('tasca');
let codi = document.getElementById('codi');
let descripcio = document.getElementById('descripcio');
let dataInici = document.getElementById('dataInici');
let dataFinal = document.getElementById('dataFinal');
let nom = document.getElementById('nom');
let btn = document.getElementById('btn-guardar');

mostrarDades();

//Boto per entrar dades
btn.addEventListener("click", () => {
    let tasquesAnteriors = JSON.parse(window.localStorage.getItem('tasca'));
    if(tasquesAnteriors != undefined) {
        tasquesAnteriors.push({codi: codi.value, descripcio: descripcio.value, dataInici: dataInici.value, 
            dataFinal: dataFinal.value, nom: nom.value});
            window.localStorage.setItem('tasca', JSON.stringify(tasquesAnteriors));

    } else {
        let dades = {codi: codi.value, descripcio: descripcio.value, dataInici: dataInici.value, 
            dataFinal: dataFinal.value, nom: nom.value};
        window.localStorage.setItem('tasca', JSON.stringify([dades]));
    }
    mostrarDades();
    
});

// Funcio mostrar dades
function mostrarDades() {
    tasca.innerText='';
    let tascaAnterior = JSON.parse(window.localStorage.getItem('tasca'));
    tascaAnterior.forEach((element) => tasca.innerText=tasca.innerText + JSON.stringify(element));
}