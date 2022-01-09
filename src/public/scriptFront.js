let divS = document.getElementById("listS");
let divA = document.getElementById("listA");


let FormS = document.getElementById("formS");
let FormA = document.getElementById("formA");
let AtoS = document.getElementById("AtoS");
let SofA = document.getElementById("SofA");
let SofAResult = document.getElementById("SofAResult");

let AofS = document.getElementById("AofS");
let AofSResult = document.getElementById("AofSResult");

window.onload = init;


function initSportForm(){

    let boutonAddSport = document.createElement("button");
    boutonAddSport.id = "btnS";
    boutonAddSport.name = "btnS";
    boutonAddSport.textContent = "Ajouter le sport";
    boutonAddSport.className = "btn btn-primary";
    boutonAddSport.addEventListener("click",ajouterSport);

    let nameField = document.createElement("input");
    nameField.placeholder = "Nom du sport";
    nameField.className = "form-control";
    nameField.name = "nameField";
    nameField.id = "nameField";

    let labelNameField = document.createElement("label");
    labelNameField.htmlFor = "nameField";
    labelNameField.textContent = "Nom : ";

    FormS.appendChild(labelNameField);
    FormS.appendChild(nameField);
    FormS.appendChild(document.createElement("br"));
    FormS.appendChild(boutonAddSport);


}

function initAthleteForm(){

    let boutonAddAthlete = document.createElement("button");
    boutonAddAthlete.id = "btnA";
    boutonAddAthlete.name = "btnA";
    boutonAddAthlete.textContent = "Ajouter un athlete";
    boutonAddAthlete.className = "btn btn-primary";
    boutonAddAthlete.addEventListener("click",ajouterAthlete);

    let countryField = document.createElement("input");
    countryField.placeholder = "Entrer votre nationalité";
    countryField.className = "form-control";
    countryField.name = "countryField";
    countryField.id = "countryField";

    let labelCountryField = document.createElement("label");
    labelCountryField.htmlFor = "countryField";
    labelCountryField.textContent = "Nationalité";

    let firstNameField = document.createElement("input");
    firstNameField.placeholder = "Entrer votre prénom";
    firstNameField.className = "form-control";
    firstNameField.name = "firstNameField";
    firstNameField.id = "firstNameField";
    let labelFirstNameField = document.createElement("label");
    labelFirstNameField.htmlFor = "firstNameField";
    labelFirstNameField.textContent = "Prénom";

    let lastNameField = document.createElement("input");
    lastNameField.placeholder = "Entrer votre nom";
    lastNameField.className = "form-control";
    lastNameField.name = "lastNameField";
    lastNameField.id = "lastNameField";
    let labelLastNameField = document.createElement("label");
    labelLastNameField.htmlFor = "lastNameField";
    labelLastNameField.textContent = "Nom";

    //init champ genre
    let genderField = document.createElement("select");
    genderField.name = "genderField";
    genderField.id = "genderField";
    genderField.className = "form-select";
    let labelGenderField = document.createElement("label");
    labelGenderField.htmlFor = "genderField";
    labelGenderField.textContent = "Genre";
    let optionM = document.createElement("option");
    optionM.value = "M";
    optionM.textContent = "Homme";
    let optionF = document.createElement("option");
    optionF.value = "F";
    optionF.textContent = "Femme";

    genderField.add(optionM);
    genderField.add(optionF);

    FormA.appendChild(labelCountryField);
    FormA.appendChild(countryField);
    FormA.appendChild(labelLastNameField)
    FormA.appendChild(lastNameField);
    FormA.appendChild(labelFirstNameField)
    FormA.appendChild(firstNameField);
    FormA.appendChild(labelGenderField);
    FormA.appendChild(genderField);
    FormA.appendChild(document.createElement("br"));
    FormA.appendChild(boutonAddAthlete);

}

async function init(){
    // console.log("initialisation de la page");
    initSportForm();
    initAthleteForm();
    initAthleteToSport();
    initListSportOfAthletes();
    initListAthleteOfSport();

}


async function listerSports(){
    let listeSports = document.createElement("ul");
    const response = await fetch('http://localhost:3001/api/sports');
    const data = await response.json();
    // console.log(data);
    for (let elt of data.sports){
        let point = document.createElement("li");
        point.textContent = elt.name;
        listeSports.appendChild(point);
        // console.log(elt.name);
    }
    divS.replaceWith(listeSports);

}

async function listerAthletes(){
    let listeAthletes = document.createElement("ul");
    const response = await fetch('http://localhost:3001/api/athletes');
    const data = await response.json();
    // console.log(data);
    for (let elt of data.athletes){
        let point = document.createElement("li");
        point.textContent = elt.firstName + " " + elt.lastName;
        listeAthletes.appendChild(point);
        // console.log(elt.name);
    }
    divA.replaceWith(listeAthletes);
}


