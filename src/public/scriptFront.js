let divS = document.getElementById("listS");
let divA = document.getElementById("listA");

let FormS = document.getElementById("formS");
let FormA = document.getElementById("formA");
let AtoS = document.getElementById("AtoS");
let SofA = document.getElementById("SofA");

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
    FormA.appendChild(boutonAddAthlete);

}

async function init(){
    console.log("initialisation de la page");
    initSportForm();
    initAthleteForm();
    initAthleteToSport();

}


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
    divS.replaceWith(listeSports);

}

async function listerAthletes(){
    let listeAthletes = document.createElement("ul");
    const response = await fetch('http://localhost:3001/api/athletes');
    const data = await response.json();
    console.log(data);
    for (let elt of data.athletes){
        let point = document.createElement("li");
        point.textContent = elt.firstName + " " + elt.lastName;
        listeAthletes.appendChild(point);
        console.log(elt.name);
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
        console.log(obj);
        const response = await fetch('http://localhost:3001/api/sports', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: jsonString
        });
        const data = await response.json();
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
    let genderValue =genderfield. value;

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

        console.log(obj);
        const response = await fetch('http://localhost:3001/api/athletes', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: jsonString
        });
        const data = await response.json();
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
    console.log(dataS);

    //Recuperation des athletes
    let listeAthletes = document.createElement("ul");
    const responseA = await fetch('http://localhost:3001/api/athletes');
    const dataA = await responseA.json();
    console.log(dataA);

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
    let labelAthletesList = document.createElement("label");
    labelAthletesList.htmlFor = "athletesList";
    labelAthletesList.textContent = "Liste des athletes";
    athletesList.className = "form-select";

    //Creation liste sports
    for (let elt of dataS.sports){
        console.log(elt.name);
        let option = document.createElement("option");
        option.value = elt.name;
        option.textContent = elt.name;
        sportsList.add(option);
    }
    //Creation liste athletes
    for (let elt of dataA.athletes){
        console.log(elt.lastName + " " + elt.firstName+ " " + elt._id);
        let option = document.createElement("option");
        option.value = elt._id;
        option.textContent = elt.lastName + " " + elt.firstName;
        athletesList.add(option);

    }
    AtoS.appendChild(sportsList);
    SofA.appendChild(athletesList);



}

