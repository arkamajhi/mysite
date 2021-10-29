/*if ("ServiceWorker" in navigator)
{
  navigator.ServiceWorker.register("sw.js").then(registration=>{
    console.log("SW Registered");
    console.log(registration);
  }).catch(error => {
    console.log("SW Failed");
    console.log(registration);
  });
}*/



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
    console.log(draggableItems);
    var selectedElement     = "";
    var selectedElementPosition = 0;

    var sectionslength=[0];

    for (var a = 1; a <= 10; a++)
    {
      var sectioncount=0;
      for (var i = 0; i < draggableItems.length; i++)
      {
          if(((draggableItems[i].id.length==2)?(parseInt(draggableItems[i].id.charAt(0))):(parseInt(draggableItems[i].id.substring(0,2))))==a)
          {
            sectioncount++;
          }
      }
      document.getElementById("background"+a).style.height = (sectioncount*34)-2+"px" ;
      document.getElementById("background"+a).style.zIndex = draggableItems.length-a ;

      sectionslength[a]=sectionslength[a-1]+sectioncount;
    }

    console.log(sectionslength);

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
        tick();
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
            elementUnder.style.marginTop = "20px";
            elementUnder.style.transition = "all 0.5s ease";
        }
    }

    // 6.2
    function ResetElementsTransitions()
    {

        for (var i = 0; i < draggableItems.length; i++)
        {
            document.getElementById(draggableItems[i]["id"]).style.margin = "5px 15px 5px 5px" ;
        }

        for (var i = 0; i < draggableItems.length; i++)
        {
          var dragid=((draggableItems[i].id.length==2)?(parseInt(draggableItems[i].id.charAt(0))):(parseInt(draggableItems[i].id.substring(0,2))));
          if((i+1)<=sectionslength[dragid]&&(i+1)>sectionslength[dragid-1])
          {
            document.getElementById(draggableItems[i]["id"]).style.background = "green" ;
          }
          else
          {
            document.getElementById(draggableItems[i]["id"]).style.background = "#45526C" ;
            //document.getElementById(draggableItems[i]["id"]).style.backgroundColor = "#45526C";

          }
        }

      }

      function tick()
      {
        var ticks=0;
        //console.log("Length of section array = "+sectionslength.length);
        for (var i = 0; i < sectionslength.length; i++)
        {
          var counter=0;
          for (var j = sectionslength[i]; j < sectionslength[i+1]; j++)
          {
            var dragid=((draggableItems[j].id.length==2)?(parseInt(draggableItems[j].id.charAt(0))):(parseInt(draggableItems[j].id.substring(0,2))));
            if(dragid==i+1)
            {
              counter++;
            }

            if(counter==sectionslength[i+1]-sectionslength[i])
            {
              //alert("Complete");
              document.querySelector("#background"+(i+1)+" > div > div").style.visibility = 'visible';
              ticks++;
            }
            else
            {
              document.querySelector("#background"+(i+1)+" > div > div").style.visibility = 'hidden';
            }
          }
        }
        if(ticks==sectionslength.length-1)
        {
          alert("Congratulations !! You Won");
        }


    }

}));
