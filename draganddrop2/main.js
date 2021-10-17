$(document).ready(function()
{
  for (a=1;a<=3;a++)
  {
    document.getElementById("main").innerHTML +=
    '<div class="empty">'
      +'<div class="fill" draggable="true"></div>'
    +'</div>';
  }

  for (a=1;a<=3;a++)
  {
    document.getElementById("main").innerHTML +=
    '<div class="empty"></div>';
  }

  const fill=document.querySelector('.fill');
  const empties=document.querySelectorAll('.empty');

  //fill listeners
  fill.addEventListener('dragstart',dragStart);
  fill.addEventListener('dragend',dragEnd);

  //Loop through empties and call drag elements
  for (const empty of empties)
  {
    empty.addEventListener('dragover',dragOver);
    empty.addEventListener('dragenter',dragEnter);
    empty.addEventListener('dragleave',dragLeave);
    empty.addEventListener('drop',dragDrop);
  }

  //fill drag functions
  function dragStart()
  {
    console.log('start');
    this.className+=' hold';
    setTimeout(() => (this.className = 'invisible'), 0);
  }

  function dragEnd()
  {
    console.log('end');
    this.className = 'fill'
  }

  function dragOver(e)
  {
    //console.log('over');
    e.preventDefault();
  }

  function dragEnter(e)
  {
    //console.log('enter');
    e.preventDefault();
    this.className+=' hovered';
  }

  function dragLeave()
  {
    //console.log('leave');
    this.className='empty';
  }

  function dragDrop()
  {
    //console.log('drop ');
    if(this.className=='empty hovered')
    {
      this.className='empty';
      this.append(fill);
    }
  }

});
