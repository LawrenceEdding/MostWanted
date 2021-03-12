'use strict';

function searchByName(){
    // Grabbing the values from our nameForm form and inputs.
    let criteria = {};
    criteria.firstName = document.forms['nameForm']['fname'].value;
    criteria.lastName = document.forms['nameForm']['lname'].value;
    criteria.id = document.forms['nameForm']['id'].value;
    criteria.gender = document.forms['nameForm']['gender'].value;
    criteria.dob = document.forms['nameForm']['dob'].value;
    criteria.height = document.forms['nameForm']['height'].value;
    criteria.weight = document.forms['nameForm']['weight'].value;
    criteria.eyeColor = document.forms['nameForm']['eyeColor'].value;
    criteria.occupation = document.forms['nameForm']['occupation'].value;
    criteria.currentSpouse = document.forms['nameForm']['spouse'].value;

    console.log(criteria);
    
    // "people" is coming from the data.js file. We have access to it within this JavaScript file.
    let filteredPeople = people.filter(function (person) {
        for(var key in criteria){
            if (criteria[key] != "" && person[key] != criteria[key])
                return false
        }
        return true;
    });
    
    // Rather than console logging, you need to append the filteredPeople to a table.
    if(filteredPeople.length > 0){
        console.log(filteredPeople);
        AppendToTable(filteredPeople);
    }else{
        console.log("There's no one with that criteria");
        alert("Insert valid input");
    }
}
function saveObjectToArray(object){

}

function AppendToTable(filteredPeople){
    let tableReference = document.getElementsByName("DataTable")[0];
    for(let i = tableReference.rows.length; i > 0;i--)
    {if( i>1){
        tableReference.deleteRow(i-1);
    }
    
    }
    for (let i=0; i < filteredPeople.length; i++){//Can make a nested for loop.
        let row = tableReference.insertRow(i+1);
        let people = filteredPeople[i];

        for(let p = 0; p < Object.keys(people).length; p++){
            row.insertCell(p).innerHTML = people[Object.keys(people)[p]];
        }
    }
    
    console.log();
}

function findDescendants(person){
    let descendats = people.filter(function (p) {
        if ( p.parents.includes(person.id))
            return true;
        return false;
    })
return descendats;
}

function getPersonName(personId){
    let person = people.filter(function (p) {
        if (personId == p.id){
            return true;

        }else {
            return false;
        }
    })
    return person[0].firstName+" "+person[0].lastName
}
  
function showDescendants(person){//Takes Object
    let id = person.id;
    let descendantArray = people.filter(function (value){
        if(value.parents.includes(id)){
            showDescendants(value);
            return true;
        }
        else 
            return false;
    });
    console.log(descendantArray);
}

