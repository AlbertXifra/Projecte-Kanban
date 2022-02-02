//Declarar les variables
let codi = document.getElementById('codi');
let descripcio = document.getElementById('descripcio');
let dataInici = document.getElementById('dataInici');
let dataFinal = document.getElementById('dataFinal');
let nom = document.getElementById('nom');
let estat = document.getElementById('estat');
let tria = document.getElementById('tria');
let btn = document.getElementById('btn-Crear');
let div1 = document.getElementById('div1');
let div2 = document.getElementById('div2');
let div3 = document.getElementById('div3');

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
                    dataFinal: dataFinal.value, nom: nom.value, tria: tria.value, estat: estat.value});
                    window.localStorage.setItem('tasca', JSON.stringify(tasquesAnteriors));
                }   
                else {
                    let dades = {codi: codi.value, descripcio: descripcio.value, dataInici: dataInici.value, 
                    dataFinal: dataFinal.value, nom: nom.value, tria: tria.value, estat: estat.value};
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
    btn.innerText = "Crear";
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
    div2.innerText = '';
    div3.innerText = '';
    let tascaAnterior = JSON.parse(window.localStorage.getItem('tasca'));
    if(tascaAnterior != undefined)
    {
        for(let i = 0; i < tascaAnterior.length; i++)
        {
            if(tascaAnterior[i].estat == 'todo')
            {
                if(tascaAnterior[i].tria == 'urgent')
                {
                    div1.innerHTML += `<p id="${i}" draggable="true" ondragstart="drag(event)" class="urgent" ondblclick="editar(${i})">
                    ${tascaAnterior[i].codi + ' ' + tascaAnterior[i].descripcio + ' ' + tascaAnterior[i].dataInici + ' ' + tascaAnterior[i].dataFinal + ' ' + tascaAnterior[i].nom + '<button class="btn-delete" id = "delete-button" onclick="eliminar_tasques(' + i})">Delete</button></p>`
                }
                else if(tascaAnterior[i].tria == 'poc urgent')
                {
                    div1.innerHTML += `<p id="${i}" draggable="true" ondragstart="drag(event)" class="poc" ondblclick="editar(${i})">
                    ${tascaAnterior[i].codi + ' ' + tascaAnterior[i].descripcio + ' ' + tascaAnterior[i].dataInici + ' ' + tascaAnterior[i].dataFinal + ' ' + tascaAnterior[i].nom + '<button class="btn-delete" id = "delete-button" onclick="eliminar_tasques(' + i})">Delete</button></p>`
                }
                else if(tascaAnterior[i].tria == 'molt urgent')
                {
                    div1.innerHTML += `<p id="${i}" draggable="true" ondragstart="drag(event)" class="molt" ondblclick="editar(${i})">
                    ${tascaAnterior[i].codi + ' ' + tascaAnterior[i].descripcio + ' ' + tascaAnterior[i].dataInici + ' ' + tascaAnterior[i].dataFinal + ' ' + tascaAnterior[i].nom + '<button class="btn-delete" id = "delete-button" onclick="eliminar_tasques(' + i})">Delete</button></p>`
                }
            }
            else if(tascaAnterior[i].estat == 'doing')
            {
                if(tascaAnterior[i].tria == 'urgent')
                {
                    div2.innerHTML += `<p id="${i}" draggable="true" ondragstart="drag(event)" class="urgent" ondblclick="editar(${i})">
                    ${tascaAnterior[i].codi + ' ' + tascaAnterior[i].descripcio + ' ' + tascaAnterior[i].dataInici + ' ' + tascaAnterior[i].dataFinal + ' ' + tascaAnterior[i].nom + '<button class="btn-delete" id = "delete-button" onclick="eliminar_tasques(' + i})">Delete</button></p>`
                }
                else if(tascaAnterior[i].tria == 'poc urgent')
                {
                    div2.innerHTML += `<p id="${i}" draggable="true" ondragstart="drag(event)" class="poc" ondblclick="editar(${i})">
                    ${tascaAnterior[i].codi + ' ' + tascaAnterior[i].descripcio + ' ' + tascaAnterior[i].dataInici + ' ' + tascaAnterior[i].dataFinal + ' ' + tascaAnterior[i].nom + '<button class="btn-delete" id = "delete-button" onclick="eliminar_tasques(' + i})">Delete</button></p>`
                }
                else if(tascaAnterior[i].tria == 'molt urgent')
                {
                    div2.innerHTML += `<p id="${i}" draggable="true" ondragstart="drag(event)" class="molt" ondblclick="editar(${i})">
                    ${tascaAnterior[i].codi + ' ' + tascaAnterior[i].descripcio + ' ' + tascaAnterior[i].dataInici + ' ' + tascaAnterior[i].dataFinal + ' ' + tascaAnterior[i].nom + '<button class="btn-delete" id = "delete-button" onclick="eliminar_tasques(' + i})">Delete</button></p>`
                }
            }
            else if(tascaAnterior[i].estat == 'done')
            {
                if(tascaAnterior[i].tria == 'urgent')
                {
                    div3.innerHTML += `<p id="${i}" draggable="true" ondragstart="drag(event)" class="urgent" ondblclick="editar(${i})">
                    ${tascaAnterior[i].codi + ' ' + tascaAnterior[i].descripcio + ' ' + tascaAnterior[i].dataInici + ' ' + tascaAnterior[i].dataFinal + ' ' + tascaAnterior[i].nom + '<button class="btn-delete" id = "delete-button" onclick="eliminar_tasques(' + i})">Delete</button></p>`
                }
                else if(tascaAnterior[i].tria == 'poc urgent')
                {
                    div3.innerHTML += `<p id="${i}" draggable="true" ondragstart="drag(event)" class="poc" ondblclick="editar(${i})">
                    ${tascaAnterior[i].codi + ' ' + tascaAnterior[i].descripcio + ' ' + tascaAnterior[i].dataInici + ' ' + tascaAnterior[i].dataFinal + ' ' + tascaAnterior[i].nom + '<button class="btn-delete" id = "delete-button" onclick="eliminar_tasques(' + i})">Delete</button></p>`
                }
                else if(tascaAnterior[i].tria == 'molt urgent')
                {
                    div3.innerHTML += `<p id="${i}" draggable="true" ondragstart="drag(event)" class="molt" ondblclick="editar(${i})">
                    ${tascaAnterior[i].codi + ' ' + tascaAnterior[i].descripcio + ' ' + tascaAnterior[i].dataInici + ' ' + tascaAnterior[i].dataFinal + ' ' + tascaAnterior[i].nom + '<button class="btn-delete" id = "delete-button" onclick="eliminar_tasques(' + i})">Delete</button></p>`
                }
            }
        }
    }


}

