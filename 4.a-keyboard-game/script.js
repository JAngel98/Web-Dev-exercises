console.log("KeyPress example");

const imagen = document.querySelector('img');

document.body.addEventListener('keydown', (e) => {

    switch (e.code) {
        case 'ArrowRight':
            moveRight();
            break;
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowUp':
            moveUp();
            break;
        case 'ArrowDown':
            moveDown();
            break;
        default:
            alert('Debe presionar una tecla de movimiento');
            break;
    }


    // if (e.code === 'ArrowRight') {
    //     moveRight();
    // }
    // if (e.code === 'ArrowLeft') {
    //     moveLeft();
    // }
    // if (e.code === 'ArrowUp') {
    //     moveUp();
    // }
    // if (e.code === 'ArrowDown') {
    //     moveDown();
    // }
    // else {
    //     alert('Debe presionar una tecla de movimiento');
    // }
});

function moveRight() {
    imagen.style.left = imagen.offsetLeft + 20 + 'px';
}

function moveDown() {
    imagen.style.top = imagen.offsetTop + 20 + 'px';
}

function moveUp() {
    imagen.style.top = imagen.offsetTop - 20 + 'px';
}

function moveLeft() {
    imagen.style.left = imagen.offsetLeft - 20 + 'px';
}