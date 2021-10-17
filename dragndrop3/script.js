window.addEventListener("load",(function()
{
  var draggableArea = document.getElementById("draggableContainer");
  var draggableItems = document.getElementsByClassName("draggableItem");
  var selectedElement="";
  var selectedElementPosition=0;

  for (var i = 0; i <draggableItems.length; i++)
  {
    draggableItems[i].addEventListener('dragstart',function(e)
      {
        e.dataTransfer.setData("text",e.target.id);
        selectedElement=document.getElementById(e.target.id);
        setTimeout(function(){draggableArea.removeChild(selectedElement)},0);
      }
    );
  }

  draggableArea.addEventListener('dragover',function(e)
  {
    e.preventDefault();
    GetCurrentPositionY(e.clientY);
  });

  draggableArea.addEventListener('drop',function(e)
  {
    e.preventDefault();
    draggableArea.insertBefore(selectedElement,draggableArea.children[selectedElementPosition]);

    ResetElementsTransitions();
  });

  function GetCurrentPositionY(MousePositionY)
  {
    for (var i = 0; i < draggableItems.length; i++)
    {
      var element = document.getElementById(draggableItems[i]["id"]);
      var elementBoundBox = element.getBoundingClientRect();
      var elementBoundBoxTop = elementBoundBox.top;
      var elementBoundBoxBottom = elementBoundBox.bottom;
      var elementBoundBoxCenter = elementBoundBoxTop+((elementBoundBoxBottom-elementBoundBoxTop)/2);
      draggableItems[i]["positionY"] = elementBoundBoxCenter;
    }

    for (var i = 0; i < draggableItems.length; i++)
    {
      if (draggableItems[i]["positionY"]<MousePositionY)
      {
        var elementAbove = document.getElementById(draggableItems[i]["id"]);
        selectedElementPosition=i+1;
      }
      else
      {
          if(!elementUnder)
          {
            var elementUnder = document.getElementById(draggableItems[i]["id"]);
          }
      }
    }

    if (typeof(elementAbove)=="undefined")
    {
      selectedElementPosition=0;
    }

    ResetElementsTransitions();

    if (typeof(elementUnder)=="object")
    {
      elementUnder.style.marginTop="40px";
      elementUnder.style.transition="all 0.5s ease";
    }
  }

  function ResetElementsTransitions()
  {
    for (var i = 0; i < draggableItems.length; i++)
    {
      document.getElementById(draggableItems[i]["id"]).style.margin="10px";
    }
  }


}));