// Funcio per fer el drag and drop a la taula
function allowDrop(ev){
    ev.preventDefault();
}
  
function drag(ev){
    ev.dataTransfer.setData("text", ev.target.id);
}
  
function drop(ev)
{
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    console.log(data);
    ev.target.appendChild(document.getElementById(data));
    console.log(ev.target.id);

    let tasques = JSON.parse(window.localStorage.getItem('tasca'));

    if(ev.target.id == "div3")
    {
        tasques[data] = {codi: tasques[data].codi, descripcio: tasques[data].descripcio, dataInici: tasques[data].dataInici, 
        dataFinal: tasques[data].dataFinal, nom: tasques[data].nom, tria: tasques[data].tria, estat: "done"};
    }
    else if(ev.target.id == "div1") {
        tasques[data] = {codi: tasques[data].codi, descripcio: tasques[data].descripcio, dataInici: tasques[data].dataInici, 
        dataFinal: tasques[data].dataFinal, nom: tasques[data].nom, tria: tasques[data].tria, estat: "todo"};
    }
    else if(ev.target.id == "div2") {
        tasques[data] = {codi: tasques[data].codi, descripcio: tasques[data].descripcio, dataInici: tasques[data].dataInici, 
            dataFinal: tasques[data].dataFinal, nom: tasques[data].nom, tria: tasques[data].tria, estat: "doing"};
    }

    window.localStorage.setItem('tasca', JSON.stringify(tasques));
}

function eliminar_tasques(id) {
    let tasques = JSON.parse(window.localStorage.getItem('tasca'));
    
    tasques.splice(id,1);

    window.localStorage.setItem('tasca', JSON.stringify(tasques));

    mostrarDades();
}

function editar(id) {
    console.log("entra al dobleclic");
    console.log(id);

    let tasques = JSON.parse(window.localStorage.getItem('tasca'));
    
    tascaModificar = tasques[id];

    codi.value = tascaModificar.codi;
    descripcio.value = tascaModificar.descripcio;
    dataInici.value = tascaModificar.dataInici;
    dataFinal.value = tascaModificar.dataFinal;
    nom.value = tascaModificar.nom;
    tria.value = tascaModificar.tria;
    estat.value = tascaModificar.estat;

    window.localStorage.setItem('tasca', JSON.stringify(tasques));

    btn.innerText = "Modificar";

    eliminar_tasques(id);
}