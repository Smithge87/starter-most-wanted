
function initAlert(people) {
    var result = [];
    alert("Welcome to the Most Wanted Database.\nThere are" + people.length + "persons currently in the database\nPlease press 'OK' to begin");
    var firstNameRemaining = getFirstName(people);
    var lastNameRemaining = getLastName(people);
    var genderRemaining = getGender(people);
    var eyeRemaiming = getEyes(people);
    var jobRemaining = getOccupation(people);
    var heightRemaining = getHeight(people);
    var weightRemaining = getWeight(people);
    var ageRemaining = getAges(people);
}
function getFirstName(data) {
    var answer = initPrompt("Would you like to filter search by  first name, 'yes' or 'no'", isContent, isValid);
    var request = processPrompt(answer, "Please enter a first name", isContent, isString);
    var requestCapped = capRequest(request, isContent);
    var result = searchDatabase(requestCapped, "firstName", data);
    return result;
}
function getLastName(data) {
    var answer = initPrompt("Would you like to filter search by last name, 'yes' or 'no'", isContent, isValid);
    var request = processPrompt(answer, "Please enter a last name", isContent, isString);
    var requestCapped = capRequest(request, isContent);
    var result = searchDatabase(requestCapped, "lastName", data);
    return result;
}
function getGender(data) {
    var answer = initPrompt("Would you like to filter search by gender, 'yes' or 'no'", isContent, isValid);
    var request = processPrompt(answer, "Please enter a gender, 'male' or 'female'", isContent, isString);
    var requestLowered = request.toLowerCase();
    var result = searchDatabase(requestLowered, "gender", data);
    return result;
}
function getEyes(data) {
    var answer = initPrompt("Would you like to filter search by eye color, 'yes' or 'no'", isContent, isValid);
    var request = processPrompt(answer, "Please enter an eye color", isContent, isString);
    var requestLowered = request.toLowerCase();
    var result = searchDatabase(requestLowered, "eyeColor", data);
    return result;
}
function getOccupation(data) {
    var answer = initPrompt("Would you like to filter search by occupation, 'yes' or 'no'", isContent, isValid);
    var request = processPrompt(answer, "Please enter an occupation", isContent, isString);
    var requestLowered = request.toLowerCase();
    var result = searchDatabase(requestLowered, "occupation", data);
    return result;
}
function getHeight(data) {
    var answer = initPrompt("Would you like to filter search by height, 'yes' or 'no'", isContent, isValid);
    var request = processPrompt(answer, "Please enter a height in inches", isContent, isNumber);
    var requestParsed = parseInt(request);
    var result = searchDatabase(request, "height", data);
    return result;
}
function getWeight(data) {
    var answer = initPrompt("Would you like to filter search by weight, 'yes' or 'no'", isContent, isValid);
    var request = processPrompt(answer, "Please enter weight in pounds", isContent, isNumber);
    var requestParsed = parseInt(request);
    var result = searchDatabase(request, "weight", data);
    return result;
}
function getAges(data) {
    var answer = initPrompt("Would you like to filter search by age, 'yes' or 'no'", isContent, isValid);
    var request = processPrompt(answer, "Please enter age in years", isContent, isNumber);
    var birth = processAge(parseInt(request));
    var requestParsed = parseInt(request);
    var result = searchDatabase(request, "weight", data);
    return result;
}

//SHARED PROCESSING FUNCTIONS
function initPrompt(question, content, valid) {
    do {
        var prefer = prompt(question);}
    while (!content(prefer) || !valid(prefer));
    return prefer;
}
function processPrompt(answer, question, content, valid){
    if (answer == "no") {
        var request = " ";}
    else {
        do {
            var request = prompt(question);}
        while (!content(request) || !valid(request));}
    return request;}
function capRequest(string, content){
    if (content(string)){
        var capString = string[0].toUpperCase() + string.substring(1).toLowerCase();
        return capString;
    }
}
function processAge(age) {
    var year = new Date();
    var birthYear = (parseInt(year.getFullYear())-(parseInt(age)));
    return year;
}
function searchDatabase(searchItem, dbItem, data) {
    var matchList = [];
    for (var i = 0 ; i < data.length ; i++) {
        value = data[i]
        if (value[dbItem] == searchItem) {
            matchList.push(JSON.stringify(data[i]));}}
    return matchList;
}
//SIMPLE MACHINES
function isString(x) {
    return (typeof x === "string");
}
function isContent(x) {
    return (x.trim() != null || x.length > 0);
}
function isValid(x){
    return (x.toLowerCase() == "yes" || x.toLowerCase() =="no");
}
function isNumber(x) {
    var converted = parseInt(x);
    return (typeof converted === "number" && !isNaN(parseInt(x)));
}

