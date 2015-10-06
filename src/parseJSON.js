// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {

    // ch -- current character in the string we're at
    var ch = json.charAt(0),
        at = 0;

    var next = function() {
        at++;
        ch = json.charAt(at);
        return ch;
    }
    var space = function() {
    	while (ch === " ") {
    		next();
    	}
    };
    // next - function -- controlled where in the string we were, control i and ch
    // next() --> i++ set ch to the next character.  
    // set ch to json.charAt(at)
    // at++
    // string
    var parseString = function() {
        if (ch === '"') {
            var str = '';
            next();
            // to move ch to the next character
            while (ch !== '"') {
                str += ch;
                next();
            }
            next();
            return str;
        }
    };

    // check ch --> [] -array
    // ["one", "two"]
    // run an array parse function
    var parseArray = function () {
    	console.log('array');
	    if (ch === '[') {
	        var results = [];
	        next();
	        if (ch === ']') {
	            return results;
	        }
	        while (ch) {
	        	var value = router(); 
	        	results.push(value);
	        	if (ch === ']') {
	        		return results; 
	        	}
	        	else {
	        		next();
	        		space();
	        	}
	   	 	}
	   	 	//return results;
	        // while ch !== ]{ next, push(parseString()), next() }
	    }
	};
    // object
    // {"a": "b", "c": "d"}
    var parseObject = function() {
    	if (ch === '{') {
        	var results = {};
        	next();
        	if (ch === '}') {
            	return {};
        	}
        	while(ch) {
	        	var key = router();
	        	// looking for ':'
	        	next();
	        	space();
	        	var value = router();
	        	results[key] = value;
	        	if (ch === '}') {
	        		return results;
	        	}
	        	else {
	        		next();
	        		space();
	        	}
	        }
	        //return results;
	    }
	};
    //function to parse numbers
    var parseNumber = function() {
        //run loop to make sure it's a number with negatives or decimals then put them together and make it a number
        var temporaryNumber = ''; 
        if (ch === '-') {
            temporaryNumber += '-';
            next();
        }
        while (Number(ch) >= 0 || Number(ch) <= 9 || ch === '.') {
            temporaryNumber += ch; 
            next();
        }
        return Number(temporaryNumber);       
    }

    function router(){
        console.log('routed');
        if(ch === '"'){
            return parseString();
        }
        if(ch === '['){
            return parseArray();
        }  
        if(ch === '{'){
            return parseObject();
        }   
        if(ch === '-'){
            //number
            return parseNumber(); 
        } else {
            if(ch >= '0' && ch <= '9'){
                //number
                return parseNumber(); 
            } else {
                // if ch === f, return false
                if (ch === 'f') {
                    for (i = 0; i < "false".length; i++) {
                        next();
                    }
                    return false;
                }
                // if ch === t, return true
                if (ch === 't') {
                    for (i = 0; i < "true".length; i++) {
                        next();
                    }
                    return true;
                }
                // if ch === n, return null
                if (ch === 'n') {
                    for (i = 0; i < "null".length; i++) {
                        next();
                    }
                    return null;
                }
                // boolean/null
                //return parseValue();
            }
        }
        
    }

    // Initialize the whole thing
    return router();

    // router function

    // {} --> obj
    // "" --> string
    // (-)0-9 --> numbers
    // null, booleans

    // array function
};
