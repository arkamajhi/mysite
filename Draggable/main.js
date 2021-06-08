const list_items=document.querySelectorAll('.list-item');
const lists=document.querySelectorAll('.list');

let draggedItem=null;

for(let i=0;i<list_items.length;i++)
{
  const item=list_items[i];

  item.addEventListener('dragstart',function(){
    console.log("Dragg Start");
    draggedItem=this;
    this.style.display=none;
  });

  item.addEventListener('dragend',function(){
    console.log("Dragg End");
    setTimeout(function(){
      draggedItem=null;
    },0);
  });

  for(let j=0;j<lists.length;j++)
  {
    const list=lists[j]
  }
}
