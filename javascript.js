// Declaration of variables from html
const size = document.getElementById('myRange');
const gridContainer = document.getElementById('gridContainer');
const clearAllButton = document.getElementById('clearAllButton');
const eraserButton = document.getElementById('eraser');
let pointer = document.getElementById('pointer');
let pointerColor = document.getElementById('pointerColor');
let controlPanel = document.getElementById('controlPanel')
let btn = controlPanel.getElementsByClassName('btn')

// updates the value under slider to show new slider value
var slider = document.getElementById('sliderValue')
slider.innerHTML = size.value;
size.oninput = function(){
    slider.innerHTML = this.value;
}

// Set up grid to value of slider
function setupGrid(size) {
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`
    for (i = 0; i < (size * size); i++) {
        const cell = document.createElement('div');
        cell.style.backgroundColor = '#FFFFFF';
        cell.addEventListener('mousedown', etch);
        cell.addEventListener('mouseover', etch);
        gridContainer.appendChild(cell).className = "cell";
    };
};

// size.onclick = (e) => reloadNewSize(e.target.value)
size.onchange = (e) => reloadNewSize(e.target.value);
function reloadNewSize(slider){
    slider = this.value;
    clearGrid();
    setupGrid(size.value);
}

function clearGrid(){
    gridContainer.innerHTML = '';
}

clearAllButton.onclick = () => clearAll();
function clearAll() {
    clearGrid();
    setupGrid(size.value);
}

// Change active button
for (let i = 0; i < btn.length; i++){
    btn[i].addEventListener('click',function(){
        let current = document.getElementsByClassName('active');
        current[0].className = current[0].className.replace(' active', '');
        this.className += ' active';
    })
}
// lets user press and hold mouse
let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)
// Allows active buttons to do their task
function etch(e){
    if (e.type === 'mouseover' && !mouseDown) return
    if (pointer.classList.contains('active')){
        e.target.style.backgroundColor = pointerColor.value;
    } else if (eraserButton.classList.contains('active')) {
        e.target.style.backgroundColor = '#FFFFFF';
    } else if (rainbow.classList.contains('active')){
        let rValue = Math.floor(Math.random() * 256);
        let gValue = Math.floor(Math.random() * 256);
        let bValue = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${rValue}, ${gValue}, ${bValue})`;
    }
}

window.onload = () => {
    setupGrid(size.value , size.value);
}