async function ajouterSport(){
    let nameField = document.getElementById("nameField");
    let nameValue = nameField.value;
    if(nameValue != "") {
        nameField.style.backgroundColor = "green";
        let obj = new Object();
        obj.name = nameValue;
        let jsonString = JSON.stringify(obj);
        // console.log(obj);
        const response = await fetch('http://localhost:3001/api/sports', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: jsonString
        });
        const data = await response.json()
        let confirmation = document.createElement("p");
        confirmation.textContent = "Sport ajouté";
        confirmation.color = "green";
        FormS.appendChild(confirmation);
    }
    else{
        nameField.style.backgroundColor = "red";
    }
}

async function ajouterAthlete(){
    let countryfield = document.getElementById("countryField");
    let lastNamefield = document.getElementById("lastNameField");
    let firstNamefield = document.getElementById("firstNameField");
    let genderfield = document.getElementById("genderField");

    let countryValue = countryfield.value;
    let lastNameValue = lastNamefield.value;
    let firstNameValue = firstNamefield.value;
    let genderValue =genderfield.value;

    let popup = document.getElementById("popup");

    if(countryValue != "" && lastNameValue != "" && firstNameValue != "" && genderValue != ""){

        popup.remove();
        countryfield.style.backgroundColor = "green";
        lastNamefield.style.backgroundColor = "green";
        firstNamefield.style.backgroundColor = "green";
        genderfield.style.backgroundColor = "green";

        let obj = new Object();
        obj.firstName = firstNameValue;
        obj.lastName = lastNameValue;
        obj.gender = genderValue;
        obj.country = countryValue;

        let jsonString = JSON.stringify(obj);

        // console.log(obj);
        const response = await fetch('http://localhost:3001/api/athletes', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: jsonString
        });
        const data = await response.json();
        let confirmation = document.createElement("p");
        confirmation.textContent = "Athlete ajouté";
        confirmation.color = "green";
        FormA.appendChild(confirmation);
    }
    else{

        popup.textContent = "Tous les champs sont obligatoires";
        popup.style.color = "red";
        popup.replaceWith(popup);
    }
}
async function initAthleteToSport(){

    //Recuperation des sports
    let listeSports = document.createElement("ul");
    const responseS = await fetch('http://localhost:3001/api/sports');
    const dataS = await responseS.json();
    // console.log(dataS);

    //Recuperation des athletes
    let listeAthletes = document.createElement("ul");
    const responseA = await fetch('http://localhost:3001/api/athletes');
    const dataA = await responseA.json();
    // console.log(dataA);

    //Creation liste sports
    let sportsList = document.createElement("select");
    sportsList.name = "sportsList";
    sportsList.id = "sportsList";
    let labelSportsList = document.createElement("label");
    labelSportsList.htmlFor = "sportsList";
    labelSportsList.textContent = "Liste des sports";
    sportsList.className = "form-select";

    //Creation liste des athletes
    let athletesList = document.createElement("select");
    athletesList.name = "athletesList";
    athletesList.id = "athletesList";

    //Creation liste sports
    for (let elt of dataS.sports){
        // console.log(elt.name);
        let option = document.createElement("option");
        option.value = elt._id;
        option.textContent = elt.name;
        sportsList.add(option);
    }
    //Creation liste athletes
    for (let elt of dataA.athletes){
        // console.log(elt.lastName + " " + elt.firstName+ " " + elt._id);
        let option = document.createElement("option");
        option.value = elt._id;
        option.textContent = elt.lastName + " " + elt.firstName;
        athletesList.add(option);
    }

    let boutonAddSportToAthlete =  document.createElement("button");
    boutonAddSportToAthlete.id = "btnAtoS";
    boutonAddSportToAthlete.name = "btnAtoS";
    boutonAddSportToAthlete.textContent = "Ajouter l'athlete au sport";
    boutonAddSportToAthlete.className = "btn btn-primary";
    boutonAddSportToAthlete.addEventListener("click",ajouterAthleteToSport);

    AtoS.appendChild(athletesList);
    AtoS.appendChild(sportsList);
    AtoS.appendChild(document.createElement("br"));
    AtoS.appendChild(document.createElement("br"));
    AtoS.appendChild(boutonAddSportToAthlete);
}

