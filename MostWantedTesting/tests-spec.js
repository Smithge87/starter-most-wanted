describe ('function isString', function(){
  it ("checks for a string", function(){
    expect(isString("hello")).toEqual(true);
  });
});

describe ('function isString', function(){
  it ("checks for a string", function(){
    expect(isString(8)).toEqual(false);
  });
});

describe ('function isContent', function(){
  it ("checks for content", function(){
    expect(isContent("yes")).toEqual(true);
  });
});

describe ('function isValid', function(){
  it ("checks for yes or no answer", function(){
    expect(isValid("yes")).toEqual(true);
  });
});

describe ('function isValid', function(){
  it ("checks for yes or no answer", function(){
    expect(isValid("no")).toEqual(true);
  });
});

describe ('function isValid', function(){
  it ("checks for yes or no answer", function(){
    expect(isValid("glorp")).toEqual(false);
  });
});

describe ('function isNumber', function(){
  it ("checks that content is a number", function(){
    expect(isNumber("8")).toEqual(true);
  });
});

describe ('function isNumber', function(){
  it ("checks that content is a number", function(){
    expect(isNumber("no")).toEqual(false);
  });
});

describe ('function indexNames', function(){
  it ("removes commas from names and creates new line", function(){
    expect(indexNames(["Grant, Smith"])).toEqual("Grant Smith\n");
  });
});

describe ('function getNames', function(){
  it ("parses names from JSON array", function(){
    data = [{id:272822514,firstName:"Billy",lastName:"Bob",gender:"male",dob:"1/18/1949",height:71,weight:175,eyeColor:"brown",occupation:"programmer",parents:[],currentSpouse:401222887},{id:401222887,firstName:"Uma",lastName:"Bob",gender:"female",dob:"4/1/1947",height:65,weight:162,eyeColor:"brown",occupation:"assistant",parents:[],currentSpouse:272822514}];
    expected = ["Billy Bob", "Uma Bob"];
    expect(getNames(data)).toEqual(expected);
  });
});

describe ('function capRequest', function(){
  it ("adds capital letter to beginning of each string", function(){
    expect(capRequest("yes", isContent)).toEqual("Yes");
  });
});

describe ('function capRequest', function(){
  it ("adds capital letter to beginning of each string", function(){
    expect(capRequest("YES", isContent)).toEqual("Yes");
  });
});

describe ('function lowerRequest', function(){
  it ("lowercases entire string", function(){
    expect(lowerRequest("YES", isContent)).toEqual("yes");
  });
});

describe ('function parseHeight', function(){
  it ("takes in feet and inches, returns inches", function(){
    expect(parseHeight("5' 11''", isContent)).toEqual(71);
  });
});

describe ('function parseHeight', function(){
  it ("takes in feet and inches, returns inches", function(){
    expect(parseHeight("6", isContent)).toEqual(72);
  });
});

describe ('function parseAge', function(){
  it ("takes in age, returns birth year", function(){
    expect(parseAge("6", isContent)).toEqual(2011);
  });
});

describe ('function parseAge', function(){
  it ("takes in age, returns birth year", function(){
    expect(parseAge("A", isContent)).toEqual(" ");
  });
});

describe ('function parseRequest', function(){
  it ("takes in string, parses to number", function(){
    expect(parseRequest("8", isContent)).toEqual(8);
  });
});

describe ('function parseRequest', function(){
  it ("takes in string, parses to number", function(){
    expect(parseRequest("Q", isContent)).toEqual(" ");
  });
});

describe ('function getObject', function(){
  it ("takes a name and returns a matching db object", function(){
    expected = [{id:272822514,firstName:"Billy",lastName:"Bob",gender:"male",dob:"1/18/1949",height:71,weight:175,eyeColor:"brown",occupation:"programmer",parents:[],currentSpouse:401222887}];
    data = [{id:272822514,firstName:"Billy",lastName:"Bob",gender:"male",dob:"1/18/1949",height:71,weight:175,eyeColor:"brown",occupation:"programmer",parents:[],currentSpouse:401222887},{id:401222887,firstName:"Uma",lastName:"Bob",gender:"female",dob:"4/1/1947",height:65,weight:162,eyeColor:"brown",occupation:"assistant",parents:[],currentSpouse:272822514}];
    expect(getObject("Billy Bob", data)).toEqual(expected);
  });
});

describe ('function getObject', function(){
  it ("takes a name and returns a matching db object", function(){
    expected = [{id:272822514,firstName:"Billy",lastName:"Bob",gender:"male",dob:"1/18/1949",height:71,weight:175,eyeColor:"brown",occupation:"programmer",parents:[],currentSpouse:401222887}];
    data = [{id:272822514,firstName:"Billy",lastName:"Bob",gender:"male",dob:"1/18/1949",height:71,weight:175,eyeColor:"brown",occupation:"programmer",parents:[],currentSpouse:401222887},{id:401222887,firstName:"Uma",lastName:"Bob",gender:"female",dob:"4/1/1947",height:65,weight:162,eyeColor:"brown",occupation:"assistant",parents:[],currentSpouse:272822514}];
    expect(getObject("Billy Boop", data)).toEqual([]);
  });
});

