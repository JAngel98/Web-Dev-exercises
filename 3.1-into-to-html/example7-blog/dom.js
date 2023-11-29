// Ejemplos del uso de DOM programming interface.

const parrafos = document.querySelectorAll("p"); // return a list of all the <p> elements in the document
console.log(parrafos[0].innerHTML);


// the following function creates a new h1 element, adds text to that element, 
// and then adds it to the tree for the document: 
window.onload = () => { 
    let cuerpo = document.getElementById("blog-body");
    const heading = document.createElement("h3");
    const headingText = document.createTextNode("Al dia con la tecnologia");

    heading.appendChild(headingText);
    cuerpo.appendChild(heading);
}