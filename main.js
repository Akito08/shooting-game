const width = 320;
const height = 480;

let container = null;

const init = () => {
    container = document.createElement("div");
    container.style.position = "absolute";
    container.style.width = `${width}px`;
    container.style.height = `${height}px`;
    container.style.backgroundColor = "#202";
    document.body.appendChild(container);   
};

window.onload = () => {
    init();
};