describe ('function processPrompt', function(){
  it ("takes in 'would you like to...' response and prompts user", function(){
    answer = "no";
    question = "your function works";
    expect(processPrompt(answer, question, isContent, isValid)).toEqual(" ");
  });
});
describe ('function getRelationDown', function(){
  it ("finds relations one generation down from'wanted'", function(){
    wanted =[{id:888201200,firstName:"Mader",lastName:"Madden",gender:"male",dob:"5/6/1937",height:76,weight:205,eyeColor:"black",occupation:"landscaper",parents:[],currentSpouse:null}];
    data=[{id:888201200,firstName:"Mader",lastName:"Madden",gender:"male",dob:"5/6/1937",height:76,weight:205,eyeColor:"black",occupation:"landscaper",parents:[],currentSpouse:null},{id:822843554,firstName:"Regina",lastName:"Madden",gender:"female",dob:"7/26/1959",height:71,weight:249,eyeColor:"brown",occupation:"nurse",parents:[693243224,888201200],currentSpouse:null},{id:819168108,firstName:"Hana",lastName:"Madden",gender:"female",dob:"10/7/1953",height:70,weight:187,eyeColor:"brown",occupation:"politician",parents:[693243224,888201200],currentSpouse:null},{id:969837479,firstName:"Eloise",lastName:"Madden",gender:"female",dob:"12/11/1961",height:63,weight:241,eyeColor:"brown",occupation:"assistant",parents:[693243224,888201200],currentSpouse:null},{id:313207561,firstName:"Mattias",lastName:"Madden",gender:"male",dob:"2/19/1966",height:70,weight:110,eyeColor:"blue",occupation:"assistant",parents:[693243224,888201200],currentSpouse:313997561},{id:313997561,firstName:"Ellen",lastName:"Madden",gender:"female",dob:"2/19/1970",height:67,weight:100,eyeColor:"blue",occupation:"doctor",parents:[],currentSpouse:313207561},{id:313998e3,firstName:"Joey",lastName:"Madden",gender:"female",dob:"2/02/1987",height:67,weight:100,eyeColor:"blue",occupation:"doctor",parents:[313207561,313997561],currentSpouse:null}];
    excluded = [{id:888201200,firstName:"Mader",lastName:"Madden",gender:"male",dob:"5/6/1937",height:76,weight:205,eyeColor:"black",occupation:"landscaper",parents:[],currentSpouse:null}];
    expected = [{id:822843554,firstName:"Regina",lastName:"Madden",gender:"female",dob:"7/26/1959",height:71,weight:249,eyeColor:"brown",occupation:"nurse",parents:[693243224,888201200],currentSpouse:null},{id:819168108,firstName:"Hana",lastName:"Madden",gender:"female",dob:"10/7/1953",height:70,weight:187,eyeColor:"brown",occupation:"politician",parents:[693243224,888201200],currentSpouse:null},{id:969837479,firstName:"Eloise",lastName:"Madden",gender:"female",dob:"12/11/1961",height:63,weight:241,eyeColor:"brown",occupation:"assistant",parents:[693243224,888201200],currentSpouse:null},{id:313207561,firstName:"Mattias",lastName:"Madden",gender:"male",dob:"2/19/1966",height:70,weight:110,eyeColor:"blue",occupation:"assistant",parents:[693243224,888201200],currentSpouse:313997561}];
    expect(getRelationDown(wanted, data, excluded)).toEqual(expected);
  });
});

