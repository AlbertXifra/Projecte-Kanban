// Porjcte SCRUM ALBEX

//Declarar les variables
let sel = document.getElementById('sel');
let tasca = document.getElementsByClassName('tasca')[0];
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
    console.log(window.localStorage.getItem('tasca'));
    if(tasquesAnteriors != undefined) {
        tasquesAnteriors.push({codi: codi.value, descripcio: descripcio.value, dataInici: dataInici.value, 
            dataFinal: dataFinal.value, nom: nom.value});
            window.localStorage.setItem('tasca', JSON.stringify(tasquesAnteriors));
    } else {
        let dades = {codi: codi.value, descripcio: descripcio.value, dataInici: dataInici.value, 
            dataFinal: dataFinal.value, nom: nom.value};
        window.localStorage.setItem('tasca', JSON.stringify([dades]));
    }
    //mostrarDades();
});


// Funcio mostrar dades
function mostrarDades() {
    tasca.innerText='';
    let tascaAnterior = JSON.parse(window.localStorage.getItem('tasca'));
    var count = 0;
    if(tascaAnterior != undefined)
    {
        tascaAnterior.forEach((Object) =>JSON.stringify(Object))
        {
            let opt = document.createElement('option');
            opt.value = codi.value;
            opt.text = codi.value + ' ' + descripcio.value + ' ' + dataInici.value + ' ' + dataFinal.value + ' ' + nom.value;
            sel.appendChild(opt);
            count++;
        }
    }
   
    tasca.innerText = count.toString();
}