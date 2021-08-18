const LIGHT_MODE = 0;
const DARK_MODE = 1;

let currentMode = LIGHT_MODE;

let darkModeToggle = document.getElementById("dark-mode-toggle");

let navbar = document.getElementById("navbar");

let navbarItems = document.getElementsByClassName("navbar-item");

let tldrBox = document.getElementById("tldr");

let doesTLDRExist = (tldrBox != null);

let tldrEdges = document.getElementsByClassName("tldr-edge");

let codeBoxes = document.getElementsByTagName("pre");

let anchorElements = document.getElementsByTagName("a");

function addTldrEdges(e) {
    let rect = tldrBox.getBoundingClientRect();
    let rectTop = rect.top + window.pageYOffset;
    let rectBottom = rect.bottom + window.pageYOffset;
    tldrEdges[0].style = `top: ${rectTop - 8}px; left: ${rect.left - 8}px;`;
    tldrEdges[1].style = `top: ${rectTop - 8}px; left: ${rect.right - 8}px;`;
    tldrEdges[2].style = `top: ${rectBottom - 8}px; left: ${rect.left - 8}px;`;
    tldrEdges[3].style = `top: ${rectBottom - 8}px; left: ${rect.right - 8}px;`;
}

function toggleDarkMode() {
    if( currentMode === LIGHT_MODE ) { // from light to dark
        document.body.style = "background: #023; color: white;"
        navbar.style = "background: black; color: white;";
        if( doesTLDRExist ) {
            tldrBox.style = "background-color: #AAA;";
            for( let edge of tldrEdges ) {
                edge.classList.toggle("dark-background");
            }
        }
        for( let item of navbarItems ) {
            item.style = "color: white;"; 
        }
        for( let codeBox of codeBoxes ) {
            codeBox.style = "background-color: #AAA;"; 
        }
        for( let anchor of anchorElements ) {
            anchor.style = "color: white;"; 
        }
    }
    else { // from dark to light
        document.body.style = "background-color: #fdfdfd; color: black;"
        navbar.style = "background: #EEE; color: black;";
        if( doesTLDRExist ) {
            tldrBox.style = "background-color: #EFEFEF;";
            for( let edge of tldrEdges ) {
                edge.classList.toggle("dark-background");
            }
        }
        for( let item of navbarItems ) {
            item.style = "color: black;"; 
        }
        for( let codeBox of codeBoxes ) {
            codeBox.style = "background: #EFEFEF;"; 
        }
        for( let anchor of anchorElements ) {
            anchor.style = "color: black;"; 
        }
    }
    currentMode = (currentMode + 1) % 2;
}

darkModeToggle.addEventListener("click", toggleDarkMode);

if( doesTLDRExist ) {
    window.addEventListener('DOMContentLoaded', addTldrEdges);
    window.addEventListener('resize', addTldrEdges);
}
else {
    let tldrSign = document.getElementById("tldr-sign");
    tldrSign.style = "left: -100px;";
    for( let edge of tldrEdges ) {
        edge.style = "left: -100px;";
    }
}
