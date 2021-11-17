//Declara les variables nom, cognom, btn-guardar i titol

// let nom = document.getElementById('nom');
// let cognom = document.getElementById('cognom');
// let btn = document.getElementById('btn-guardar');
// let titol = document.getElementById('titol');

// let nomAnterior = JSON.parse(window.localStorage.getItem('nom'));
// if(nomAnterior != undefined) {
//     titol.innerText = `Hola ` + nomAnterior.nom + ' ' + nomAnterior.cognom;   // <-- Text
// }

// btn.addEventListener("click", () => {
//     titol.innerText = `Hola ` + nom.value + ' ' + cognom.value;
//     let dada = {nom: nom.value, cognom: cognom.value};
//     window.localStorage.setItem('nom', JSON.stringify(dada));
// });

// Porjcte SCRUM ALBEX

//Declarar les variables
let codi = document.getElementById('codi');
let descripcio = document.getElementById('descripcio');
let dataInici = document.getElementById('dataInici');
let dataFinal = document.getElementById('dataFinal');
let nom = document.getElementById('nom');
let btn = document.getElementById('btn-Crear');
let div1 = document.getElementsByClassName('div1')[0];

mostrarDades();

//Boto per entrar dades a ToDo
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

// Funcio mostrar dades al desplegable
function mostrarDades() {
    div1.innerText = '';
    let tascaAnterior = JSON.parse(window.localStorage.getItem('tasca'));
    if(tascaAnterior != undefined)
    {
        for(let i = 0; i < tascaAnterior.length; i++)
        {
            div1.innerHTML += `<p id="${'drag' + tascaAnterior[i].codi}" draggable="true" ondragstart="drag(event)">
            ${tascaAnterior[i].codi + ' ' + tascaAnterior[i].descripcio + ' ' + tascaAnterior[i].dataInici + ' ' + tascaAnterior[i].dataFinal + ' ' + tascaAnterior[i].nom}</p> <br>`
            // let opt = document.createElement('p');
            // opt.id = 'drag'+tascaAnterior[i].codi;
            // opt.draggable = "true";
            // opt.ondragstart = "drag(event)";
            // opt.innerText = tascaAnterior[i].codi + ' ' + tascaAnterior[i].descripcio + ' ' + tascaAnterior[i].dataInici + ' ' + tascaAnterior[i].dataFinal + ' ' + tascaAnterior[i].nom;
            // div1.appendChild(opt);
        }
    }
}

function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    console.log(data);
    ev.target.appendChild(document.getElementById(data));
}