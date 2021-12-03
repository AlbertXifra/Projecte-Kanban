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
    
    // If per mirar sino hi han dades en buit
    if(codi.value != "" && descripcio.value != "" && dataInici.value != "" && dataFinal.value != "" &&
    nom.value != "" && tria.selectedOptions[0] != "")
    {
        let tasquesAnteriors = JSON.parse(window.localStorage.getItem('tasca'));

        //If per comprovar que el codi no s'hagi repetit
        if(!comprovarTasquesRep()) {
            
            if(negatiuCodi()) {
                //If per comprovar que el codi no sigui mes petit o igual a 0
                if(tasquesAnteriors != undefined) {
                    tasquesAnteriors.push({codi: codi.value, descripcio: descripcio.value, dataInici: dataInici.value, 
                    dataFinal: dataFinal.value, nom: nom.value, tria: tria.value});
                    window.localStorage.setItem('tasca', JSON.stringify(tasquesAnteriors));
                }   
                else {
                    let dades = {codi: codi.value, descripcio: descripcio.value, dataInici: dataInici.value, 
                    dataFinal: dataFinal.value, nom: nom.value, tria: tria.value};
                    window.localStorage.setItem('tasca', JSON.stringify([dades]));
                }
                mostrarDades();
            }
            else {
                alert("El nombre del codi introduit es menor o igual a 0");
            }
        }
        else {
            alert("S'ha repetit el codi de la tasca");
        }
    }
    else
    {
        alert("Falten dades per inserir");
    }

});

//Funcio per mirar si les tasques estan repetides
function comprovarTasquesRep() {
    let tascaAnterior = JSON.parse(window.localStorage.getItem('tasca'));
    if(tascaAnterior != undefined) {
        let nomTasca = tascaAnterior.find(element => element.codi == codi.value);
        if(nomTasca == null) {
            return false;
        }
        else {
            return true;
        }
    }
    else {
        return false;
    }
}

//Funcio per mirar si el codi de tasques es negatiu
function negatiuCodi() {
    if(codi.value <= 0) {
        return false;
    }
    else {
        return true;
    }
}

// Funcio mostrar dades a la taula
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
                ${tascaAnterior[i].codi + ' ' + tascaAnterior[i].descripcio + ' ' + tascaAnterior[i].dataInici + ' ' + tascaAnterior[i].dataFinal + ' ' + tascaAnterior[i].nom + '<button class="btn-delete" id = "delete-button" onclick="eliminar_tasques(' + i})">Delete</button></p>`
            }
            else if(tascaAnterior[i].tria == 'poc urgent')
            {
                div1.innerHTML += `<p id="${'drag' + tascaAnterior[i].codi}" draggable="true" ondragstart="drag(event)" class="poc">
                ${tascaAnterior[i].codi + ' ' + tascaAnterior[i].descripcio + ' ' + tascaAnterior[i].dataInici + ' ' + tascaAnterior[i].dataFinal + ' ' + tascaAnterior[i].nom + '<button class="btn-delete" id = "delete-button" onclick="eliminar_tasques(' + i})">Delete</button></p>`
            }
            else if(tascaAnterior[i].tria == 'molt urgent')
            {
                div1.innerHTML += `<p id="${'drag' + tascaAnterior[i].codi}" draggable="true" ondragstart="drag(event)" class="molt">
                ${tascaAnterior[i].codi + ' ' + tascaAnterior[i].descripcio + ' ' + tascaAnterior[i].dataInici + ' ' + tascaAnterior[i].dataFinal + ' ' + tascaAnterior[i].nom + '<button class="btn-delete" id = "delete-button" onclick="eliminar_tasques(' + i})">Delete</button></p>`
            }
        }
    }


}

// Funcio per fer el drag and drop a la taula
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

function eliminar_tasques(id) {
    let tasques = JSON.parse(window.localStorage.getItem('tasca'));
    
    tasques.splice(id,1);

    window.localStorage.setItem('tasca', JSON.stringify(tasques));

    mostrarDades();
}