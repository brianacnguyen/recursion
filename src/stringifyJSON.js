// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
    //turns obj into a string
    //catch arrays
    if (Array.isArray(obj)) {
        // results array
        var results = [];
        for (var i = 0; i < obj.length; i++) {
            // push to results
            results.push(stringifyJSON(obj[i]));
        }
        return '[' + results.join(',') + ']';
    }
    //catch objs
    // watch out for null
    if (typeof obj === 'object' && obj !== null) {

        var results = [];
        for (var key in obj) {
            if (typeof obj[key] === 'function' ||
                obj[key] === undefined) {
                continue;
            } else {
            	results.push(stringifyJSON(key) + ':' + stringifyJSON(obj[key]));
            }
        }
        return '{' + results.join(',') + '}';
    }
    //strings
    if (typeof obj === 'string') {
        return '"' + obj + '"';
    }
    //everything else, null, booleans, numbers
    return '' + obj;
};
