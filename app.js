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


function AppendToTable(filteredPeople){
    let tableReference = document.getElementsByName("DataTable")[0];
    for(let i = tableReference.rows.length; i > 0;i--)
    {if( i>1){
        tableReference.deleteRow(i-1);
    }
    
    }
    for (let i=0; i < filteredPeople.length; i++){//Can make a nested for loop.
        let row = tableReference.insertRow(i+1)
        let people = filteredPeople[i];
        console.log(findDescendants(people));
        let cellfirstName = row.insertCell(0);
        cellfirstName.innerHTML = people.firstName;
        let celllastName = row.insertCell(1);
        celllastName.innerHTML = people.lastName;
        let cellId = row.insertCell(2);
        cellId.innerHTML = people.id;
        let cellgender = row.insertCell(3);
        cellgender.innerHTML = people.gender;
        let celldob = row.insertCell(4);
        celldob.innerHTML = people.dob;
        let cellheight = row.insertCell(5);
        cellheight.innerHTML = people.height;
        let cellweight = row.insertCell(6);
        cellweight.innerHTML = people.weight;
        let celleyeColor = row.insertCell(7);
        celleyeColor.innerHTML = people.eyeColor;
        let celloccupation = row.insertCell(8);
        celloccupation.innerHTML = people.occupation;
        let cellcurrentSpouse = row.insertCell(9);
        cellcurrentSpouse.innerHTML = people.currentSpouse ? getPersonName(people.currentSpouse) :"";
        ;
        let cellparents = row.insertCell(10);
        cellparents.innerHTML = people.parents;
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

