
function initAlert(people) {
    var result = [];
    alert("Welcome to the Most Wanted Database.\nThere are " + people.length + " persons currently in the database\nPlease press 'OK' to begin");
    var mostWanted = getPeople(people);
    var cleanMostWanted = getNames(mostWanted);
    displayResults(cleanMostWanted);
    var wanted = processPromptRelative(cleanMostWanted, "Please enter a first and last name to find decendants", isContent, isInArray, mostWanted);
    var wantedObject = getObject(wanted, people);
    var relatives = getRelatives(wantedObject, people);
}
// BEGIN FUNCTIONS FOR FINDING MOST WANTED
function getPeople(people) {
    var remainingPeople = people;
    remainingPeople = getFilter("first name", "Please enter a first name", isString, capRequest, "firstName", remainingPeople);
    remainingPeople = getFilter("last name", "Please enter a last name", isString, capRequest, "lastName", remainingPeople);
    remainingPeople = getFilter("gender", "Please enter a gender, 'male' or 'female'", isString, lowerRequest, "gender", remainingPeople);
    remainingPeople = getFilter("eye color", "Please enter and eye color", isString, lowerRequest, "eyeColor", remainingPeople);
    remainingPeople = getFilter("occupation", "Please enter an occupation", isString, lowerRequest, "occupation", remainingPeople);
    remainingPeople = getFilter("height", "Please enter a height in inches", isNumber, parseRequest, "height", remainingPeople);
    remainingPeople = getFilter("weight", "Please enter a weight in pounds", isNumber, parseRequest, "weight", remainingPeople);
    remainingPeople = getFilter("age", "Please enter an age in years", isNumber, processAge, "age", remainingPeople);
    return remainingPeople;
}
function getFilter(firstPrompt, secondPrompt, typeCheck, converter, searchVariable, data)
{
    var answer = initPrompt(firstPrompt, isContent, isValid, data);
    var request = processPrompt(answer, secondPrompt, isContent, typeCheck);
    var requestCleaned = converter(request, isContent);
    var result = searchDatabase(requestCleaned, searchVariable, data);
    //var checkedResult = endCheck(result, request, resultAlert);
    return result;
}
//Shared processing functions
function initPrompt(question, content, valid, data) {
    do {
        var prefer = prompt("You have "+data.length+" people left in your filter.\n\nWould you like to filter by "+question+"? 'yes' or 'no'");}
    while (!content(prefer) || !valid(prefer));
    return prefer;
}
function processPrompt(answer, question, content, valid){
    if (answer == "no") {
        var request = " ";
    }
    //else if (answer == "exit") {
    //    var request = answer;
    //}
    else {
        do {
            var request = prompt(question);}
        while (!content(request) || !valid(request));}
    return request;
}
function processPromptRelative(mostWanted, question, content, valid, data) {
            do {
                var wanted = prompt((indexNames(mostWanted))+ question);
            }
            while (!content(wanted) || !valid(wanted, data));
        
        return wanted;
}
function getObject(person, data) {
    var names = person.split(" ");
        cappedName = names.map(function (name) {
            return name[0].toUpperCase() + name.substring(1).toLowerCase()
        });
        var hasName = [];
        hasName = data.filter(function (person) { if ((person["firstName"] == cappedName[0]) && (person["lastName"] == cappedName[1])) { return true } else { return false } });
        return (hasName)
}
function capRequest(string, content){
    if (content(string)){
        var capString = string[0].toUpperCase() + string.substring(1).toLowerCase();
        return capString;
    }
}
function lowerRequest(string, content) {
    if (content(string)) {
        var lowerString = string.toLowerCase();
        return lowerString;
    }
}
function parseRequest(number, content) {
    if (content(number)) {
        var cleanedNumber = parseInt(number);
        return cleanedNumber;
    }
}
function processAge(age) {
    var year = new Date();
    var birthYear = (parseInt(year.getFullYear())-(parseInt(age)));
    return birthYear;
}
function searchDatabase(searchItem, dbItem, data) {
    var matchList = [];
    matchList = data.filter(function (person) { if (person[dbItem] == searchItem) { return true } else { return false } });
    if (matchList.length == 0) {
        return data;
    }
    else {
        return matchList;
    }
}
function getNames(people) {
    var cleanedWanted = people.map(getFullName);
    return cleanedWanted;
}
function getFullName(person,index) {
    var fullname = [person.firstName,person.lastName].join(" ");
    return fullname;
}

