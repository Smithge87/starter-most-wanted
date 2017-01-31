function isString(x) {
    return typeof x === "string";
}
function isContent(x) {
    return (x.length >0);
}
function isValid(x){
    return (x.toLowerCase() == "yes" || x.toLowerCase() =="no");
}
function isNumber(x) {
    var converted = parseInt(x);
    return (typeof converted === "number" && !isNaN(parseInt(x)));
}
function indexNames(people) {
    var indexedNames = "";
    for (let x=0; x<people.length; x++){
        indexedNames += (((people[x]).replace(",", "")) + "\n");
    }
    return indexedNames;
}
function getNames(names) {
    var cleanedWanted = names.map(function (person) {
        return ([person.firstName, person.lastName].join(" "));
    });
    return cleanedWanted;
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

function parseRequest(number, content) {
    if (content(number) && isNumber(number)) {
        var cleanedNumber = parseInt(number);
        return cleanedNumber;
    }
    else { return " " }
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
function sortByAge(people) {
    if (people.length > 0) {
        var ages = people.map(function (person) {
            return (parseInt(person["dob"].replace(/[/\\*]/g, ""))) % 10000;
        })
        ages.sort();
        var sortedPeople = [];
        for (let i = 0; i < ages.length; i++) {
            for (let j = 0; j < people.length; j++) {
                if (((parseInt(people[j]["dob"].replace(/[/\\*]/g, ""))) % 10000) == ages[i])
                    sortedPeople[i] = people[j];
            }
        }
        return sortedPeople;
    }
    return people;
}
