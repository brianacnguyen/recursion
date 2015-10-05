// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className, node){
	node = node || document.body;
	var results = []; 
	//look through our current node and compare className to target className
	//split up different classNames
	var splittedClassNames = node.className.split(' ');
	if (splittedClassNames.indexOf(className) >= 0){ 
		// check if matches, if it does, store it somehow
		results.push(node);
	}
	// loop over node's children and do the same thing all over
	for (var i = 0; i < node.children.length; i++) {
		var childrenResults = getElementsByClassName(className, node.children[i]);
		results = results.concat(childrenResults); 
	}
	// return the storage
	return results; 
};

