// creating the boxes and color and text in javascript

const containerEl = document.querySelector(".container");

for(let index = 0; index < 24; index++){
    const colorContainerEl = document.createElement("div");
    colorContainerEl.classList.add("color-container");
    containerEl.appendChild(colorContainerEl);
}

function randomColor(){
    const chars = "0123456789abcdef";
    const colorCodeLength = 6;
    let colorCode = "";
    for(let i = 0; i< colorCodeLength; i++){
        const randomNum = Math.floor(Math.random() * chars.length);
        colorCode += chars.substring(randomNum, randomNum + 1)
    }
    return colorCode;
}

const colorContainerEls = document.querySelectorAll(".color-container");

function generateColors(){
    for(let containers of colorContainerEls){
        let randomColorCode = "#" + randomColor();
        containers.style.backgroundColor = randomColorCode;
        containers.textContent = randomColorCode
    }
}
generateColors();