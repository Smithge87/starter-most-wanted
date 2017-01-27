
function initAlert(people) {
        var result = [];
        alert("Welcome to the Most Wanted Database.\nThere are " + people.length + " persons currently in the database\nPlease press 'OK' to begin");
        var mostWanted = getPeople(people);
        var cleanMostWanted = getNames(mostWanted);
        displayFilterResults(cleanMostWanted);
        var wanted = processPromptRelative(cleanMostWanted, "Please enter a first and last name to find decendants", isContent, isInArray, mostWanted);
        var wantedObject = getObject(wanted, people);
        var relatives = getRelatives(wantedObject, people);
        displayRelativeResults(wantedObject, relatives);
}
// BEGIN FUNCTIONS FOR FINDING MOST WANTED
function getPeople(people) {
    var remainingPeople = people;
    remainingPeople = getFilter("first name", "Please enter a first name", isString, capRequest, "firstName", remainingPeople);
    remainingPeople = getFilter("last name", "Please enter a last name", isString, capRequest, "lastName", remainingPeople);
    remainingPeople = getFilter("gender", "Please enter a gender, 'male' or 'female'", isString, lowerRequest, "gender", remainingPeople);
    remainingPeople = getFilter("eye color", "Please enter and eye color", isString, lowerRequest, "eyeColor", remainingPeople);
    remainingPeople = getFilter("occupation", "Please enter an occupation", isString, lowerRequest, "occupation", remainingPeople);
    remainingPeople = getFilter("height", "Please enter a height (feet' inches'')", isNumber, parseHeight, "height", remainingPeople);
    remainingPeople = getFilter("weight", "Please enter a weight in pounds", isNumber, parseRequest, "weight", remainingPeople);
    remainingPeople = getFilter("age", "Please enter an age in years", isNumber, parseAge, "dob", remainingPeople);
    return remainingPeople;
}
function getFilter(firstPrompt, secondPrompt, typeCheck, converter, searchVariable, data)
{
    var answer = initPrompt(firstPrompt, isContent, isValid, data);
    var request = processPrompt(answer, secondPrompt, isContent, typeCheck);
    var requestCleaned = converter(request, isContent);
    var result = searchDatabase(requestCleaned, searchVariable, data);
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
    else {
        do {
            var request = prompt(question);}
        while (!content(request) || !valid(request));}
    return request;
}
function processPromptRelative(people, question, content, valid, data) {
            do {
                var wanted = prompt((indexNames(people))+ "\n"+ question);
            }
            while (!content(wanted) || !valid(wanted, data));
        return wanted;
}
function getObject(person, data) {
    var names = person.split(" ");
        cappedName = names.map(function (name) {
            return name[0].toUpperCase() + name.substring(1).toLowerCase();
        });
        var hasName = [];
        hasName = data.filter(function (person) { if ((person["firstName"] == cappedName[0]) && (person["lastName"] == cappedName[1])) { return true } else { return false } });
        return (hasName);
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
    if (content(number) && isNumber(number)) {
        var cleanedNumber = parseInt(number);
        return cleanedNumber;
    }
    else { return " " }
}
function parseHeight(number, content) {
    if (content(number) && isNumber(number)) {
        height = number.split(" ");
        if (height.length > 1) {
            var feetToInches = ((parseInt(height[1].replace(/\D/g, ""))) + (12 * (parseInt((height[0].replace(/\D/g, ""))))));
            return feetToInches;
        }
        else { return (12*(parseInt(height[0].replace(/\D/g, "")))) }
    }
    else { return " "}
}
function parseAge(age, content) {
    if (content(age) && isNumber(age)) {
        var year = new Date();
        var birthYear = (parseInt(year.getFullYear()) - (parseInt(age)));
        return birthYear;
    }
    else { return " " }
}
function searchDatabase(searchItem, dbItem, data) {
    if (typeof searchItem == "string") {
        matchList = data.filter(function (person) { if (person[dbItem] == searchItem) { return true } else { return false } });
    }
    else
    {
            matchList = data.filter(function (person) {
                if (((person[dbItem]).toString()).includes(searchItem.toString())) { return true } else { return false }
            });
    }
    if (matchList.length == 0 && searchItem != " ") {
        alert("No one in our database met the filter requirements.\n\nCurrent filter will be excluded.");
        return data;
    }
    else if (matchList.length == 0) {
        return data;
    }
    else {
        return matchList;
    }
}
function getNames(people) {
    var cleanedWanted = people.map(function (person) {
        return ([person.firstName, person.lastName].join(" "));
    });
    return cleanedWanted;
}
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
    var indexedNames = "";
    for (let x=0; x<people.length; x++){
        indexedNames += (((people[x]).replace(",", "")) + "\n");
    }
    return indexedNames;
}
// BEGIN FUNCTIONS FOR FINDING RELATIVES    
function displayFilterResults(mostWanted) {
    if (mostWanted.length < 1) {
        alert("Your search did not return any results");
    }
    else {
        alert(("Your search retured " + mostWanted.length +" results:\n\n") + (indexNames(mostWanted)) + "\nPlease press 'OK' to continue.");
    }
}
function getRelatives(wanted, data) {
    var spouse = getRelationLateral(wanted, data);
    var children = getRelationDown(wanted, data, wanted);
    var parents = getRelationUp(wanted, data, wanted);
    var siblings = getRelationDown(parents, data, wanted);
    var grandChildren = getRelationDown(children, data, wanted);
    var grandParents = getRelationUp(parents, data, wanted);
    var nieceAndNephew = getRelationDown(siblings, data, wanted);
    var auntAndUncle = getRelationDown(grandParents, data, wanted);
    var greatGrandChild = getRelationDown(grandChildren, data, wanted);
    var greatGrandParents = getRelationUp(grandParents, data, wanted);
    var relatives = [spouse, children, parents, siblings, grandChildren, grandParents, nieceAndNephew, auntAndUncle, greatGrandChild, greatGrandParents];
    return relatives;
}
function getRelationDown(wanted, data, exclusion) {
    var relatives = [];
    var someRelatives = [];
    var moreRelatives = [];
    if (wanted.length == 0) { }
    else {
        for (let i = 0 ; i <wanted.length ; i++){
            someRelatives = data.filter(function (people) {
                return ((people["parents"].includes((wanted[i])["id"]))&& (((exclusion[0])["id"]) != people["id"])) ;
            });
            relatives = moreRelatives.concat(someRelatives);
        }
    }
    return relatives;
}
function getRelationUp(wanted, data, exclusion) {
    var parents = [];
    var partParents = [];
    var moreParents = [];
    if (wanted.length == 0) { }
    else {
        for (let i = 0 ; i < wanted.length ; i++) {
            partParents = data.filter(function (people) {
                return (((wanted[i])["parents"].includes(people["id"])) && (((exclusion[0])["id"]) != people["id"]));
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
function displayRelativeResults(person, family) {
    alert("Most Wanted Information: \n\n" + cleanObject(person) + "\n\nFamily:\n\n" + "Spouse: " + cleanNames(family[0])
        + "\Children: " + cleanNames(family[1]) + "\nParents: " + cleanNames(family[2]) + "\nSiblings: " + cleanNames(family[3])
        + "\nGrandChildren: " + cleanNames(family[4]) + "\nGrandparents: " + cleanNames(family[5]) + "\nNieces and Nephews: " + cleanNames(family[6])
        + "\nAunts and Uncles: " + cleanNames(family[7]) + "\nGreat Grandchildren: " + cleanNames(family[8]) + "\nGreat Grandparents: " + cleanNames(family[9])
        +"\n\nNext of kin: "+nextOfKin(family)+"\n\n\n Please press 'OK' to exit");
}
function cleanObject(people) {
    stringPeople = people.map(function (person) {
        delete person.currentSpouse;
        delete person.parents;
        return (JSON.stringify(person));
    });
    cleanedPeople = stringPeople.map(function (person) {
        return (person.replace("{", "").replace("}", "").replace(/,/g, "\n").replace("firstName","First Name").replace("lastName","Last Name")
            .replace("gender","Gender").replace("dob","Date of Birth").replace("id","ID# ").replace("eyeColor","Eye Color").replace("weight","Weight")
            .replace("occupation","Occupation").replace(/"/g,"").replace("height","Height").replace(/:/g,": "));
    });
    return cleanedPeople;
}
function cleanNames(people) {
    namedPeople = people.map(function (person) {
        var wholeName = person["firstName"] + " " + person["lastName"];
        return (wholeName);
    });
    return namedPeople;
}
function nextOfKin(family) {
    var nextOfKin = "";
    for (let i = 0; i < family.length; i++) {
        if (family[i].length > 0 && nextOfKin == "") {
            var nextOfKin = (cleanNames(family[i]))[0];
        }
    }
    if (nextOfKin == "") {
        nextOfKin== "No next of kin"
    }
    return nextOfKin;
}
