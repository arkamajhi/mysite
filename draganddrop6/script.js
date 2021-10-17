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

function evenodd()
{
  let factor=Math.round(Math.random()*10);
  if (factor%2===0) {return true}
  else {return false}
}

window.addEventListener('DOMContentLoaded',function(){
  //init();
  let one=document.querySelector('.one');
  let two=document.querySelector('.two');

  cards.forEach(card => {
    if (evenodd()) {
      one.appendChild(card)
    }
    else {
      two.appendChild(card)
    }
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
