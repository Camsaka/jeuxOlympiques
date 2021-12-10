

let conteneurPrincipal = document.getElementById("conteneur");
let boutonListSports = document.getElementById("listSportsButton");
let boutonListAthletes = document.getElementById("listAthletesButton");



async function listerSports(){
    let listeSports = document.createElement("ul");
    const response = await fetch('http://localhost:3001/api/sports');
    const data = await response.json();
    console.log(data);
    for (let elt of data.sports){
        let point = document.createElement("li");
        point.textContent = elt.name;
        listeSports.appendChild(point);
        console.log(elt.name);
    }
    conteneurPrincipal.appendChild(listeSports);
}


