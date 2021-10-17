
window.addEventListener("load", (function()
{
    // 1
    var draggableArea       = document.getElementById("draggableContainer");
    var draggableItems      = document.getElementsByClassName("draggableItem");
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

        e.preventDefault(); // The preventDefault () method cancels the default action that belongs to the trigger
        GetCurrentPositionY(e.clientY) ; // Using a local function to retrieve the vertical position of the mouse from the mouse

    });

    // 5
    draggableArea.addEventListener("drop", function(e){

        e.preventDefault(); // La méthode preventDefault () annule l'action par défaut qui appartient à l'élément déclencheur

        draggableArea.insertBefore(selectedElement, draggableArea.children[selectedElementPosition]);

        // Ici s'arrete le drag and drop sans animation


        // Animation 3
        ResetElementsTransitions() // <-- on reset la transition ici aussi pour éviter l'éspace !! ICI s'arrete notre drag and drop animé !!

    });

    // 4
    function GetCurrentPositionY(MousePositionY)
    {
        // Récupérer la position EXACTE de chaque élement draggable afin de savoir si on doit placer notre selectedItem en haut ou en bas par rapport à l'élément qu'on est en train de survoler
        for (var i = 0; i < draggableItems.length; i++)
        {
            var element                 = document.getElementById(draggableItems[i]["id"]);
            var elementBoundBox         = element.getBoundingClientRect();
            var elementBoundBoxTop      = elementBoundBox.top;
            var elementBoundBoxBottom   = elementBoundBox.bottom;

            var elementBoundBoxCenter = elementBoundBoxTop + ( (elementBoundBoxBottom - elementBoundBoxTop) /2 );
            draggableItems[i]["positionY"] = elementBoundBoxCenter; // Ajout d'une propriété "positionY" à notre tableau "draggableItems" et pour chaque élément draggable on affectela la valeur "elementBoundBoxBottom"
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
       ResetElementsTransitions(); // <-- utilisation du CSS pour faire un reset de l'état initial de chaque élément non séléctionné (loop back animation ^^)

        // 6.1 --> si l'élément en dessous est objet alors on applique un margin de 40px et une transition CSS qui fera déscendre l'objet (animation look alike)
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
        }
    }

}));
