//1. Polyfill of getElementByClassName:
// Asked in cars24 SDE Frontend Interview
document.getElementsByClassName = function (className) {
    // Create an empty array to store matched elements
    var elements = [];
    // Get all elements in the document
    var allElements = document.getElementsByTagName("*");

    // Iterate over all elements
    for (var i = 0; i < allElements.length; i++) {
        var element = allElements[i];

        // Check if the element has the class
        if (
            (" " + element.className + " ").indexOf(" " + className + " ") > -1
        ) {
            elements.push(element);
        }
    }

    return elements;
};
