import { Database } from "./db.js";

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

let formulari = {
    codi:"",
    descripcio:"",
    dataInici:"",
    dataFinal:"",
    nom:"",
    estat:"",
    tria:""
}

function capturarFormulari() {
    formulari.codi = codi.value;
    formulari.descripcio = descripcio.value;
    formulari.dataInici = dataInici.value;
    formulari.dataFinal = dataFinal.value;
    formulari.nom = nom.value;
    formulari.estat = estat.value;
    formulari.tria = tria.value;
}

let db = new Database();
let tascaAnterior = [];

recperarDades();

div1.addEventListener("dragover", (event) => {
    allowDrop(event)
});

div2.addEventListener("dragover", (event) => {
    allowDrop(event)
});

div3.addEventListener("dragover", (event) => {
    allowDrop(event)
});

div1.addEventListener("drop", (event) => {
    drop(event)
});

div2.addEventListener("drop", (event) => {
    drop(event)
});

div3.addEventListener("drop", (event) => {
    drop(event)
});

//Boto per entrar dades a ToDo
btn.addEventListener("click", () => {

    capturarFormulari();
    
    // If per mirar sino hi han dades en buit
    if(formulari.codi != "" && formulari.descripcio != "" && formulari.dataInici != "" && formulari.dataFinal != "" &&
    formulari.nom != "" && tria.selectedOptions[0] != "")
    {
        //If per comprovar que el codi no s'hagi repetit
        comprovarTasquesRep().then((resp) => {
            if(!resp) {
                if(!negatiuCodi()) {
                    
                    //Afegir tasca en el firestore
                    db.afegirTasca(formulari.codi, formulari.descripcio, formulari.dataInici, 
                        formulari.dataFinal, formulari.nom, formulari.tria, formulari.estat);
                    recperarDades();
                }
                else {
                    alert("El nombre del codi introduit es menor o igual a 0");
                }
            }
            else {
                alert("S'ha repetit el codi de la tasca");
            } 
        });
    }
    else
    {
        alert("Falten dades per inserir");
    }
    btn.innerText = "Crear";
});