describe ('function getRelation Up', function(){
  it ("finds relations one generation up from'wanted'", function(){
    wanted =[{id:819168108,firstName:"Hana",lastName:"Madden",gender:"female",dob:"10/7/1953",height:70,weight:187,eyeColor:"brown",occupation:"politician",parents:[693243224,888201200],currentSpouse:null}];
    data=[{id:888201200,firstName:"Mader",lastName:"Madden",gender:"male",dob:"5/6/1937",height:76,weight:205,eyeColor:"black",occupation:"landscaper",parents:[],currentSpouse:null},{id:822843554,firstName:"Regina",lastName:"Madden",gender:"female",dob:"7/26/1959",height:71,weight:249,eyeColor:"brown",occupation:"nurse",parents:[693243224,888201200],currentSpouse:null},{id:819168108,firstName:"Hana",lastName:"Madden",gender:"female",dob:"10/7/1953",height:70,weight:187,eyeColor:"brown",occupation:"politician",parents:[693243224,888201200],currentSpouse:null},{id:969837479,firstName:"Eloise",lastName:"Madden",gender:"female",dob:"12/11/1961",height:63,weight:241,eyeColor:"brown",occupation:"assistant",parents:[693243224,888201200],currentSpouse:null},{id:313207561,firstName:"Mattias",lastName:"Madden",gender:"male",dob:"2/19/1966",height:70,weight:110,eyeColor:"blue",occupation:"assistant",parents:[693243224,888201200],currentSpouse:313997561},{id:313997561,firstName:"Ellen",lastName:"Madden",gender:"female",dob:"2/19/1970",height:67,weight:100,eyeColor:"blue",occupation:"doctor",parents:[],currentSpouse:313207561},{id:313998e3,firstName:"Joey",lastName:"Madden",gender:"female",dob:"2/02/1987",height:67,weight:100,eyeColor:"blue",occupation:"doctor",parents:[313207561,313997561],currentSpouse:null}];
    excluded = [{id:819168108,firstName:"Hana",lastName:"Madden",gender:"female",dob:"10/7/1953",height:70,weight:187,eyeColor:"brown",occupation:"politician",parents:[693243224,888201200],currentSpouse:null}];
    expected = [{id:888201200,firstName:"Mader",lastName:"Madden",gender:"male",dob:"5/6/1937",height:76,weight:205,eyeColor:"black",occupation:"landscaper",parents:[],currentSpouse:null}];
    expect(getRelationUp(wanted, data, excluded)).toEqual(expected);
  });
});
describe ('function getRelationLateral', function(){
  it ("finds spouse from'wanted'", function(){
    wanted =[{id:313207561,firstName:"Mattias",lastName:"Madden",gender:"male",dob:"2/19/1966",height:70,weight:110,eyeColor:"blue",occupation:"assistant",parents:[693243224,888201200],currentSpouse:313997561}];
    data=[{id:888201200,firstName:"Mader",lastName:"Madden",gender:"male",dob:"5/6/1937",height:76,weight:205,eyeColor:"black",occupation:"landscaper",parents:[],currentSpouse:null},{id:822843554,firstName:"Regina",lastName:"Madden",gender:"female",dob:"7/26/1959",height:71,weight:249,eyeColor:"brown",occupation:"nurse",parents:[693243224,888201200],currentSpouse:null},{id:819168108,firstName:"Hana",lastName:"Madden",gender:"female",dob:"10/7/1953",height:70,weight:187,eyeColor:"brown",occupation:"politician",parents:[693243224,888201200],currentSpouse:null},{id:969837479,firstName:"Eloise",lastName:"Madden",gender:"female",dob:"12/11/1961",height:63,weight:241,eyeColor:"brown",occupation:"assistant",parents:[693243224,888201200],currentSpouse:null},{id:313207561,firstName:"Mattias",lastName:"Madden",gender:"male",dob:"2/19/1966",height:70,weight:110,eyeColor:"blue",occupation:"assistant",parents:[693243224,888201200],currentSpouse:313997561},{id:313997561,firstName:"Ellen",lastName:"Madden",gender:"female",dob:"2/19/1970",height:67,weight:100,eyeColor:"blue",occupation:"doctor",parents:[],currentSpouse:313207561},{id:313998e3,firstName:"Joey",lastName:"Madden",gender:"female",dob:"2/02/1987",height:67,weight:100,eyeColor:"blue",occupation:"doctor",parents:[313207561,313997561],currentSpouse:null}];
    expected = [{id:313997561,firstName:"Ellen",lastName:"Madden",gender:"female",dob:"2/19/1970",height:67,weight:100,eyeColor:"blue",occupation:"doctor",parents:[],currentSpouse:313207561}];
    expect(getRelationLateral(wanted, data)).toEqual(expected);
  });
});
describe ('function sortByAge', function(){
  it ("sorts people  by age", function(){
    data=[{id:888201200,firstName:"Mader",lastName:"Madden",gender:"male",dob:"5/6/1937",height:76,weight:205,eyeColor:"black",occupation:"landscaper",parents:[],currentSpouse:null},{id:822843554,firstName:"Regina",lastName:"Madden",gender:"female",dob:"7/26/1959",height:71,weight:249,eyeColor:"brown",occupation:"nurse",parents:[693243224,888201200],currentSpouse:null},{id:819168108,firstName:"Hana",lastName:"Madden",gender:"female",dob:"10/7/1953",height:70,weight:187,eyeColor:"brown",occupation:"politician",parents:[693243224,888201200],currentSpouse:null}];
    expected = [{id:888201200,firstName:"Mader",lastName:"Madden",gender:"male",dob:"5/6/1937",height:76,weight:205,eyeColor:"black",occupation:"landscaper",parents:[],currentSpouse:null},{id:819168108,firstName:"Hana",lastName:"Madden",gender:"female",dob:"10/7/1953",height:70,weight:187,eyeColor:"brown",occupation:"politician",parents:[693243224,888201200],currentSpouse:null},{id:822843554,firstName:"Regina",lastName:"Madden",gender:"female",dob:"7/26/1959",height:71,weight:249,eyeColor:"brown",occupation:"nurse",parents:[693243224,888201200],currentSpouse:null}];
    expect(sortByAge(data)).toEqual(expected);
  });
});