async function ajouterAthleteToSport(){
    let athlete = document.getElementById("athletesList");
    let sport = document.getElementById("sportsList");
    let idAthlete = athlete.value;
    let idSport = sport.value;
    const response = await fetch('http://localhost:3001/api/sports/'+ idSport + '/athletes/'+ idAthlete , {
        method: "PUT"
    });
    const data = await response.json();
    if ( data != 'Athlète existant au sport')
    {
        let confirmation = document.createElement("p");
        confirmation.textContent = "Athlete ajouté au sport";
        confirmation.color = "green";
        AtoS.appendChild(confirmation);   
    }
    else 
    {
        let confirmation = document.createElement("p");
        confirmation.textContent = "Athlète déjà inclus dans ce sport";
        confirmation.color = "green";
        AtoS.appendChild(confirmation);
    }

}

async function initListSportOfAthletes(){

    //Recuperation des athletes
    const responseA = await fetch('http://localhost:3001/api/athletes');
    const dataA = await responseA.json();
    // console.log(dataA);

    let boutonListSportofAthlete =  document.createElement("button");
    boutonListSportofAthlete.id = "btnSofA";
    boutonListSportofAthlete.name = "btnSofA";
    boutonListSportofAthlete.textContent = "Lister les sport de cet athlete";
    boutonListSportofAthlete.className = "btn btn-primary";
    boutonListSportofAthlete.addEventListener("click",listerSportsAthlete);

    //Creation liste des athletes
    let athletesListe = document.createElement("select");
    athletesListe.name = "athletesListe";
    athletesListe.id = "athletesListe";
    let labelAthletesListe = document.createElement("label");
    labelAthletesListe.htmlFor = "athletesListe";
    labelAthletesListe.textContent = "Liste des athletes";
    labelAthletesListe.className = "form-select";

    //Creation liste athletes
    for (let elt of dataA.athletes){
        let option = document.createElement("option");
        option.value = elt._id;
        console.log(option.value);
        option.textContent = elt.lastName + " " + elt.firstName;
        athletesListe.add(option);
    }
    SofA.appendChild(athletesListe);
    SofA.appendChild(document.createElement("br"));
    SofA.appendChild(document.createElement("br"));
    SofA.appendChild(boutonListSportofAthlete);
    console.log("fin initListAthleteSport");
}

async function listerSportsAthlete() {
    let athlete = document.getElementById('athletesListe');
    let listeSports = document.createElement("ul");
    let idAthlete = athlete.value;
    console.log(idAthlete);
    const response = await fetch('http://localhost:3001/api/athletes/'+idAthlete+'/sports');
    const data = await response.json();
    // console.log(data.sportList);
     for (let elt of data.sportList){
         console.log(elt);
         let point = document.createElement("li");
         point.textContent = elt;
         listeSports.appendChild(point);
    }
    SofAResult.replaceWith(listeSports);

}

async function initListAthleteOfSport(){

    //Recuperation des athletes
    const responseA = await fetch('http://localhost:3001/api/sports');
    const dataA = await responseA.json();
    // console.log(dataA);

    let boutonListAthleteofSport =  document.createElement("button");
    boutonListAthleteofSport.id = "btnAofS";
    boutonListAthleteofSport.name = "btnAofS";
    boutonListAthleteofSport.textContent = "Lister les athlètes de ce sport";
    boutonListAthleteofSport.className = "btn btn-primary";
    boutonListAthleteofSport.addEventListener("click",listerAthleteSport);

    //Creation liste des athletes
    let sportsListe = document.createElement("select");
    sportsListe.name = "sportsListe";
    sportsListe.id = "sportsListe";
    let labelSportsListe = document.createElement("label");
    labelSportsListe.htmlFor = "sportsListe";
    labelSportsListe.textContent = "Liste des sports";
    labelSportsListe.className = "form-select";

    //Creation liste athletes
    for (let elt of dataA.sports){
        let option = document.createElement("option");
        option.value = elt._id;
        console.log(option.value);
        option.textContent = elt.name;
        sportsListe.add(option);
    }
    AofS.appendChild(sportsListe);
    AofS.appendChild(document.createElement("br"));
    AofS.appendChild(document.createElement("br"));
    AofS.appendChild(boutonListAthleteofSport);
    console.log("boutonListAthleteofSport");
}

async function listerAthleteSport() {
    let sport = document.getElementById('sportsListe');
    let listeAthletes = document.createElement("ul");
    let idSport = sport.value;
    console.log(idSport);
    const response = await fetch('http://localhost:3001/api/sports/'+idSport+'/athletes');
    const data = await response.json();
    console.log(data.athleteslist);
    data.athleteslist.forEach(elt => {
        console.log(elt);
        let point = document.createElement("li");
        point.textContent = elt;
        listeAthletes.appendChild(point);
    });
    AofSResult.replaceWith(listeAthletes);

}
