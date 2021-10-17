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

  //let one=document.querySelector('.one');
  //let two=document.querySelector('.two');

  /*cards.forEach(card => {
    if (evenodd()) {
      one.appendChild(card)
    }
    else {
      two.appendChild(card)
    }
  });*/

  cards.forEach(card => {
    //console.log("A: "+card);
    (document.querySelector('.a'+(Math.floor(Math.random() * 6) + 1))).appendChild(card);
  });

})