//function endCheck(data, request) {
//    if (data.length > 1 || request == "exit") {
//    }
//    else {
//        return data;
//    }
//}
//Simple machines
function isString(x) {
    return (typeof x === "string");
}
function isContent(x) {
    return (x.trim() != null || x.length > 0);
}
function isValid(x){
    return (x.toLowerCase() == "yes" || x.toLowerCase() =="no" || x.toLowerCase() == "exit");
}
function isNumber(x) {
    var converted = parseInt(x);
    return (typeof converted === "number" && !isNaN(parseInt(x)));
}
function isInArray(x, data) {
    var names = x.split(" ");
    if (names.length > 2) {
        return false;
    }
    else {
        cappedName = names.map(function (name) {
            return name[0].toUpperCase() + name.substring(1).toLowerCase()
        });
        var hasName = [];
        hasName = data.filter(function (person) { if ((person["firstName"] == cappedName[0]) && (person["lastName"] == cappedName[1])) { return true } else { return false } });
        return (hasName.length > 0)
    }
}
function indexNames(people) {
    var indexedNames = [];
    for (let x=0; x<people.length; x++){
        indexedNames[x] = ((people[x]) + "\n").replace(/,/g, "");
    }
    return indexedNames;
}
// BEGIN FUNCTIONS FOR FINDING RELATIVES    
function displayResults(mostWanted) {
    if (mostWanted.length < 1) {
        alert("Your search did not return any results");
    }
    else {
        alert(("Your search retured " + mostWanted.length +" results:\n") + (indexNames(mostWanted)) + "\nPlease press 'OK' to continue.");
    }
}
function getRelatives(wanted, data) {
    var children = getRelationDown(wanted, data);
    var spouse = getRelationLateral(wanted, data);
    var parents = getRelationUp(wanted, data);
    var siblings = getRelationDown(parents, data);
    var grandChildren = getRelationDown(children, data);
    var grandParents = getRelationUp(parents, data);
    var nieceAndNephew = getRelationDown(siblings, data);
    var auntAndUncle = getRelationDown(parents, data);
    var greatGrandChild = getRelationDown(grandChildren, data);
    var greatGrandParents = getRelationUp(grandParents, data);
}
function getRelationDown(wanted, data) {
    var relatives = [];
    var someRelatives = [];
    var moreRelatives = [];
    if (wanted.length == 0) { }
    else {
        for (let i = 0 ; i <wanted.length ; i++){
            someRelatives = data.filter(function (people) {
                return (people["parents"].includes((wanted[i])["id"]));
            });
            relatives = moreRelatives.concat(someRelatives);
        }
    }
    return relatives;
}
function getRelationUp(wanted, data) {
    var parents = [];
    var partParents = [];
    var moreParents = [];
    if (wanted.length == 0) { }
    else {
        for (let i = 0 ; i < wanted.length ; i++) {
            partParents = data.filter(function (people) {
                return ((wanted[i])["parents"].includes(people["id"]));
            });
            parents = moreParents.concat(partParents);
        }
    }
    return parents;
}
function getRelationLateral(wanted, data) {
    var someRelatives = [];
    if (typeof (wanted[0])["currentSpouse"] != "undefined") {
        someRelatives = data.filter(function (people) {
            return (people["currentSpouse"] == ((wanted[0])["id"]));
        });
    }
    return someRelatives;
}

