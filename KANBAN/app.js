// Porjcte SCRUM ALBEX

//Declarar les variables
let codi = document.getElementById('codi');
let descripcio = document.getElementById('descripcio');
let dataInici = document.getElementById('dataInici');
let dataFinal = document.getElementById('dataFinal');
let nom = document.getElementById('nom');
let tria = document.getElementById('tria');
let btn = document.getElementById('btn-Crear');
let div1 = document.getElementsByClassName('div1')[0];

mostrarDades();

//Boto per entrar dades a ToDo
btn.addEventListener("click", () => {
    let tasquesAnteriors = JSON.parse(window.localStorage.getItem('tasca'));
    if(tasquesAnteriors != undefined) {
        tasquesAnteriors.push({codi: codi.value, descripcio: descripcio.value, dataInici: dataInici.value, 
            dataFinal: dataFinal.value, nom: nom.value, tria: tria.value});
            window.localStorage.setItem('tasca', JSON.stringify(tasquesAnteriors));
    } else {
        let dades = {codi: codi.value, descripcio: descripcio.value, dataInici: dataInici.value, 
            dataFinal: dataFinal.value, nom: nom.value, tria: tria.value};
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
            if(tascaAnterior[i].tria == 'urgent')
            {
                div1.innerHTML += `<p id="${'drag' + tascaAnterior[i].codi}" draggable="true" ondragstart="drag(event)" class="urgent">
                ${tascaAnterior[i].codi + ' ' + tascaAnterior[i].descripcio + ' ' + tascaAnterior[i].dataInici + ' ' + tascaAnterior[i].dataFinal + ' ' + tascaAnterior[i].nom + ' ' + tascaAnterior[i].tria}</p>`
            }
            else if(tascaAnterior[i].tria == 'poc urgent')
            {
                div1.innerHTML += `<p id="${'drag' + tascaAnterior[i].codi}" draggable="true" ondragstart="drag(event)" class="poc">
                ${tascaAnterior[i].codi + ' ' + tascaAnterior[i].descripcio + ' ' + tascaAnterior[i].dataInici + ' ' + tascaAnterior[i].dataFinal + ' ' + tascaAnterior[i].nom + ' ' + tascaAnterior[i].tria}</p>`
            }
            else if(tascaAnterior[i].tria == 'molt urgent')
            {
                div1.innerHTML += `<p id="${'drag' + tascaAnterior[i].codi}" draggable="true" ondragstart="drag(event)" class="molt">
                ${tascaAnterior[i].codi + ' ' + tascaAnterior[i].descripcio + ' ' + tascaAnterior[i].dataInici + ' ' + tascaAnterior[i].dataFinal + ' ' + tascaAnterior[i].nom + ' ' + tascaAnterior[i].tria}</p>`
            }
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