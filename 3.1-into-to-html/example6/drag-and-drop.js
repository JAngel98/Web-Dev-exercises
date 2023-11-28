let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

function dragStartHandler(ev) {    
    pos3 = ev.clientX;
    pos4 = ev.clientY;

    ev.dataTransfer.setData("text/uri-list", ev.currentTarget.getAttribute("src"));
}

function dragEndHandler(ev) {
    pos1 = pos3 - ev.clientX;
    pos2 = pos4 - ev.clientY;

    pos3 = ev.clientX;
    pos4 = ev.clientY;    

    ev.currentTarget.style.top = ev.currentTarget.offsetTop - pos2 + 'px';
    ev.currentTarget.style.left = ev.currentTarget.offsetLeft - pos1 + 'px';
}