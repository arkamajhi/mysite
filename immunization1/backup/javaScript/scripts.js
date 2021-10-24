
window.addEventListener("load", (function()
{
    $(function ()
    {
      var parent = $("#draggableContainer");
      var divs = parent.children();
      while (divs.length)
      {
          parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
      }
    });

    // 1
    var draggableArea       = document.getElementById("draggableContainer");
    var draggableItems      = document.getElementsByClassName("draggableItem");
    //console.log(draggableItems);
    var selectedElement     = "";
    var selectedElementPosition = 0;

    // 2
    for (var i = 0; i < draggableItems.length; i++)
    {
        draggableItems[i].addEventListener("dragstart", function(e)
            {
                e.dataTransfer.setData("text",e.target.id); // <-- avoid drag and drop problems with old versions of firefox

                selectedElement = document.getElementById(e.target.id);

                setTimeout(function(){ draggableArea.removeChild(selectedElement) }, 0); // TimeOut to prevent the selected object from being immediately deleted before it's time to grab
            }
        );
    }

    // 3
    draggableArea.addEventListener("dragover", function(e){

        e.preventDefault();
        GetCurrentPositionY(e.clientY) ; // Using a local function to retrieve the vertical position of the mouse from the mouse

    });

    // 5
    draggableArea.addEventListener("drop", function(e){

        e.preventDefault();
        draggableArea.insertBefore(selectedElement, draggableArea.children[selectedElementPosition]);

        // Here stops the drag and drop without animation

        // Animation 3
        ResetElementsTransitions() // <-- we reset the transition here too to avoid space !! HERE our animated drag and drop ends !!

    });

    // 4
    function GetCurrentPositionY(MousePositionY)
    {
        // Retrieve the EXACT position of each draggable element in order to know if we should place our selectedItem up or down in relation to the element we are hovering over
        for (var i = 0; i < draggableItems.length; i++)
        {
            var element                 = document.getElementById(draggableItems[i]["id"]);
            var elementBoundBox         = element.getBoundingClientRect();
            var elementBoundBoxTop      = elementBoundBox.top;
            var elementBoundBoxBottom   = elementBoundBox.bottom;

            var elementBoundBoxCenter = elementBoundBoxTop + ( (elementBoundBoxBottom - elementBoundBoxTop) /2 );
            draggableItems[i]["positionY"] = elementBoundBoxCenter; // Adding a "positionY" property to our "draggableItems" array and for each draggable element we assign the value "elementBoundBoxCenter"
        }

        // Compare the vertical position of the mouse with the EXACT position of the "draggable" element that you are hovering over
        for (var i = 0; i < draggableItems.length; i++)
        {
         if ( draggableItems[i]["positionY"] < MousePositionY)
            {
                var elementAbove = document.getElementById(draggableItems[i]["id"]); // We create a local variable which represents the element just above the vertical position of the mouse
                selectedElementPosition = i+1; // <-- we know then that our position must be after the element just above
            }
            else
            {
                if (!elementUnder) // <-- we want the element that is immediately below and not all the elements
                 {
                    var elementUnder = document.getElementById(draggableItems[i]["id"]); // <-- if we enter then an element is present below the mouse
                }
            }
        }

        // we make sure there is an element above our mouse and if there is none then the position will be at the top of the list
        if ( typeof(elementAbove) == "undefined" )
        {
            selectedElementPosition = 0;
        }
        //Go étape DROP


        // 6.2
       ResetElementsTransitions(); // <-- use of CSS to reset the initial state of each unselected element (loop back animation ^^)

        // 6.1 --> if the element below is an object then we apply a 40px margin and a CSS transition which will cause the object to descend (animation look alike)
        if ( typeof(elementUnder) == "object" )
        {
            elementUnder.style.marginTop = "40px";
            elementUnder.style.transition = "all 0.5s ease";
        }
    }

    // 6.2
    function ResetElementsTransitions()
    {
        for (var i = 0; i < draggableItems.length; i++)
        {
            document.getElementById(draggableItems[i]["id"]).style.margin = "10px" ;
            //document.getElementById(draggableItems[i]["id"]).style.background = "purple" ;
        }

        var counter = 0;

        for (var i = 0; i < draggableItems.length; i++)
        {
          if (i > 0 && i < draggableItems.length)
          {
            if( ( parseInt(draggableItems[i-1]["id"].charAt(0)) <= parseInt(draggableItems[i]["id"].charAt(0)) ) && (counter==0) )
            {
              document.getElementById(draggableItems[i-1]["id"]).style.background = "green" ;
              document.getElementById(draggableItems[i]["id"]).style.background = "green" ;
              if(i==draggableItems.length-1)
              {
                alert("Congratulations");
              }
            }
            else
            {
              counter=1;
              //document.getElementById(draggableItems[i]["id"]).style.background = "green" ;
              document.getElementById(draggableItems[i]["id"]).style.background = "black" ;
            }
          }
          else
          {
            counter=0;
          }
        }
    }

}));
