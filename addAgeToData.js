//height weight eyeColor occupation gender age
//for Age set current year and subtract from their year,better if current date.
//Take current year and evaluate vs DoB. make static age in years.
function convertAge(object){//DATE STORES MONTHS FROM 0-11 DOB SAVED M/DAY/YEAR
    let d = new Date();
    let birthdayPassed = hasDayPassed(d,object);
    if(birthdayPassed)
        return d.getFullYear()-object.year;
    else
        return d.getFullYear()-(object.year+1);
}

function hasDayPassed(date,object){
    if(date.getMonth() < object.month){
        return false;
    }
    else{
        if(date.getMonth() === object.month){
            if(date.getDay() < object.day)
                return false;
            else
                return true;
        }
        return true;
    }
}
function convertDOBToObject(string){
    let array = convertStringToNumbers(string);
    array = array.map(function(value){
        return Number(value);
    });
    console.log(array);
    return assignObject(array);

}
function assignObject(array){
    let object ={};
    for(let i = 0; i < array.length; i++){
        switch(i){
            case 0:
                object.month = array[i]-1;
                break;
            case 1:
                object.day = array[i];
                break;
            case 2:
                object.year = array[i];
                break;
            default:
                console.error();
        }
    }
    return object;
}
function convertStringToNumbers(string){
    let lastParse = 0;
    let array = [];
    for(let i = 0; i < string.length; i++){
        if(string[i] === '/' ){
            array.push(string.slice(lastParse,i));
            lastParse = i+1;
        }
        if(i+1 === string.length){
            array.push(string.slice(lastParse));
            lastParse = i+1;
        }
    }
    return array;
}
function routine(){
    let arr = [];
    for(let i = 0; i < people.length; i++){
        arr[i] = convertDOBToObject(people[i].dob);
        console.log(arr[i]);
        people[i].age = convertAge(arr[i]);
        console.log(people[i].age);
    }
}