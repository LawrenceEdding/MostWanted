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
    criteria.currentSpouse = document.forms['nameForm']['spouse'].value;//possibly briefer way to do this.

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
function clearTable(table){
    for(let i = table.rows.length; i > 0;i--){
        if( i > 1)
            table.deleteRow(i-1);
    }
}

function AppendToTable(filteredPeople){
    let tableReference = document.getElementsByName("DataTable")[0];
    clearTable(tableReference);
    let row;
    let people;
    let obj;
    for (let i=0; i < filteredPeople.length; i++){//Can make a nested for loop.
        row = tableReference.insertRow(i+1);
        people = filteredPeople[i];
        for(let p = 0; p < Object.keys(people).length; p++){//MAKE SWITCH CASE
            obj = Object.keys(people)[p];
            if(obj === 'id'){
                row.insertCell(p).innerHTML = people[obj];
                row.id = people[obj];
                row.addEventListener('click',function (){//FIXME Make append value to event listener
                    //Erase all rows except the one clicked
                    let savedRow = [findPersonbyID(this.id)];
                    AppendToTable(savedRow);
                    relationTable(this.id);
                 });
                continue;
            }
            if(obj === 'parents'){
                row.insertCell(p).innerHTML = displayParents(people[obj]);
                continue;
            }
            if(obj === 'currentSpouse'){
                row.insertCell(p).innerHTML = getPersonName(people[obj]);
                continue;
            }
            row.insertCell(p).innerHTML = people[obj];
        }
    }
}

function getPersonName(personId){
    if(personId !== null){
    let person = people.filter(function (p) {
        if (personId == p.id){
            return true;
        }else {
            return false;
        }
    });
    return person[0].firstName+" "+person[0].lastName;
    }
    else
        return '';
}
  
function showDescendants(person, array = [], arrayIndex = 0){//Takes Object 
    let id = person.id;
    if(typeof array[arrayIndex] === 'undefined')
        array[arrayIndex] = [];
    people.filter(function (value){
        if(value.parents.includes(id)){
            array[arrayIndex].push(value);
            showDescendants(value,array,arrayIndex+1);
            return true;
        }
        else 
            return false;
    });
    return array;
}//array[kids,grandkids,ggkids,...] 
function findPersonbyID(personId){
    let person;
    people.filter(function (value){
        if(value.id == personId){//COMPARES STRING AND NUMBER
            person = value;
            return true;
        }
    });
    console.log(person);
    return person;
}



function displayParents(array){
    let stringArray = [];
    if(array.length > 0){
    let parent = people.filter(function (p) {
        for(let i = 0; i < array.length; i++){
            if (array[i] == p.id)
                return true;
        }
    });

    for(let i = 0; i < parent.length; i++){
        stringArray.push(` ${parent[i].firstName} ${parent[i].lastName}`);
    }
    return stringArray;
    }
    else
        return '';
}

function sameParent(person){//NOT TESTED Probably prints self into sibling array. FIXME
    if(person.parents.length > 0){
        let siblings = people.filter(function (p) {
            for(let i = 0; i < person.parents.length; i++){
                if (person.parents[i] == p.parents[i] && person !== p)
                    return true;
            }
        });
        return siblings;
    }
}

function relationTable(id){
    let person = findPersonbyID(id);
    let spouse = findPersonbyID(person.currentSpouse);
    let parent =[];
    let kids = [];
    let grandkids = [];
    let siblings;
    let grandparent = [];
    let descendantArray = [[]];


    if(person.parents.length > 0){
        let parentId = person.parents;
        for (let i = 0; i < parentId.length; i++)
            parent.push(findPersonbyID(parentId[i]));
    }


    // if(parent.length > 0){
    //     if(parent.parents.length > 0){
    //         let parentId = parent.parents;
    //         for (let i = 0; i < parentId.length; i++)
    //             grandparent.push(findPersonbyID(parentId[i]));
    //     }
    // }
    descendantArray = showDescendants(person);
    for(let i = 0; i < descendantArray.length; i++){
        for(let p = 0; p < descendantArray[i].length; p++){
            switch(i){
                case 0:
                    kids[p] = descendantArray[i][p];
                    break;
                case 1:
                    grandkids[p] = descendantArray[i][p];
                    break;
                default:
                    console.log(error);
            }
        }
    }
    siblings = sameParent(person);
    let tableReference = document.getElementsByName("familyTable")[0];
    clearTable(tableReference);
    appendToFamilyTableObject(spouse, 'Spouse',tableReference);
    appendToFamilyTableArray(parent, 'Parent',tableReference);
    appendToFamilyTableArray(siblings,'Sibling',tableReference);
    appendToFamilyTableArray(kids,'Child',tableReference);
    appendToFamilyTableArray(grandkids,'Grandchild',tableReference);
    //Spouse, Parents ,Grandparents, siblings, kids, grandkids TODO GRANDPARENTS
}
function appendToFamilyTableArray(array, relation, table){
    if(typeof array === 'object'){
        let row;
        let people;
        let obj;
        console.log(array);
        for (let i=0; i < array.length; i++){//Can make a nested for loop.
            row = table.insertRow(i+1);
            people = array[i];
            for(let p = 0; p < 5; p++){
                if(p === 4){
                    row.insertCell(p).innerHTML = relation;
                    continue;
                }
                obj = Object.keys(people)[p];
                row.insertCell(p).innerHTML = people[obj];
            }
        }
    }
}
function appendToFamilyTableObject(person, relation, table){
    if(typeof person === 'object'){
        let row;
        let obj;
        row = table.insertRow(-1);
        for(let i = 0; i < 5; i++){
            if(i === 4){//5th cell is relation
                row.insertCell(i).innerHTML = relation;
                continue;
            }
            obj = Object.keys(person)[i];
            row.insertCell(i).innerHTML = person[obj];
        }
    }
}