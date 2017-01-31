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
