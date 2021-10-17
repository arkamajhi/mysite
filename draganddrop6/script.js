let cards = document.querySelectorAll('.card');
let containers = document.querySelectorAll('.container');

console.log(cards);
console.log(containers);

cards.forEach(card => {
  card.addEventListener('dragstart',function(){
    console.log("Drag Started");
    card.classList.add('dragging');
  });
  card.addEventListener('dragend',function(){
    console.log("Drag Ended");
    card.classList.remove('dragging');
  });
});

containers.forEach(container => {
  container.addEventListener('dragover',function(){
    console.log("Hovered");
    let current=document.querySelector('.dragging');
    container.append(current);
  });
});

window.addEventListener('DOMContentLoaded',function(){
  //init();

  cards.forEach(card => {
    (document.querySelector('.a'+(Math.floor(Math.random()*6) + 1))).appendChild(card);
  });

})


function touchHandler(event) {
    var touch = event.changedTouches[0];

    var simulatedEvent = document.createEvent("MouseEvent");
        simulatedEvent.initMouseEvent({
        touchstart: "mousedown",
        touchmove: "mousemove",
        touchend: "mouseup"
    }[event.type], true, true, window, 1,
        touch.screenX, touch.screenY,
        touch.clientX, touch.clientY, false,
        false, false, false, 0, null);

    touch.target.dispatchEvent(simulatedEvent);
    event.preventDefault();
}

/*function init() {
    document.addEventListener("touchstart", touchHandler, true);
    document.addEventListener("touchmove", touchHandler, true);
    document.addEventListener("touchend", touchHandler, true);
    document.addEventListener("touchcancel", touchHandler, true);
}*/
