const width = 320;
const height = 480;

let container = null;

let heroElement = null;
const heroSize = width / 10;
let heroX = width / 2;
let heroY = height / 2;

const update = () => {
    heroElement.style.left = `${heroX - heroSize / 2}px`;
    heroElement.style.top = `${heroY - heroSize / 2}px`;
};

const init = () => {
    container = document.createElement("div");
    container.style.position = "absolute";
    container.style.width = `${width}px`;
    container.style.height = `${height}px`;
    container.style.backgroundColor = "#202";
    document.body.appendChild(container);
    
    heroElement = document.createElement("div");
    heroElement.style.position = "absolute";
    heroElement.style.display = "flex";
    heroElement.style.alignItems = "center";
    heroElement.style.justifyContent = "center";
    heroElement.style.width = `${heroSize}px`;
    heroElement.style.height = `${heroSize}px`;
    heroElement.style.fontSize = `${heroSize}px`;
    heroElement.textContent = "🎃";
    container.appendChild(heroElement); 
    update();
};

window.onload = () => {
    init();
};