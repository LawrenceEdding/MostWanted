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