//Funcio per mirar si les tasques estan repetides
async function comprovarTasquesRep() {
    let tascaAnterior = await recperarDades();
    if(tascaAnterior != undefined) {
        let nomTasca = tascaAnterior.find(element => element.codi == formulari.codi);
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
    if(formulari.codi <= 0) {
        return true;
    }
    else {
        return false;
    }
}

function recperarDades() {
    
    db.recuperarTasca().then((tasquess) => {
        tascaAnterior = [];
        tasquess.forEach(doc => {
            tascaAnterior.push(doc.data());
        })
        mostrarDades();
        return Promise.resolve(tasquess);
    });
}

function triarDiv(index)
{
    if(tascaAnterior[index].estat == 'todo')
    {
        return div1;
    }
    else if(tascaAnterior[index].estat == 'doing')
    {
        return div2;
    }
    else if(tascaAnterior[index].estat == 'done')
    {
        return div3;
    }
    else
    {
        alert("No tinc cap div");
    }
}

function triarClasse(index)
{
    if(tascaAnterior[index].tria == 'urgent')
    {
        return 'urgent';
    }
    else if(tascaAnterior[index].tria == 'poc urgent')
    {
        return 'poc';
    }
    else if(tascaAnterior[index].tria == 'molt urgent')
    {
        return 'molt';
    }
    else
    {
        alert("No tinc cap div");
    }
}

// Funcio mostrar dades a la taula
function mostrarDades() {
    div1.innerText = '';
    div2.innerText = '';
    div3.innerText = '';

    let tipusDiv;
    let tipusClasse;
    
    if(tascaAnterior != undefined)
    {
        for(let i = 0; i < tascaAnterior.length; i++)
        {
            tipusDiv = triarDiv(i);
            tipusClasse = triarClasse(i);

            const elementP = document.createElement("p");
            elementP.id = `${i}`;
            elementP.draggable = true;
            elementP.classList.add(`${tipusClasse}`);
                const divElement = document.createElement("div");
                divElement.innerText = `${tascaAnterior[i].codi + ' ' + tascaAnterior[i].descripcio + ' ' + tascaAnterior[i].dataInici + ' ' + tascaAnterior[i].dataFinal + ' ' + tascaAnterior[i].nom}`;
                elementP.appendChild(divElement);
                const buttonElement = document.createElement("button");
                buttonElement.classList.add("btn-delete");
                buttonElement.id = "delete-button";
                buttonElement.addEventListener("click", () => {eliminar_tasques(i);});
                buttonElement.innerText = "Delete";
                elementP.appendChild(buttonElement);
            
            elementP.addEventListener("dragstart", (event) => {
                console.log("abans: ", event);
                drag(event);
            });

            elementP.addEventListener("dbclick", () => {
                editar(i);
            });
            tipusDiv.appendChild(elementP);
        }
    }
}

// p
//   div
//   button

// Funcio per fer el drag and drop a la taula
function allowDrop(ev){
    ev.preventDefault();
}
  
function drag(ev){
    console.log("Drag: ", ev.target.id);
    ev.dataTransfer.setData("text", ev.target.id);
}

function recperarDades2(ev, data) {
    db.recuperarTasca().then((tasquess) => {
        tascaAnterior = [];
        tasquess.forEach(doc => {
            tascaAnterior.push(doc.data());
        })
        // return Promise.resolve(tasquess);
        console.log("Tasques: ",tascaAnterior);
        console.log("data: ", data);

    let estatText;
    switch(ev.target.id) {
        case "div1":
            estatText = "todo";
            break;
        case "div2":
            estatText = "doing";
            break;
        case "div3":
                estatText = "done";
            break;
    }
    
    tascaAnterior[data].estat = estatText;
    /* tascaAnterior[data] = {codi: tascaAnterior[data].codi, descripcio: tascaAnterior[data].descripcio, dataInici: tascaAnterior[data].dataInici, 
        dataFinal: tascaAnterior[data].dataFinal, nom: tascaAnterior[data].nom, tria: tascaAnterior[data].tria, estat: estatText}

        console.log("t: ", tascaAnterior[data]); */
    // window.localStorage.setItem('tasca', JSON.stringify(tasques));
    db.afegirTasca(tascaAnterior[data].codi, tascaAnterior[data].descripcio, tascaAnterior[data].dataInici, tascaAnterior[data].dataFinal, tascaAnterior[data].nom, tascaAnterior[data].tria, tascaAnterior[data].estat).then(() => {
        eliminar_tasques(id);
        mostrarDades();
    });    
    });
}
  
function drop(ev)
{
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    console.log("data: ", data);
    console.log("id lloc: ", ev.target.id);
    ev.target.appendChild(document.getElementById(data));

    // let tasques = JSON.parse(window.localStorage.getItem('tasca'));
    recperarDades2(ev, data);
}

function eliminar_tasques(id) {
    // let tasques = JSON.parse(window.localStorage.getItem('tasca'));

    let tasques = db.eliminarTasca();
    
    // tasques.splice(id,1);

    // window.localStorage.setItem('tasca', JSON.stringify(tasques));
    // db.afegirTasca(codi.value, descripcio.value, dataInici.value, dataFinal.value, nom.value, tria.value, estat.value);

    // db.recuperarTasca();
}

function editar(id) {

    let tasques = recperarDades();
    
    tascaModificar = tasques[id];

    codi.value = tascaModificar.codi;
    descripcio.value = tascaModificar.descripcio;
    dataInici.value = tascaModificar.dataInici;
    dataFinal.value = tascaModificar.dataFinal;
    nom.value = tascaModificar.nom;
    tria.value = tascaModificar.tria;
    estat.value = tascaModificar.estat;

    // window.localStorage.setItem('tasca', JSON.stringify(tasques));

    db.afegirTasca(tascaModificar.codi, tascaModificar.descripcio, tascaModificar.dataInici, 
        tascaAnterior.dataFinal, tascaAnterior.nom, tascaAnterior.tria, tascaAnterior.estat);

    btn.innerText = "Modificar";

    eliminar_tasques(id);
}
