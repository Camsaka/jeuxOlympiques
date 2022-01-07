let divS = document.getElementById("listS");
let divA = document.getElementById("listA");

let FormS = document.getElementById("formS");
let FormA = document.getElementById("formA");

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

function init(){
    console.log("initialisation de la page");
    initSportForm();
    initAthleteForm();

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

    if(countryValue != "" && lastNameValue != "" && firstNameValue != "" && genderValue != ""){

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
        if( countryValue == ""){
            countryfield.style.backgroundColor = "red";
        }

        if( lastNameValue == ""){
            lastNamefield.style.backgroundColor = "red";
        }

        if( firstNameValue == ""){
            firstNamefield.style.backgroundColor = "red";
        }

        if( genderValue == ""){
            genderfield.style.backgroundColor = "red";
        }
    }
}